import { useQuery } from '@apollo/client'
import { history } from './queries'
import { useCallback, useMemo } from 'react'
import { TransactionHistoryRow, useTransactionHistoryData } from './useTransactionHistoryData'

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
  action: 'stake' | 'unstake' | 'reward-claim' | 'migration-create' | 'release' | 'transfer-sent' | 'transfer-receive'
  amount: bigint
  transactionHash: string
  blockTimestamp: number
}

export const useHistoryData = ({ address }: { address: string | undefined }) => {
  const { data: graphData, refetch: refetchGraph } = useQuery<HistoryResponse>(history(address!), { skip: !address })
  const { data: txData, refetch: refetchTx } = useTransactionHistoryData({
    address,
    chain: 'kyoto',
    enabled: !!address,
  })

  const refetch = useCallback(() => {
    refetchGraph()
    refetchTx()
  }, [refetchGraph, refetchTx])

  const result = useMemo(() => {
    if (!graphData || !txData) {
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
    const parseTx = (tx: TransactionHistoryRow[]): HistoryItem[] => {
      if (!tx) {
        return []
      }
      return tx.map((res) => ({
        action: res.from === address ? 'transfer-sent' : 'transfer-receive',
        scheme: undefined,
        blockTimestamp: Number(res.time.getTime() / 1000),
        transactionHash: res.hash,
        amount: BigInt(res.value),
      }))
    }
    const res = [
      ...parseStaked(graphData.stakingPoolStakeds),
      ...parseUnstaked(graphData.stakingPoolUnstakeds),
      ...parseClaimed(graphData.stakingPoolRewardsClaimeds),
      ...parseMigrationCreation(graphData.vestingScheduleCreateds),
      ...parseMigrationClaim(graphData.kyotoVestingReleaseds),
      ...parseTx(txData),
    ].sort((a, b) => b.blockTimestamp - a.blockTimestamp)
    return res
  }, [address, graphData, txData])
  return { data: result, refetch }
}
