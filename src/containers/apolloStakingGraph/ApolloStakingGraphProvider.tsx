'use client'
import { getEnvConfigValue } from '@/containers/envConfig/envConfig'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { ReactNode } from 'react'

export const ApolloStakingGraphProvider = ({ children }: { children: ReactNode }) => {
  const client = new ApolloClient({
    uri: getEnvConfigValue('KYOTO_STAKING_GRAPHQL_URL'),
    cache: new InMemoryCache(),
  })
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
