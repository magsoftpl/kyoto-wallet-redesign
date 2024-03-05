import { AuthGuard } from '@/containers/authentication/authGuard'
import { Footer } from '@/containers/footer/Footer'
import { NavigationToolbar } from '@/containers/navigationToolbar/NavigationToolbar'
import { Staking } from '@/containers/staking/Staking'
import { UserInfoHeader } from '@/containers/userInfoHeader/UserInfoHeader'
import { AuthorizedLayout } from '@/layouts/authorized/AuthorizedLayout'

const StakingPage = () => {
  return (
    <AuthGuard redirectTarget="/login" sessionRestriction="required">
      <AuthorizedLayout header={<UserInfoHeader />} toolbar={<NavigationToolbar />} footer={<Footer />}>
        <Staking />
      </AuthorizedLayout>
    </AuthGuard>
  )
}

export default StakingPage
