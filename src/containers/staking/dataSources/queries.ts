import { gql } from '@apollo/client'

export const vestingData = (address: string) => gql`
  {
    vestingScheduleCreateds(
      where: { beneficiary: "${address}" }
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
