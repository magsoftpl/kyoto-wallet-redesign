import { gql } from '@apollo/client'

export const vestingData = (addy: string) => gql`
  {
    vestingScheduleCreateds(
      where: { beneficiary: "${addy}" }
      orderBy: blockNumber
      orderDirection: desc
    ) {
      vestingId: nextStakeId
      address: beneficiary
      amount: amountToVest
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`
