import multer from "multer";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.env.UPLOAD_DIR || "uploads";
const EMP_DIR = path.join(ROOT, "employees");
fs.mkdirSync(EMP_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, EMP_DIR),
  filename: (_req, file, cb) => {
    const ts = Date.now();
    cb(null, `${ts}_${file.originalname.replace(/\s+/g, "_")}`);
  },
});

function fileFilter(
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  const ok = ["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype);
  if (ok) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

export const uploadEmployeePhoto = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 },
});
