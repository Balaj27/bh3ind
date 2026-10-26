import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

// Isolate the original chevron symbol; exclude the adjacent italic wordmark.
const mask = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="62" height="50"><path fill="white" d="M0 0H62V18L33 50L0 18Z"/></svg>');
const symbol = await sharp('public/logo.png')
  .extract({ left: 0, top: 0, width: 62, height: 50 })
  .composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();

for (const size of [16, 32, 48, 192, 512]) {
  await sharp(symbol).resize(size, size, { fit: 'contain', background: '#00000000' })
    .png().toFile(`public/favicon-${size}.png`);
}
await sharp(symbol).resize(132, 132, { fit: 'contain', background: '#f7f7f2' })
  .extend({ top: 24, bottom: 24, left: 24, right: 24, background: '#f7f7f2' })
  .png().toFile('public/apple-touch-icon.png');

const sizes = [16, 32, 48];
const frames = await Promise.all(sizes.map(size => sharp(symbol).resize(size, size, { fit: 'contain', background: '#00000000' }).png().toBuffer()));
const header = Buffer.alloc(6 + frames.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach((frame, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index];
  header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(frame.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
});
await writeFile('public/favicon.ico', Buffer.concat([header, ...frames]));
console.log('Generated logo-symbol favicons and Apple touch icon.');
