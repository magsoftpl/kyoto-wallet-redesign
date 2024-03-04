import { gql } from '@apollo/client'

export const history = (addy: string) => gql`{
    stakeds( where: { user_contains: "${addy}" } ) {
      scheme
      amount
      transactionHash
      blockTimestamp
    }
    unstakeds( where: { user_contains: "${addy}" } ) {
      scheme
      amount
      transactionHash
      blockTimestamp
    }
    rewardsClaimeds( where: { user_contains: "${addy}" } ) {
      scheme
      rewards
      transactionHash
      blockTimestamp    
    }
  }`
