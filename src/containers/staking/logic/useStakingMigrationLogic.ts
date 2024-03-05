import { useCallback, useMemo } from 'react'

export const useStakingMigrationLogic = () => {
  const loadPage = useCallback(() => {}, [])

  const unloadPage = useCallback(() => {}, [])

  const result = useMemo(
    () => ({
      loadPage,
      unloadPage,
    }),
    [loadPage, unloadPage],
  )
  return result
}
