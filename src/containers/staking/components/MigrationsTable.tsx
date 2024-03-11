import { EthValueFormatter } from '@/components/formatters/EthValueFormatter'
import { VestingInfoRow, VestingRelesasbleInfoRow } from '../dataSources/vestingContract'
import { Button } from '@/components/simple-controls/button/Button'
import Image from 'next/image'

interface MigrationsTableProps {
  vestingInfoData: VestingInfoRow[]
  releasableData: VestingRelesasbleInfoRow[]
  onClaimClick(vestingId: bigint): void
  onStakeClick(vestingId: bigint): void
}

export const MigrationsTable = ({
  vestingInfoData,
  releasableData,
  onClaimClick,
  onStakeClick,
}: MigrationsTableProps) => {
  const getReleasableAmount = (vestingId: bigint, index: number) => {
    return releasableData[index].vestingId === vestingId ? releasableData[index].amount : null
  }
  return (
    <div role="table" className="w-full flex flex-col gap-2 uppercase">
      {vestingInfoData.map((migrationRow, index) => (
        <div key={migrationRow.vestingId} role="row" className="p-2 flex gap-2 w-full bg-inactive-100 rounded-lg">
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full flex flex-col md:flex-row items-start">
              <div role="cell" className="basis-1/3 flex flex-col items-start md:items-center">
                <div className="font-semibold">Migrated tokens</div>
                <div className="flex gap-1 items-center">
                  <EthValueFormatter valueWei={migrationRow.totalAmount} />
                  <Image src="/icons/bsc.png" className="w-4 h-4" width={16} height={16} alt="Bsc logo" />
                  KYOTO
                </div>
              </div>
              <div role="cell" className="basis-1/3 flex flex-col items-start md:items-center">
                <div className="font-semibold">Locked</div>
                <EthValueFormatter
                  valueWei={migrationRow.totalAmount - migrationRow.alreadyReleased}
                  currency="KYOTO"
                />
              </div>
              <div role="cell" className="basis-1/3 flex flex-col items-start md:items-center">
                <div className="font-semibold">Claimable</div>
                <EthValueFormatter valueWei={getReleasableAmount(migrationRow.vestingId, index)} currency="KYOTO" />
              </div>
              <div role="cell" className="basis-1/3 flex flex-col items-start md:items-center">
                <div className="font-semibold">Unlocked</div>
                <EthValueFormatter
                  valueWei={
                    getReleasableAmount(migrationRow.vestingId, index) !== null
                      ? getReleasableAmount(migrationRow.vestingId, index)! + migrationRow.alreadyReleased
                      : null
                  }
                  currency="KYOTO"
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-6">
              <div className="lg:min-w-[9rem]">
                {!!getReleasableAmount(migrationRow.vestingId, index) && (
                  <Button variant="primary" onClick={() => onClaimClick(migrationRow.vestingId)}>
                    Claim
                  </Button>
                )}
              </div>
              <div className="lg:min-w-[9rem]">
                <Button variant="primary" onClick={() => onStakeClick(migrationRow.vestingId)}>
                  Stake
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
