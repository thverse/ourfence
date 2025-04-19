export interface UploadFileByCloudinaryPayload {
  file: Express.Multer.File;
  userId: number;
  type: ImageType;
}

export enum ImageType {
  profileImage = 'profileImage',
  coverImage = 'coverImage',
}
