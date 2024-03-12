import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { HistoryItem } from '../dataSources/useHistoryData'
import { DataTable } from '@/components/complex-controls/DataTable'
import { formatBlockTimestampAsDate } from '@/components/formatters/BlockTimestampAsDateFormatter'
import { TxLink } from '@/containers/web3/TxLink'
import { formatStake } from '@/components/formatters/StakeFormatter'
import { formatEthValue } from '@/components/formatters/EthValueFormatter'

export const dateStyler = (credentialsData: HistoryItem) => {
  const { blockTimestamp } = credentialsData
  return <div className="font-semibold">{formatBlockTimestampAsDate(blockTimestamp, { datePattern: 'P' })}</div>
}

export const actionStyler = (credentialsData: HistoryItem) => {
  const { action } = credentialsData
  let actionText: string = ''
  let actionDetails: string | null = null
  switch (action) {
    case 'stake': {
      actionText = 'Staked'
      actionDetails = formatStake()
      break
    }
    case 'unstake': {
      actionText = 'Unstaked'
      actionDetails = formatStake()
      break
    }
    case 'reward-claim': {
      actionText = 'Claimed rewards'
      actionDetails = formatStake({ lockSuffix: true })
      break
    }
    case 'migration-create': {
      actionText = 'Migration'
      actionDetails = 'Receive'
      break
    }
    case 'release': {
      actionText = 'Claimed rewards'
      actionDetails = 'Migration'
      break
    }
    case 'transfer-sent': {
      actionText = 'Transfer'
      actionDetails = 'Sent'
      break
    }
    case 'transfer-receive': {
      actionText = 'Transfer'
      actionDetails = 'Receive'
      break
    }
  }
  return (
    <div className="flex flex-col uppercase">
      <div className="font-semibold">{actionText}</div>
      <div>{actionDetails}</div>
    </div>
  )
}

export const valueStyler = (credentialsData: HistoryItem) => {
  const { amount } = credentialsData
  return <div className="font-semibold">{formatEthValue(amount, { currency: 'KYOTO' })}</div>
}

export const txHashStyler = (credentialsData: HistoryItem) => {
  const { transactionHash } = credentialsData
  return (
    <TxLink chain="kyoto" txHash={transactionHash}>
      {transactionHash}
    </TxLink>
  )
}

const credentialsColumns: ColumnDef<HistoryItem>[] = [
  {
    id: 'walletAddress',
    header: 'DATE',
    accessorKey: 'walletAddress',
    cell: (info) => dateStyler(info.row.original),
  },
  {
    id: 'action',
    header: 'ACTION',
    accessorKey: 'scheme',
    cell: (info) => actionStyler(info.row.original),
  },
  {
    id: 'value',
    header: 'VALUE',
    accessorKey: 'amount',
    cell: (info) => valueStyler(info.row.original),
  },
  {
    id: 'txHash',
    header: 'TRANSACTION HASH',
    accessorKey: 'transactionHash',
    cell: (info) => txHashStyler(info.row.original),
  },
]

export const HistoryDataTable = ({ data }: { data: HistoryItem[] }) => {
  const table = useReactTable({
    data,
    columns: credentialsColumns,
    getCoreRowModel: getCoreRowModel(),
  })
  return <DataTable definition={table} noDataText="No history data" listViewOnSmall />
}
