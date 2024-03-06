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

export interface VestingRow {
  address: string
  amount: bigint
  blockNumber: number
  blockTimestamp: number
  transactionHash: string
  vestingId: bigint
}

export const useVestingData = ({ address }: { address: string | undefined }) => {
  const { data, refetch } = useQuery<HistoryResponse>(vestingData(address!), { skip: !address })

  const result = useMemo(() => {
    if (!data) {
      return []
    }
    return data.vestingScheduleCreateds.map(
      (vsc) =>
        ({
          address: vsc.address,
          amount: BigInt(vsc.amount),
          blockNumber: Number(vsc.blockNumber),
          blockTimestamp: Number(vsc.blockTimestamp),
          transactionHash: vsc.transactionHash,
          vestingId: BigInt(vsc.vestingId),
        } satisfies VestingRow),
    )
  }, [data])
  return { data: result, refetch }
}
