let configuration: Record<string, string> | null = null

type ConfigKey =
  | 'MORALIS_URL'
  | 'MORALIS_API_KEY'
  | 'WALLET_CONNECT_PROJECT_ID'
  | 'KYOTO_STAKING_GRAPHQL_URL'
  | 'KYOTO_RPC_URL'
  | 'KYOTO_CHAIN_ID'
  | 'KYOTO_EXPLORER_URL'
  | 'BSC_RPC_URL'
  | 'BSC_CHAIN_ID'
  | 'BSC_EXPLORER_URL'
  | 'BSC_KYOTO_TOKEN_ADDRESS'
  | 'BSC_MIGRATOR_ADDRESS'
  | 'KYOTO_VALIDATOR_NFT_ADDRESS'
  | 'KYOTO_MASTER_NFT_ADDRESS'
  | 'KYOTO_DELEGATOR_ADDRESS'
  | 'KYOTO_MIGRATOR_ADDRESS'
  | 'KYOTO_MASTER_NODE_REWARD_DIST_ADDRESS'
  | 'KYOTO_VALIDATOR_NODE_REWARD_DIST_ADDRESS'
  | 'BSC_MIGRATION_PROVISION_IN_WEI'

export const setEnvConfig = (cfg: Record<string, string>) => {
  configuration = cfg
}

export const getEnvConfigValue = (key: ConfigKey): string => {
  if (!configuration) {
    throw new Error('Configuration not loaded')
  }
  return configuration[key] || ''
}
