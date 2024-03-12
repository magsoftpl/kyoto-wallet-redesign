'use client'

import { useHistoryData } from './dataSources/useHistoryData'
import { useCurrentWalletInfo } from '../web3/useCurrentWalletInfo'
import { HistoryDataTable } from './components/HistoryDataTable'
import { Panel } from '@/components/complex-controls/Panel'

export const History = () => {
  const { address } = useCurrentWalletInfo()
  const { data } = useHistoryData({ address })

  return (
    <div className="w-full min-h-72 py-12 md:px-4 flex justify-center">
      <Panel title="Your history">
        <HistoryDataTable data={data} />
      </Panel>
    </div>
  )
}
