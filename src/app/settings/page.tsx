import { AuthGuard } from '@/containers/authentication/authGuard'
import { ErrorToasts } from '@/containers/errorHandling/ErrorToasts'
import { Footer } from '@/containers/footer/Footer'
import { NavigationToolbar } from '@/containers/navigationToolbar/NavigationToolbar'
import { Settings } from '@/containers/settings/Settings'
import { UserInfoHeader } from '@/containers/userInfoHeader/UserInfoHeader'
import { AuthorizedLayout } from '@/layouts/authorized/AuthorizedLayout'

const SettingsPage = () => {
  return (
    <AuthGuard redirectTarget="/login" sessionRestriction="required">
      <AuthorizedLayout header={<UserInfoHeader />} toolbar={<NavigationToolbar />} footer={<Footer />}>
        <Settings />
        <ErrorToasts />
      </AuthorizedLayout>
    </AuthGuard>
  )
}

export default SettingsPage
