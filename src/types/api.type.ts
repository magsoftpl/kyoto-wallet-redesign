export interface SessionDataResponse {
  access_token: string
  refresh_token: string
}

export interface UserProfileResponse {
  profile: {
    email: string
    firstName: string
    lastName: string
    country: string
    dob: string
    residencyCountry: string
    residencyAddress: string
    phoneNumber: string
    walletAddress: string
    avatarFilename: string
  }
}
