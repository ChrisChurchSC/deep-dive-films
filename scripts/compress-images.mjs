// In-place image compression for public/bts.
// Resizes to max 2400px wide and re-encodes JPEG at quality 78.
// File names and extensions are preserved so existing references stay valid.

import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const SRC_DIR = path.resolve(process.cwd(), 'public/bts')
const MAX_WIDTH = 2400
const QUALITY = 78

const files = (await fs.readdir(SRC_DIR)).filter((f) =>
  /\.(jpe?g|png)$/i.test(f),
)

let savedBytes = 0
for (const file of files) {
  const fullPath = path.join(SRC_DIR, file)
  const before = (await fs.stat(fullPath)).size

  const buffer = await sharp(fullPath)
    .rotate() // honor EXIF orientation before stripping
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer()

  await fs.writeFile(fullPath, buffer)
  const after = buffer.byteLength
  const saved = before - after
  savedBytes += saved
  const pct = ((saved / before) * 100).toFixed(0)
  console.log(`  ${file}: ${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024 / 1024).toFixed(1)}MB  (-${pct}%)`)
}

console.log(`\nDone. Total saved: ${(savedBytes / 1024 / 1024).toFixed(1)} MB.`)
