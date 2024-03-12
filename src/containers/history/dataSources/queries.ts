import { gql } from '@apollo/client'

export const history = (address: string) => gql`{
    stakingPoolStakeds( where: { staker: "${address}" } orderBy: blockTimestamp orderDirection: desc) {
      stakedAmount
      transactionHash
      blockTimestamp
    }
    stakingPoolUnstakeds( where: { staker: "${address}" } orderBy: blockTimestamp orderDirection: desc ) {
      unstakedAmount
      transactionHash
      blockTimestamp
    }
    stakingPoolRewardsClaimeds( where: { staker: "${address}" } orderBy: blockTimestamp orderDirection: desc ) {
      rewards
      blockTimestamp
      transactionHash
    }
    vestingScheduleCreateds( where: { beneficiary: "${address}" } orderBy: blockNumber orderDirection: desc ) {
      amountToVest
      blockTimestamp
      transactionHash
    }
    kyotoVestingReleaseds( where: { beneficiary: "${address}" } orderBy: blockTimestamp orderDirection: desc ) {
      releasedAmount
      transactionHash
      blockTimestamp
    }    
  }`
