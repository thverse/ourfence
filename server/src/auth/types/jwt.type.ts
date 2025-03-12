type JwtValidatePayload = {
  iss: string;
  id: number;
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
