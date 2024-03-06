import { useQuery } from '@apollo/client'
import { history } from './queries'
import { useMemo } from 'react'

export type HistoryResponse = Record<string, HistoryResponseItemRow[]>

interface HistoryResponseItemRow {
  __typename: string
  scheme: number
  amount?: string
  rewards?: string
  transactionHash: string
  blockTimestamp: string
}

export interface HistoryItem {
  action: 'stake' | 'unstake' | 'reward-claim'
  scheme: number
  amount: bigint
  transactionHash: string
  blockTimestamp: number
}

export const useHistoryData = ({ address }: { address: string | undefined }) => {
  const { data, refetch } = useQuery<HistoryResponse>(history(address!), { skip: !address })

  const result = useMemo(() => {
    if (!data) {
      return []
    }
    const parseStaked = (staked: HistoryResponseItemRow[] | undefined): HistoryItem[] => {
      if (!staked) {
        return []
      }
      return staked.map((res) => ({
        action: 'stake',
        scheme: res.scheme,
        blockTimestamp: Number(res.blockTimestamp),
        transactionHash: res.transactionHash,
        amount: BigInt(res.amount!),
      }))
    }
    const parseUnstaked = (staked: HistoryResponseItemRow[] | undefined): HistoryItem[] => {
      if (!staked) {
        return []
      }
      return staked.map((res) => ({
        action: 'unstake',
        scheme: res.scheme,
        blockTimestamp: Number(res.blockTimestamp),
        transactionHash: res.transactionHash,
        amount: BigInt(res.amount!),
      }))
    }
    const parseClaimed = (staked: HistoryResponseItemRow[] | undefined): HistoryItem[] => {
      if (!staked) {
        return []
      }
      return staked.map((res) => ({
        action: 'reward-claim',
        scheme: res.scheme,
        blockTimestamp: Number(res.blockTimestamp),
        transactionHash: res.transactionHash,
        amount: BigInt(res.rewards!),
      }))
    }
    const res = [
      ...parseStaked(data.stakeds),
      ...parseUnstaked(data.unstakeds),
      ...parseClaimed(data.rewardsClaimeds),
    ].sort((res) => res.blockTimestamp)
    return res
  }, [data])
  return { data: result, refetch }
}
