import { AddressFormatter } from '@/components/formatters/AddressFormatter'
import { useClipboard } from '@/components/hooks/useClipboard'
import { Button } from '@/components/simple-controls/button/Button'
import { KyotoLogoSvg } from '@/components/simple-controls/kyotoLogo/KyotoLogoSvg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

interface WalletTileProps {
  address: string | null | undefined
}

export const WalletTile = ({ address }: WalletTileProps) => {
  const copy = useClipboard()

  return (
    <div className="w-full max-w-[35rem] aspect-[7/4]">
      <div className="w-full h-full p-6 rounded-2xl bg-secondary-900">
        <div className="w-full h-full flex flex-col justify-between">
          <div className="w-full flex justify-between uppercase">
            <div className="font-semibold">Your Wallet</div>
            <div className="w-20 h-20">
              <KyotoLogoSvg />
            </div>
          </div>
          <div>
            <div className="flex items-center">
              {!!address && (
                <div>
                  <AddressFormatter startChars={8} endChars={12}>
                    {address}
                  </AddressFormatter>
                  <Button variant="transparent" layout="icon-only" aria-label="Copy" onClick={() => copy(address)}>
                    <FontAwesomeIcon icon={faCopy} />
                  </Button>
                </div>
              )}
            </div>
            <div className="h-[120px]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
