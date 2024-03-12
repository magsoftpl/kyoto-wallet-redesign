import { useQuery } from '@apollo/client'
import { history } from './queries'
import { useMemo } from 'react'

type HistoryResponseKey =
  | 'stakingPoolStakeds'
  | 'stakingPoolUnstakeds'
  | 'stakingPoolRewardsClaimeds'
  | 'vestingScheduleCreateds'
  | 'kyotoVestingReleaseds'

export type HistoryResponse = Record<HistoryResponseKey, HistoryResponseItemRow[]>

interface HistoryResponseItemRow {
  __typename: HistoryResponseKey
  scheme: number
  stakedAmount?: string
  unstakedAmount?: string
  rewards?: string
  amountToVest?: string
  releasedAmount?: string
  transactionHash: string
  blockTimestamp: string
}

export interface HistoryItem {
  action: 'stake' | 'unstake' | 'reward-claim' | 'migration-create' | 'release'
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
        blockTimestamp: Number(res.blockTimestamp),
        transactionHash: res.transactionHash,
        amount: BigInt(res.stakedAmount!),
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
        amount: BigInt(res.unstakedAmount!),
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
    const parseMigrationCreation = (staked: HistoryResponseItemRow[] | undefined): HistoryItem[] => {
      if (!staked) {
        return []
      }
      return staked.map((res) => ({
        action: 'migration-create',
        scheme: undefined,
        blockTimestamp: Number(res.blockTimestamp),
        transactionHash: res.transactionHash,
        amount: BigInt(res.amountToVest!),
      }))
    }
    const parseMigrationClaim = (staked: HistoryResponseItemRow[] | undefined): HistoryItem[] => {
      if (!staked) {
        return []
      }
      return staked.map((res) => ({
        action: 'release',
        scheme: undefined,
        blockTimestamp: Number(res.blockTimestamp),
        transactionHash: res.transactionHash,
        amount: BigInt(res.releasedAmount!),
      }))
    }
    const res = [
      ...parseStaked(data.stakingPoolStakeds),
      ...parseUnstaked(data.stakingPoolUnstakeds),
      ...parseClaimed(data.stakingPoolRewardsClaimeds),
      ...parseMigrationCreation(data.vestingScheduleCreateds),
      ...parseMigrationClaim(data.kyotoVestingReleaseds),
    ].sort((a, b) => b.blockTimestamp - a.blockTimestamp)
    return res
  }, [data])
  return { data: result, refetch }
}
