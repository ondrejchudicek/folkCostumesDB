// costumes/upload.config.ts
import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { randomUUID } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

export const UPLOADS_DIR = join(process.cwd(), 'uploads');
const DIRS = { partFiles: 'models', images: 'images' } as const;

// multer doesn't create directories when destination is a function
for (const dir of Object.values(DIRS)) {
  mkdirSync(join(UPLOADS_DIR, dir), { recursive: true });
}

export const costumeStorage = diskStorage({
  destination(req, file, cb) {
    const dir = DIRS[file.fieldname as keyof typeof DIRS];
    cb(null, join(UPLOADS_DIR, dir));
  },
  // generated name only; the display name lives in the DB
  filename: (req, file, cb) =>
    cb(null, `${randomUUID()}${extname(file.originalname).toLowerCase()}`),
});

const ALLOWED = {
  partFiles: ['.glb'],
  images: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
} as const;

export function costumeFileFilter(
  req: unknown,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) {
  const allowed: readonly string[] | undefined =
    ALLOWED[file.fieldname as keyof typeof ALLOWED];
  const ext = extname(file.originalname).toLowerCase();

  if (allowed?.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new BadRequestException(`Unsupported file type: ${file.originalname}`),
      false,
    );
  }
}
