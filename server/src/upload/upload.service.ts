import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { extname, join } from 'path';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
import { UploadFileByCloudinaryPayload } from './types/upload.type';
import { IMAGE_CONFIG } from './constants/upload.constant';
import { ImageType } from './types/upload.type';

interface UploadFile {
  url: string;
  secure_url?: string;
  type: string;
}

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
      secure: true,
    });
  }
  async uploadFileByCloudinaryForUserProfile(
    uploadFileByCloudinaryPayload: UploadFileByCloudinaryPayload,
  ): Promise<UploadApiResponse> {
    const { file, userId, type } = uploadFileByCloudinaryPayload;

    const streamUpload = (fileBuffer: Buffer): Promise<UploadApiResponse> => {
      return new Promise((resolve, reject) => {
        const { folder, transformationValues } =
          this.getImageUploadOptions(type);
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            public_id: this.generateFileName(userId, file.originalname),
            resource_type: 'image',
            folder,
            transformation: [
              transformationValues,
              { quality: 'auto' },
              { fetch_format: 'webp' },
            ],
            secure: true,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result as UploadApiResponse);
          },
        );

        // 버퍼를 스트림으로 변환 후 Cloudinary로 pipe
        Readable.from(fileBuffer).pipe(uploadStream);
      });
    };

    const result = await streamUpload(file.buffer);
    return result;
  }

  private getImageUploadOptions(imageType: ImageType) {
    return IMAGE_CONFIG[imageType];
  }

  async uploadFileByCloudinary(
    file: Express.Multer.File,
    userId: number,
  ): Promise<UploadApiResponse> {
    const streamUpload = (fileBuffer: Buffer): Promise<UploadApiResponse> => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            public_id: this.generateFileName(userId, file.originalname),
            resource_type: 'image',
            folder: 'ourfence',
            transformation: [{ quality: 'auto' }, { fetch_format: 'webp' }],
            secure: true,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result as UploadApiResponse);
          },
        );

        // 버퍼를 스트림으로 변환 후 Cloudinary로 pipe
        Readable.from(fileBuffer).pipe(uploadStream);
      });
    };

    const result = await streamUpload(file.buffer);
    return result;
  }

  async uploadFilesByCloudinary(
    files: Express.Multer.File[],
    userId: number,
  ): Promise<UploadApiResponse[] | null> {
    if (!files?.length) return null;
    return await Promise.all(
      files.map((file) => this.uploadFileByCloudinary(file, userId)),
    );
  }

  async deleteFileByCloudinary(publicId: string): Promise<UploadApiResponse> {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  }

  private generateFileName(userId: number, filename: string): string {
    const timestamp = Date.now();
    // const extension = extname(filename).toLowerCase();
    return `${userId}-${timestamp}`;
  }

  // Local용

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
}
