export interface JwtPayload {
  sub: number; // Subject
  username: string; // Username
  iat?: number; // Issued at
  exp?: number; // Expiration time
}
