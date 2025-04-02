import { User } from '@prisma/client';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: JwtValidatePayload;
}

export interface AuthSignInResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface AuthSignOutResponse {
  success: boolean;
  message: string;
}
