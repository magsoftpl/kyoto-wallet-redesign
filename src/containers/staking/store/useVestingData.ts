import { useQuery } from '@apollo/client'
import { vestingData } from './queries'
import { useMemo } from 'react'

export type HistoryResponse = Record<'vestingScheduleCreateds', VestingResponseItemRow[]>

interface VestingResponseItemRow {
  __typename: string
  vestingId: number
  address: string
  amount: bigint
  blockNumber: number
  blockTimestamp: number
  transactionHash: string
}

export const useVestingData = ({ address }: { address: string | undefined }) => {
  const { data, refetch } = useQuery<HistoryResponse>(vestingData(address!), { skip: !address })

  const result = useMemo(() => {
    if (!data) {
      return []
    }
    return data.vestingScheduleCreateds
  }, [data])
  return { data: result, refetch }
}
