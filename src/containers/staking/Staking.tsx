'use client'
import { MigrationStaking } from './MigrationStaking'
import { KyotoTokenStaking } from './KyotoTokenStaking'
import { KyotoMigrationStakingModals } from './KyotoMigrationStakingModals'
import { KyotoTokenStakingModals } from './KyotoTokenStakingModals'

export const Staking = () => {
  return (
    <>
      <div className="w-full min-h-72 py-12 md:px-4 flex flex-col items-center gap-12">
        <KyotoTokenStaking />
        <MigrationStaking />
        <KyotoMigrationStakingModals />
        <KyotoTokenStakingModals />
      </div>
    </>
  )
}
