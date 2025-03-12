type JwtValidatePayload = {
  iss: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
};

type JwtCreatePayload = {
  username: string;
  email: string;
};

type SetTokenCookies = {
  accessToken: string;
  refreshToken: string | null;
};
