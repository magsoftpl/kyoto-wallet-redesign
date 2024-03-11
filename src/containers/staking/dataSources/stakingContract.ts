import { stakingContractAbi } from '@/abis/stakingContract.abi'
import { getEnvConfigValue } from '@/containers/envConfig/envConfig'
import { useNetworkConfig } from '@/containers/web3/useNetworkConfigs'
import { useCallback, useMemo } from 'react'
import { Address } from 'viem'
import { useReadContract, useReadContracts, useWriteContract } from 'wagmi'

export interface TokenStakingInfo {
  stakedAmount: bigint
  startTimestamp: bigint
  claimedRewards: bigint
}

export interface TokenStakingRewardsInfo {
  stakeId: number
  amount: bigint
}

export const useStakingContract = ({ owner, readEnabled = true }: { owner: Address; readEnabled?: boolean }) => {
  const { kyoto } = useNetworkConfig()
  const address = getEnvConfigValue('KYOTO_STAKING_ADDRESS') as Address
  const { writeContractAsync } = useWriteContract()

  const { data: allStakeCount } = useReadContract({
    abi: stakingContractAbi,
    functionName: 'stakeCountByStaker',
    args: [owner],
    chainId: kyoto.chainId,
    address,
    query: {
      enabled: readEnabled && !!owner,
    },
  })
  const stakeIds = useMemo(() => Array.from(Array(Number(allStakeCount || 0)).keys()), [allStakeCount])

  const { data: poolCapacity } = useReadContract({
    abi: stakingContractAbi,
    functionName: 'poolCapacity',
    args: [],
    chainId: kyoto.chainId,
    address,
    query: {
      enabled: readEnabled && !!owner,
    },
  })

  const { data: allStakes } = useReadContracts({
    contracts: stakeIds.map((stakeId) => ({
      abi: stakingContractAbi,
      functionName: 'stakes',
      args: [owner, stakeId],
      chainId: kyoto.chainId,
      address,
    })),
  })

  const { data: allRewards } = useReadContracts({
    contracts: stakeIds.map((stakeId) => ({
      abi: stakingContractAbi,
      functionName: 'rewards',
      args: [owner, stakeId],
      chainId: kyoto.chainId,
      address,
    })),
  })

  const [stakes, rewards] = useMemo(() => {
    if (!allStakes || !allRewards) {
      return []
    }
    const wrkStakes: TokenStakingInfo[] = []
    const wrkRewards: TokenStakingRewardsInfo[] = []
    for (let stakeId = 0; stakeId < allStakes.length; stakeId++) {
      const stakeResponse = allStakes[stakeId]
      const stakeResult = stakeResponse.result as unknown as [bigint, bigint, bigint, bigint]
      if (!stakeResult || !stakeResult[0]) {
        continue
      }
      wrkStakes.push({ stakedAmount: stakeResult[0], startTimestamp: stakeResult[1], claimedRewards: stakeResult[2] })
      wrkRewards.push({ stakeId, amount: allRewards[stakeId].result as unknown as bigint })
    }
    return [wrkStakes, wrkRewards]
  }, [allStakes, allRewards])

  const stake = useCallback(
    async (amount: bigint) => {
      const result = await writeContractAsync({
        abi: stakingContractAbi,
        functionName: 'stake',
        args: [owner],
        chainId: kyoto.chainId,
        address,
        value: amount as any,
      })
      return result
    },
    [address, kyoto.chainId, owner, writeContractAsync],
  )

  const claimRewards = useCallback(
    async (stakeId: bigint, amount: bigint) => {
      const result = await writeContractAsync({
        abi: stakingContractAbi,
        functionName: 'claimRewards',
        args: [stakeId, amount],
        chainId: kyoto.chainId,
        address,
      })
      return result
    },
    [address, kyoto.chainId, writeContractAsync],
  )

  return {
    stakeCount: stakes?.length,
    poolCapacity,
    rewards,
    stakes,
    stake,
    claimRewards,
  }
}
