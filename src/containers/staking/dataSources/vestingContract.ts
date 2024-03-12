import { useReadContracts, useWriteContract } from 'wagmi'
import { vestingContractAbi } from '@/abis/vestingContract.abi'
import { useNetworkConfig } from '@/containers/web3/useNetworkConfigs'
import { useCallback, useMemo } from 'react'
import { getEnvConfigValue } from '../../envConfig/envConfig'
import { Address } from '@/types/address.type'

export interface VestingInfoRow {
  vestingId: bigint
  address: string
  totalAmount: bigint
  vestingStart: bigint
  alreadyReleased: bigint
}

export interface VestingRelesasbleInfoRow {
  vestingId: bigint
  amount: bigint
}

export const useVestingContract = ({ scheduleIds }: { scheduleIds: bigint[] }) => {
  const { kyoto } = useNetworkConfig()
  const address = getEnvConfigValue('KYOTO_VESTING_ADDRESS') as Address
  const stakingPoolAddress = getEnvConfigValue('KYOTO_STAKING_ADDRESS') as Address

  const { data: vestingInfoResponse, refetch: refetchVestingInfo } = useReadContracts({
    contracts: scheduleIds.map((scheduleId) => ({
      address,
      abi: vestingContractAbi,
      functionName: 'vestingScheduleById',
      args: [scheduleId],
      chainId: kyoto.chainId,
    })),
  })

  const { data: relesableResponse } = useReadContracts({
    contracts: scheduleIds.map((scheduleId) => ({
      address,
      abi: vestingContractAbi,
      functionName: 'releasable',
      args: [scheduleId],
      chainId: kyoto.chainId,
    })),
  })

  const { writeContractAsync } = useWriteContract()

  const releasableInfo = useMemo(
    () =>
      relesableResponse?.map((rel, index) => {
        const res = rel.result as unknown as bigint
        return {
          vestingId: scheduleIds[index],
          amount: res,
        } satisfies VestingRelesasbleInfoRow
      }),
    [relesableResponse, scheduleIds],
  )

  const isReleasableInfoError = useMemo(
    () => relesableResponse?.some((rel) => rel.status === 'failure'),
    [relesableResponse],
  )

  const vestingInfo = useMemo(
    () =>
      vestingInfoResponse?.map((vir, index) => {
        const res = vir.result as unknown as [string, bigint, bigint, bigint]
        return {
          vestingId: scheduleIds[index],
          address: res[0],
          totalAmount: res[1],
          vestingStart: res[2],
          alreadyReleased: res[3],
        } satisfies VestingInfoRow
      }),
    [scheduleIds, vestingInfoResponse],
  )
  const isVestingInfoError = useMemo(
    () => vestingInfoResponse?.some((vir) => vir.status === 'failure'),
    [vestingInfoResponse],
  )

  const release = useCallback(
    async (vestingId: bigint, amount: bigint) => {
      const result = await writeContractAsync({
        abi: vestingContractAbi,
        functionName: 'release',
        args: [vestingId, amount],
        chainId: kyoto.chainId,
        address,
      })
      return result
    },
    [address, kyoto.chainId, writeContractAsync],
  )

  const stake = useCallback(
    async (vestingId: bigint, amount: bigint) => {
      const result = await writeContractAsync({
        abi: vestingContractAbi,
        functionName: 'stake',
        args: [vestingId, amount, stakingPoolAddress],
        chainId: kyoto.chainId,
        address,
      })
      return result
    },
    [address, kyoto.chainId, stakingPoolAddress, writeContractAsync],
  )

  const result = useMemo(
    () => ({
      vestingInfo,
      isVestingInfoError,
      releasableInfo,
      isReleasableInfoError,
      release,
      stake,
      refetchVestingInfo,
    }),
    [isReleasableInfoError, isVestingInfoError, refetchVestingInfo, releasableInfo, release, stake, vestingInfo],
  )
  return result
}
