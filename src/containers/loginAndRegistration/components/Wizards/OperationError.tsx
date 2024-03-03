export const OperationError = ({ code }: { code: string }) => {
  const getErrorMessage = () => {
    switch (code) {
      case 'INVALID_OTP_CODE':
        return 'Invalid verification code'
      case 'USER_ALREADY_EXISTS':
        return 'User with this email is already registerd'
      case 'AUTH_FAILED':
        return 'Invalid user or password'
      default:
        return 'Operation error'
    }
  }
  return <div className="font-semibold text-red">{!!code && getErrorMessage()}</div>
}
