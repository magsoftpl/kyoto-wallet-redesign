import { Modal } from '@/components/complex-controls/Modal'
import { Button } from '@/components/simple-controls/button/Button'
import { getApyLabel } from '../logic/getStakeApy'
import { addDays, formatDate } from 'date-fns'

interface KyotoAddTokenPreviewProps {
  amountEth: number
  onClose(): void
  onAccept(): void
}

export const KyotoAddTokenPreview = ({ amountEth, onClose, onAccept }: KyotoAddTokenPreviewProps) => {
  return (
    <Modal title={<div className="pt-4">Preview stake</div>} theme="dark" show hasCloseButton onClose={onClose}>
      <div className="w-screen max-w-[30rem] h-[20rem] p-4 pb-8 flex flex-col gap-8 justify-center uppercase text-center">
        <div className="w-full h-full flex flex-col justify-between">
          <div className="w-full py-6 flex flex-col gap-3">
            <div className="flex justify-center items-center text-xl">{`${amountEth} KYOTO`}</div>
            <div className="px-8 flex justify-between items-center">
              <div>Apy</div>
              {getApyLabel()}
            </div>
            <div className="px-8 flex justify-between items-center">
              <div>Unlock date</div>
              {formatDate(addDays(new Date(), 365), 'P')}
            </div>
          </div>
          <div className="w-full pt-4 px-8">
            <Button type="button" variant="primary" fullWidth onClick={onAccept}>
              Confirm stake
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
