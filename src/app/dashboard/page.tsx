import { Footer } from '@/containers/footer/Footer'
import { NavigationToolbar } from '@/containers/navigationToolbar/NavigationToolbar'
import { UserInfoHeader } from '@/containers/userInfoHeader/UserInfoHeader'
import { AuthorizedLayout } from '@/layouts/authorized/AuthorizedLayout'
import { AuthGuard } from '@/containers/authentication/authGuard'
import { ErrorToasts } from '@/containers/errorHandling/ErrorToasts'
import { Dashboard } from '@/containers/dashboard/Dashboard'

const DashboardPage = () => {
  return (
    <AuthGuard redirectTarget="/login" sessionRestriction="required">
      <AuthorizedLayout header={<UserInfoHeader />} toolbar={<NavigationToolbar />} footer={<Footer />}>
        <Dashboard />
        <ErrorToasts />
      </AuthorizedLayout>
    </AuthGuard>
  )
}

export default DashboardPage
