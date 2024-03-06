import { logError } from '../maintenanceLogs/maintenanceLog'
import useCurrentUserData from './dataSources/errorPopup.slice'

export const handleOperationError = async (message: string, details?: unknown) => {
  logError(message, details)
  useCurrentUserData.getState().setCurrentError(message)
}
