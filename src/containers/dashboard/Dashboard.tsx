'use client'

import { VoteLink } from '../externalApps/VoteLink'
import { KyotoTokenStaking } from '../staking/KyotoTokenStaking'
import { KyotoTokenStakingModals } from '../staking/KyotoTokenStakingModals'

export const Dashboard = () => {
  return (
    <>
      <div className="w-full min-h-72 py-12 md:px-4 flex flex-col items-center gap-12">
        <KyotoTokenStaking toolbar={<VoteLink showLabel />} />
        <KyotoTokenStakingModals />
      </div>
    </>
  )
}
