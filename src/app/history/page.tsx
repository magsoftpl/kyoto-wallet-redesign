import { AuthGuard } from '@/containers/authentication/authGuard'
import { Footer } from '@/containers/footer/Footer'
import { NavigationToolbar } from '@/containers/navigationToolbar/NavigationToolbar'
import { UserInfoHeader } from '@/containers/userInfoHeader/UserInfoHeader'
import { AuthorizedLayout } from '@/layouts/authorized/AuthorizedLayout'
import { History } from '@/containers/history/History'
import { ErrorToasts } from '@/containers/errorHandling/ErrorToasts'

const HistoryPage = () => {
  return (
    <AuthGuard redirectTarget="/login" sessionRestriction="required">
      <AuthorizedLayout header={<UserInfoHeader />} toolbar={<NavigationToolbar />} footer={<Footer />}>
        <History />
        <ErrorToasts />
      </AuthorizedLayout>
    </AuthGuard>
  )
}

export default HistoryPage
