import { ImageType } from '../types/upload.type';

export const IMAGE_CONFIG = {
  [ImageType.coverImage]: {
    folder: 'cover',
    transformationValues: {
      width: 1500,
      height: 500,
      crop: 'fill',
      gravity: 'auto',
    },
  },
  [ImageType.profileImage]: {
    folder: 'profile',
    transformationValues: {
      width: 400,
      height: 400,
      crop: 'fill',
      gravity: 'face',
    },
  },
} as const;
