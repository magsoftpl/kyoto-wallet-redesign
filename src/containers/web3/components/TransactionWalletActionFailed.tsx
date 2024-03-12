import { Pill } from '@/components/simple-controls/pill/Pill'

export const TransactionWalletActionFailed = () => {
  return (
    <div className="w-full h-full p-4 pb-8 flex flex-col gap-8 justify-between uppercase text-center">
      <div className="w-full px-24 py-12">
        <div className="h-16 p-2 rounded-full border-[6px] border-solid border-red">
          <div className="w-full h-full justify-center items-center flex gap-3">
            <div className="w-4 h-4 bg-red rounded-full" />
            <div className="w-4 h-4 bg-red rounded-full" />
            <div className="w-4 h-4 bg-red rounded-full" />
          </div>
        </div>
      </div>
      <div className="w-full px-12">
        <Pill variant="error">Signature error</Pill>
      </div>
    </div>
  )
}

export const transactionWalletActionFailedTitle = 'Sign transaction'
