import { useReadContract, useWriteContract } from 'wagmi'
import { bscMigrationSourceContractAbi } from '@/abis/bscMigrationSourceContract.abi'
import { useNetworkConfig } from '@/containers/web3/useNetworkConfigs'
import { useCallback, useMemo } from 'react'
import { getEnvConfigValue } from '../../envConfig/envConfig'
import { Address } from '@/types/address.type'

export const useBscMigrationSourceContract = ({ owner }: { owner: Address }) => {
  const { bsc } = useNetworkConfig()
  const address = getEnvConfigValue('BSC_MIGRATOR_ADDRESS') as Address

  const migrationFee = getEnvConfigValue('BSC_MIGRATION_PROVISION_IN_WEI')
    ? BigInt(getEnvConfigValue('BSC_MIGRATION_PROVISION_IN_WEI'))
    : undefined

  const { data: balance } = useReadContract({
    abi: bscMigrationSourceContractAbi,
    functionName: 'balanceOf',
    args: [owner],
    chainId: bsc.chainId,
    address,
    query: {
      enabled: !!owner,
    },
  })
  const { writeContractAsync } = useWriteContract()

  const migrate = useCallback(
    async (amount: bigint) => {
      const result = await writeContractAsync({
        abi: bscMigrationSourceContractAbi,
        functionName: 'migrate',
        args: [amount],
        chainId: bsc.chainId,
        address,
        value: migrationFee as any,
      })
      return result
    },
    [address, bsc.chainId, migrationFee, writeContractAsync],
  )

  const result = useMemo(
    () => ({
      balance,
      migrate,
    }),
    [balance, migrate],
  )
  return result
}
