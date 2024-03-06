import { EthValueFormatter } from '@/components/formatters/EthValueFormatter'
import { VestingInfoRow, VestingRelesasbleInfoRow } from '../dataSources/vestingContract'
import { Button } from '@/components/simple-controls/button/Button'

interface MigrationsTableProps {
  vestingInfoData: VestingInfoRow[]
  releasableData: VestingRelesasbleInfoRow[]
}

export const MigrationsTable = ({ vestingInfoData, releasableData }: MigrationsTableProps) => {
  return (
    <div role="table" className="w-full flex flex-col gap-2 uppercase">
      {vestingInfoData.map((migrationRow, index) => (
        <div key={migrationRow.vestingId} role="row" className="p-2 flex gap-2 w-full bg-inactive-100 rounded-lg">
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full flex flex-col md:flex-row items-start">
              <div role="cell" className="basis-1/3 flex flex-col items-start md:items-center">
                <div className="font-semibold">Migrated tokens</div>
                <EthValueFormatter valueWei={migrationRow.totalAmount} currency="KYOTO" />
              </div>
              <div role="cell" className="basis-1/3 flex flex-col items-start md:items-center">
                <div className="font-semibold">Locked</div>
                <EthValueFormatter
                  valueWei={migrationRow.totalAmount - migrationRow.alreadyReleased}
                  currency="KYOTO"
                />
              </div>
              <div role="cell" className="basis-1/3 flex flex-col items-start md:items-center">
                <div className="font-semibold">Unlocked</div>
                <EthValueFormatter valueWei={releasableData[index].amount} currency="KYOTO" />
              </div>
            </div>
            <div className="flex justify-center gap-6">
              <div>
                <Button variant="primary">Claim</Button>
              </div>
              <div>
                <Button variant="primary">Stake</Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
