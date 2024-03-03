const MAINTENANCE_LOGS_LIMIT = 100
const MAINTENANCE_LOGS: unknown[] = []
;(global as any).maintenanceLogs = MAINTENANCE_LOGS

export const logError = (text: string, payload: unknown) => {
  // eslint-disable-next-line no-console
  console.error(payload)
  store('error', text, payload)
}

export const logInfo = (text: string, payload: unknown) => {
  store('info', text, payload)
}

export const clearLogs = () => {
  MAINTENANCE_LOGS.splice(0)
}

function store(analysis: string, text: string, payload: unknown) {
  MAINTENANCE_LOGS.unshift({
    analysis,
    text,
    payload,
    timestamp: new Date(),
  })
  MAINTENANCE_LOGS.splice(MAINTENANCE_LOGS_LIMIT)
}
