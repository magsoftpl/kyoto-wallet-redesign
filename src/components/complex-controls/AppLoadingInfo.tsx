import { FC, PropsWithChildren } from 'react'

export const AppLoadingInfo: FC<PropsWithChildren> = ({ children }) => {
  return <div className="w-screen h-screen bg-secondary-950 flex justify-center items-center">{children}</div>
}
