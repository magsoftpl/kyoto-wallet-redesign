import { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { Modal } from '@/components/complex-controls/Modal'
import { WalletProvider } from '../../store/loginData.slice'

interface ModalLoginWizardMethodSelectProps {
  walletsOnly?: boolean
  onMethodSelect(method: 'email' | { kind: 'wallet'; provider: WalletProvider }): void
  onClose(): void
}

export const ModalLoginWizardMethodSelect = ({
  walletsOnly = false,
  onMethodSelect,
  onClose,
}: ModalLoginWizardMethodSelectProps) => {
  return (
    <Modal theme="dark" show title="Connect wallet" onClose={onClose}>
      <div className="w-full md:min-w-[40rem] p-4 flex flex-col uppercase gap-4">
        <SelectMethodButton
          icon={<Image width={32} height={32} src="/icons/metamask.png" alt="metamask logo" />}
          label="Metamask"
          onClick={() => onMethodSelect({ kind: 'wallet', provider: 'metamask' })}
        />
        <SelectMethodButton
          icon={<Image width={32} height={32} src="/icons/coinbase.png" alt="metamask logo" />}
          label="Coinbase wallet"
          onClick={() => onMethodSelect({ kind: 'wallet', provider: 'coinbase' })}
        />
        <SelectMethodButton
          icon={<Image width={32} height={32} src="/icons/brave.png" alt="metamask logo" />}
          label="Brave wallet"
          onClick={() => onMethodSelect({ kind: 'wallet', provider: 'brave' })}
        />
        {!walletsOnly && (
          <SelectMethodButton
            icon={<Image width={32} height={32} src="/icons/verified.png" alt="metamask logo" />}
            label="Login with email"
            onClick={() => onMethodSelect('email')}
          />
        )}
      </div>
    </Modal>
  )
}

const SelectMethodButton = ({ icon, label, onClick }: { icon: ReactNode; label: ReactNode; onClick(): void }) => {
  return (
    <button
      className="px-4 py-2 flex justify-between items-center gap-2 rounded-lg bg-white text-black uppercase font-semibold"
      onClick={onClick}
    >
      <div className="px-2">{icon}</div>
      <div className="basis-full grow py-2 flex justify-start">{label}</div>
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  )
}
