param([string]$Src, [string]$OutDir)
# Обработка робота NQO:
#  robot.png      — контур по эллипсу с мягким краем (без светлой каймы), глаза на месте;
#  robot-body.png — то же, но глаза стёрты (их рисует SVG поверх).
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;

public static class RobotFx {
  static double Lum(Color c) { return (c.R + c.G + c.B) / 3.0; }

  public static Color[,] Load(string path) {
    using (var bmp = new Bitmap(path)) {
      var px = new Color[bmp.Width, bmp.Height];
      for (int y = 0; y < bmp.Height; y++) for (int x = 0; x < bmp.Width; x++) px[x, y] = bmp.GetPixel(x, y);
      return px;
    }
  }

  public static void Save(Color[,] px, string path) {
    int w = px.GetLength(0), h = px.GetLength(1);
    using (var bmp = new Bitmap(w, h, PixelFormat.Format32bppArgb)) {
      for (int y = 0; y < h; y++) for (int x = 0; x < w; x++) bmp.SetPixel(x, y, px[x, y]);
      bmp.Save(path, ImageFormat.Png);
    }
  }

  // Эллиптическая маска с мягким краем; у полупрозрачных пикселей убираем примесь белого фона.
  public static void EllipseMask(Color[,] px, double cx, double cy, double rx, double ry) {
    int w = px.GetLength(0), h = px.GetLength(1);
    double rmin = Math.Min(rx, ry);
    for (int y = 0; y < h; y++) for (int x = 0; x < w; x++) {
      double dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry;
      double edge = (1.0 - Math.Sqrt(dx * dx + dy * dy)) * rmin + 0.5;
      Color c = px[x, y];
      if (edge > 2.5 && c.A < 255) {
        // «дырка» внутри шара (так в исходнике вырезан правый глаз): как на белом фоне, но непрозрачно
        double al = c.A / 255.0;
        px[x, y] = Color.FromArgb(255, (int)(c.R * al + 255 * (1 - al)), (int)(c.G * al + 255 * (1 - al)), (int)(c.B * al + 255 * (1 - al)));
        continue;
      }
      double a = Math.Min(c.A, Math.Max(0, Math.Min(1, edge)) * 255.0);
      if (a <= 0) { px[x, y] = Color.FromArgb(0, 0, 0, 0); continue; }
      double r = c.R, g = c.G, b = c.B;
      if (c.A > 0 && c.A < 255) {
        double al = c.A / 255.0;
        r = Clamp((r - (1 - al) * 255) / al); g = Clamp((g - (1 - al) * 255) / al); b = Clamp((b - (1 - al) * 255) / al);
      }
      px[x, y] = Color.FromArgb((int)a, (int)r, (int)g, (int)b);
    }
  }

  // Стирает яркие пиксели (+ ореол pad px) в прямоугольнике, заполняя построчной интерполяцией.
  public static void EraseBright(Color[,] px, int x0, int y0, int x1, int y1, double thr, int pad) {
    int w = px.GetLength(0);
    var mask = new bool[x1 - x0 + 1, y1 - y0 + 1];
    for (int y = y0; y <= y1; y++) for (int x = x0; x <= x1; x++) {
      if (Lum(px[x, y]) <= thr) continue;
      for (int yy = Math.Max(y0, y - pad); yy <= Math.Min(y1, y + pad); yy++)
        for (int xx = Math.Max(x0, x - pad); xx <= Math.Min(x1, x + pad); xx++) mask[xx - x0, yy - y0] = true;
    }
    for (int y = y0; y <= y1; y++) {
      int x = x0;
      while (x <= x1) {
        if (!mask[x - x0, y - y0]) { x++; continue; }
        int s = x; while (x <= x1 && mask[x - x0, y - y0]) x++; int e = x - 1;
        Color L = s - 1 >= 0 ? px[s - 1, y] : Color.Empty;
        Color R = (e + 1 < w && px[e + 1, y].A == 255) ? px[e + 1, y] : L;
        if (L.IsEmpty) L = R;
        for (int i = s; i <= e; i++) {
          double t = (i - s + 1.0) / (e - s + 2.0);
          int a = px[i, y].A;
          px[i, y] = Color.FromArgb(a, (int)(L.R + (R.R - L.R) * t), (int)(L.G + (R.G - L.G) * t), (int)(L.B + (R.B - L.B) * t));
        }
      }
    }
  }

  // Стирание с порогом относительно фона столбца и вертикальной интерполяцией.
  public static void EraseVertical(Color[,] px, int x0, int y0, int x1, int y1, double over, int pad, int margin) {
    int h = px.GetLength(1);
    var mask = new bool[x1 - x0 + 1, y1 - y0 + 1];
    for (int x = x0; x <= x1; x++) {
      double colMin = 255;
      for (int y = Math.Max(0, y0 - margin); y <= Math.Min(h - 1, y1 + margin); y++) if (px[x, y].A == 255) colMin = Math.Min(colMin, Lum(px[x, y]));
      for (int y = y0; y <= y1; y++) {
        if (Lum(px[x, y]) <= colMin + over) continue;
        for (int yy = Math.Max(y0, y - pad); yy <= Math.Min(y1, y + pad); yy++)
          for (int xx = Math.Max(x0, x - pad); xx <= Math.Min(x1, x + pad); xx++) mask[xx - x0, yy - y0] = true;
      }
    }
    FillVertical(px, mask, x0, y0, x1, y1);
    // Сглаживание: несколько проходов размытия 5x5 только по стёртой области.
    int mw = x1 - x0 + 1, mh = y1 - y0 + 1;
    for (int pass = 0; pass < 4; pass++) {
      var copy = (Color[,])px.Clone();
      for (int y = y0; y <= y1; y++) for (int x = x0; x <= x1; x++) {
        if (!mask[x - x0, y - y0]) continue;
        double r = 0, g = 0, b = 0; int n = 0;
        for (int dy = -2; dy <= 2; dy++) for (int dx = -2; dx <= 2; dx++) {
          int xx = x + dx, yy = y + dy;
          if (xx < 0 || yy < 0 || xx >= px.GetLength(0) || yy >= h || copy[xx, yy].A < 255) continue;
          r += copy[xx, yy].R; g += copy[xx, yy].G; b += copy[xx, yy].B; n++;
        }
        if (n > 0) px[x, y] = Color.FromArgb(copy[x, y].A, (int)(r / n), (int)(g / n), (int)(b / n));
      }
    }
  }

  static void FillVertical(Color[,] px, bool[,] mask, int x0, int y0, int x1, int y1) {
    int h = px.GetLength(1);
    for (int x = x0; x <= x1; x++) {
      int y = y0;
      while (y <= y1) {
        if (!mask[x - x0, y - y0]) { y++; continue; }
        int s = y; while (y <= y1 && mask[x - x0, y - y0]) y++; int e = y - 1;
        Color T = px[x, Math.Max(0, s - 1)], B = px[x, Math.Min(h - 1, e + 1)];
        for (int i = s; i <= e; i++) {
          double t = (i - s + 1.0) / (e - s + 2.0);
          int a = px[x, i].A;
          px[x, i] = Color.FromArgb(a, (int)(T.R + (B.R - T.R) * t), (int)(T.G + (B.G - T.G) * t), (int)(T.B + (B.B - T.B) * t));
        }
      }
    }
  }

  // Дочистка: оставшиеся яркие пиксели в области (например, на самом краю шара) — цветом корпуса.
  public static void Darken(Color[,] px, int x0, int y0, int x1, int y1, double thr, Color body) {
    for (int y = y0; y <= y1; y++) for (int x = x0; x <= x1; x++)
      if (px[x, y].A > 0 && Lum(px[x, y]) > thr) px[x, y] = Color.FromArgb(px[x, y].A, body.R, body.G, body.B);
  }

  static double Clamp(double v) { return Math.Max(0, Math.Min(255, v)); }

  public static void Preview(string src, string dst, Color bg) {
    using (var im = Image.FromFile(src))
    using (var bmp = new Bitmap(im.Width * 2, im.Height * 2))
    using (var g = Graphics.FromImage(bmp)) {
      g.Clear(bg); g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
      g.DrawImage(im, 0, 0, im.Width * 2, im.Height * 2);
      bmp.Save(dst, ImageFormat.Png);
    }
  }
}
'@

$px = [RobotFx]::Load($Src)
[RobotFx]::EllipseMask($px, 171.0, 163.0, 146.0, 153.5)
[RobotFx]::Save($px, (Join-Path $OutDir 'robot.png'))

[RobotFx]::EraseVertical($px, 126, 112, 236, 170, 14, 4, 14)
[RobotFx]::EraseVertical($px, 254, 104, 321, 162, 14, 4, 14)
[RobotFx]::Darken($px, 254, 104, 321, 162, 45, [Drawing.Color]::FromArgb(18, 18, 20))
[RobotFx]::Save($px, (Join-Path $OutDir 'robot-body.png'))

foreach ($name in 'robot', 'robot-body') {
  [RobotFx]::Preview((Join-Path $OutDir "$name.png"), (Join-Path $OutDir "preview-$name-dark.png"), [Drawing.Color]::FromArgb(15, 15, 15))
  [RobotFx]::Preview((Join-Path $OutDir "$name.png"), (Join-Path $OutDir "preview-$name-light.png"), [Drawing.Color]::FromArgb(248, 248, 246))
}
"done"
