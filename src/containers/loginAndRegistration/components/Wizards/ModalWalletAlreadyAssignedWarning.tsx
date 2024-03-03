import { Modal } from '@/components/complex-controls/Modal'
import { Button } from '@/components/simple-controls/button/Button'

interface ModalWalletAlreadyAssignedWarningProps {
  errorCode: string
  onConnectDifferentWallet(): void
  onLogout(): void
  onClose(): void
}

export const ModalWalletAlreadyAssignedWarning = ({
  errorCode,
  onClose,
  onConnectDifferentWallet,
  onLogout,
}: ModalWalletAlreadyAssignedWarningProps) => {
  return (
    <Modal theme="dark" show title="Connect wallet" onClose={onClose}>
      <div className="w-full md:min-w-[40rem] p-4 flex flex-col uppercase gap-4">
        <div className="w-full text-center">
          {errorCode === 'WALLET_ALREDY_ASSIGNED'
            ? 'Your account is already connected with different wallet'
            : 'This wallet is connected to different account'}
        </div>
        <Button variant="primary" fullWidth onClick={onLogout}>
          Logout and change account
        </Button>
        <Button variant="primary" fullWidth onClick={onConnectDifferentWallet}>
          Connect different wallet
        </Button>
      </div>
    </Modal>
  )
}
