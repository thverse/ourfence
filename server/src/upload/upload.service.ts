import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { extname, join } from 'path';

interface UploadFile {
  url: string;
  type: string;
}

@Injectable()
export class UploadService {
  private async uploadFile(
    file: Express.Multer.File,
    userId: number,
  ): Promise<UploadFile> {
    const uploadPath = join(__dirname, '..', '..', 'assets');
    const customFileName = this.generateFileName(userId, file.originalname);
    const filePath = join(uploadPath, customFileName);
    await writeFile(filePath, file.buffer);

    return {
      url: `/assets/${customFileName}`,
      type: file.mimetype,
    };
  }

  async uploadFiles(
    files: Express.Multer.File[],
    userId: number,
  ): Promise<UploadFile[] | null> {
    if (!files?.length) return null;
    return await Promise.all(
      files.map((file) => this.uploadFile(file, userId)),
    );
  }

  private generateFileName(userId: number, filename: string): string {
    const timestamp = Date.now();
    const extension = extname(filename).toLowerCase();
    return `${userId}-${timestamp}${extension}`;
  }
}
