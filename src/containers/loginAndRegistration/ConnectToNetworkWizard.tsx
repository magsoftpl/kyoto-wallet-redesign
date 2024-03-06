import { useSession } from '../authentication/useSession'
import { useNavigator } from '../navigation/useNavigator'
import { ModalLoginWizardMethodSelect } from './components/Wizards/ModalLoginWizardMethodSelect'
import { ModalLoginWizardWallet } from './components/Wizards/ModalLoginWizardWallet'
import { ModalWalletAlreadyAssignedWarning } from './components/Wizards/ModalWalletAlreadyAssignedWarning'
import { useConnectToNetworkWizardLogic } from './logic/useConnectToNetworkWizardLogic'
import useLoginStateData from './dataSources/loginData.slice'

export const ConnectToNetworkWizard = () => {
  const navigate = useNavigator()
  const { connectToNetworkWizard } = useLoginStateData()
  const { hideConnectToNetworkWizard, selectProvider, initWalletConnection, resetWalletConnection, finishConnecting } =
    useConnectToNetworkWizardLogic()
  const { terminateSession } = useSession()

  const isWalletAreadyAssigned =
    connectToNetworkWizard?.errorCode === 'WALLET_ALREDY_ASSIGNED' ||
    connectToNetworkWizard?.errorCode === 'USER_HAS_OTHER_WALLET'

  const handleLogout = () => {
    terminateSession(() => navigate('login'))
  }

  return (
    <>
      {connectToNetworkWizard && !connectToNetworkWizard.provider && (
        <ModalLoginWizardMethodSelect
          walletsOnly
          onClose={hideConnectToNetworkWizard}
          onMethodSelect={(method) => {
            if (method === 'email') {
              return
            }
            selectProvider(method.provider)
          }}
        />
      )}
      {connectToNetworkWizard && connectToNetworkWizard.provider && !isWalletAreadyAssigned && (
        <ModalLoginWizardWallet
          messageToSign={connectToNetworkWizard.messageToSign}
          provider={connectToNetworkWizard.provider}
          onBack={() => selectProvider(null)}
          onClose={hideConnectToNetworkWizard}
          onWalletConnected={initWalletConnection}
          onWalletAddressChanged={resetWalletConnection}
          onLoginWithWallet={finishConnecting}
        />
      )}
      {connectToNetworkWizard && connectToNetworkWizard.provider && isWalletAreadyAssigned && (
        <ModalWalletAlreadyAssignedWarning
          errorCode={connectToNetworkWizard.errorCode!}
          onClose={hideConnectToNetworkWizard}
          onConnectDifferentWallet={() => selectProvider(null)}
          onLogout={handleLogout}
        />
      )}
    </>
  )
}
