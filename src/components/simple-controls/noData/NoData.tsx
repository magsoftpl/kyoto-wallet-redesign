import { FC } from 'react'

export interface NoDataProps {
  text?: string
}

export const NoData: FC<NoDataProps> = ({ text }: NoDataProps) => {
  return <div className="w-full py-6 text-center uppercase">{text || 'No records'}</div>
}
