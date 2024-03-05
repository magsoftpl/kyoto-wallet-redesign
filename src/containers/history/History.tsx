'use client'

import { useHistoryData } from './store/useHistoryData'
import { useCurrentWalletInfo } from '../web3/useCurrentWalletInfo'
import { HistoryDataTable } from './components/HistoryDataTable'
import { useEffect } from 'react'
import { Panel } from '@/components/complex-controls/Panel'

export const History = () => {
  const { address } = useCurrentWalletInfo()
  const { data, refetch } = useHistoryData({ address })

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div className="w-full min-h-72 py-12 md:px-4 flex justify-center">
      <Panel title="Your history">
        <HistoryDataTable data={data} />
      </Panel>
    </div>
  )
}
