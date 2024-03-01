import { useRedirector } from '@/containers/navigation/useNavigator'

const RootPage = () => {
  const redirect = useRedirector()
  return redirect('login')
}

export default RootPage
