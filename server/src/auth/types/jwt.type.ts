type JwtValidatePayload = {
  iss: string;
  id: number;
  username: string;
  email: string;
  iat: number;
  exp: number;
};

type JwtCreatePayload = {
  id: number;
};

type SetTokenCookies = {
  accessToken: string;
  refreshToken: string | null;
};
