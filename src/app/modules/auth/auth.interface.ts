export type ILoginUser = {
  id: string;
  password: string;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};
export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};
