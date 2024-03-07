export const OperationError = ({ code }: { code: string | null }) => {
  const getErrorMessage = () => {
    if (!code) {
      return null
    }
    switch (code) {
      case 'INVALID_OTP_CODE':
        return 'Invalid verification code'
      case 'USER_ALREADY_EXISTS':
        return 'User with this email is already registerd'
      case 'AUTH_FAILED':
        return 'Invalid user or password'
      case 'OLD_PASSWORD_INVALID':
        return 'Invalid old password'
      case 'INVALID_TOKEN':
        return 'Ivalid or expired reset password link'
      default:
        return 'Operation error'
    }
  }
  return <div className="font-semibold text-red">{!!code && getErrorMessage()}</div>
}
