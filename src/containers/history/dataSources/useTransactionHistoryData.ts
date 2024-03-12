import { getApiClient } from '@/containers/authentication/authClient'
import { WalletChain, useNetworkConfig } from '@/containers/web3/useNetworkConfigs'
import { useCallback, useEffect, useMemo, useState } from 'react'

export interface TransactionHistoryRow {
  from: string
  to: string
  value: string
  hash: string
  time: Date
}

export const useTransactionHistoryData = ({
  chain,
  address,
  enabled,
}: {
  chain: WalletChain
  address: string | undefined
  enabled: boolean
}) => {
  const chains = useNetworkConfig()
  const [data, setData] = useState<TransactionHistoryRow[] | null>(null)
  const fetchData = useCallback(async () => {
    const exp = chains[chain].explorerUrl.endsWith('/') ? chains[chain].explorerUrl : `${chains[chain].explorerUrl}/`
    const link = `${exp}api/v2/addresses/${address}/transactions?items_count=200`
    const apiClient = await getApiClient()
    const response = await apiClient.get<{
      items: {
        result: string
        tx_types: string
        from: { is_contract: boolean; hash: string }
        to: { is_contract: boolean; hash: string }
        value: string
        hash: string
        timestamp: string
      }[]
    }>(link)
    const dataToSet = response.data.items
      .filter((item) => item.result === 'success' && item.tx_types.includes('coin_transfer') && !item.to.is_contract)
      .map((item) => ({
        from: item.from.hash,
        to: item.to.hash,
        value: item.value,
        hash: item.hash,
        time: new Date(item.timestamp),
      }))
    setData(dataToSet)
  }, [address, chain, chains])

  useEffect(() => {
    if (!enabled) {
      return
    }
    fetchData()
  }, [enabled, fetchData])

  const refetch = useCallback(() => {
    if (!enabled) {
      return
    }
    fetchData()
  }, [enabled, fetchData])

  const result = useMemo(
    () => ({
      data,
      refetch,
    }),
    [data, refetch],
  )

  return result
}
