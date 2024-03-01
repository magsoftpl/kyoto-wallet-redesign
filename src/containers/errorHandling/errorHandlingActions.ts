import { logError } from '../maintenanceLogs/maintenanceLog'

export const handleOperationError = async (message: string, details?: unknown) => {
  logError(message, details)
  //TODO: Error toast
}

export const clearCurrentErrors = async () => {
  //TODO: close error toast
}
