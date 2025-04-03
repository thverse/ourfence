import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';

interface UploadFile {
  url: string;
  type: string;
}

@Injectable()
export class UploadService {
  private uploadPath = join(__dirname, '..', '..', 'uploadedFiles');

  async uploadFile(file: Express.Multer.File): Promise<UploadFile> {
    const filePath = join(this.uploadPath, file.originalname);
    await writeFile(filePath, file.buffer);

    return {
      url: `/uploadedFiles/${file.originalname}`,
      type: file.mimetype,
    };
  }

  async uploadFiles(
    files: Express.Multer.File[],
  ): Promise<UploadFile[] | null> {
    if (!files?.length) return null;
    return await Promise.all(files.map((file) => this.uploadFile(file)));
  }
}
