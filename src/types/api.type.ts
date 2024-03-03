export interface SessionDataResponse {
  accessToken: string
  refreshToken: string
}

export interface UserProfileResponse {
  profile: {
    email: string
    firstName: string
    lastName: string
    walletAddress: string
  }
}
