'use client'

import { useHistoryData } from './store/useHistoryData'
import { useCurrentWalletInfo } from '../web3/useCurrentWalletInfo'
import { HistoryDataTable } from './components/HistoryDataTable'
import { useEffect } from 'react'

export const History = () => {
  const { address } = useCurrentWalletInfo()
  const { data, refetch } = useHistoryData({ address })

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div className="w-full min-h-72 py-12 md:px-4 flex justify-center">
      <div className="w-full max-w-[100rem] rounded-2xl overflow-y-hidden border-inactive-100 border-solid border-2">
        <div className="px-8 py-4 bg-secondary-950 text-white uppercase">Your history</div>
        <div className="p-8">
          <HistoryDataTable data={data} />
        </div>
      </div>
    </div>
  )
}
