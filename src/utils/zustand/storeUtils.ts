import type { StateCreator, StoreMutatorIdentifier } from 'zustand'
import { create as _create } from 'zustand'

const resetters: (() => void)[] = []

export const resetAllStores = () => {
  for (const resetter of resetters) {
    resetter()
  }
}

export const create =
  <T>() =>
  <Mos extends [StoreMutatorIdentifier, unknown][] = []>(initializer: StateCreator<T, [], Mos>) => {
    const slice = _create(initializer)
    const initialSlice = slice.getState()
    resetters.push(() => {
      const handler = slice.setState as any
      handler(initialSlice, true)
    })

    return slice
  }
