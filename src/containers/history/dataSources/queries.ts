import { gql } from '@apollo/client'

export const history = (addy: string) => gql`{
    stakeds( where: { user_contains: "${addy}" } orderBy: blockTimestamp orderDirection: desc) {
      scheme
      amount
      transactionHash
      blockTimestamp
    }
    unstakeds( where: { user_contains: "${addy}" } orderBy: blockTimestamp orderDirection: desc ) {
      scheme
      amount
      transactionHash
      blockTimestamp
    }
    rewardsClaimeds( where: { user_contains: "${addy}" } orderBy: blockTimestamp orderDirection: desc ) {
      scheme
      rewards
      transactionHash
      blockTimestamp    
    }
  }`
