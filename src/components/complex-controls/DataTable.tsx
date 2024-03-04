import React from 'react'
import { flexRender, Table } from '@tanstack/react-table'
import { NoData } from '@/components/simple-controls/noData/NoData'
import { Loader } from '@/components/simple-controls/loader/Loader'
import classNames from 'classnames'

interface DataTableProps {
  noDataText: string
  definition: Table<any>
  listViewOnSmall?: boolean
  isPartialLoad?: boolean
}

export const DataTable: React.FC<DataTableProps> = ({ noDataText, definition, listViewOnSmall, isPartialLoad }) => {
  const tableClass = classNames(
    'text-left w-full text-sm font-light border-spacing-0 border-collapse',
    listViewOnSmall && 'block lg:table',
  )
  const headClass = classNames(
    'h-11 bg-inactive-50 ',
    listViewOnSmall && 'absolute lg:static left-[-9999px] top-[-9999px]',
  )
  const bodyClass = classNames('w-full relative', listViewOnSmall && 'block lg:table-row-group')
  return (
    <table className={tableClass}>
      <thead className={headClass}>
        {definition.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className="px-6 text-xs font-medium first:rounded-l-2xl last:rounded-r-2xl"
              >
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className={bodyClass}>
        {!definition.getRowModel().rows.length && (
          <tr>
            <td colSpan={definition.getAllColumns().length}>
              {!isPartialLoad && <NoData text={noDataText} />}
              {isPartialLoad && (
                <div className="h-16">
                  <Loader theme="dark" />
                </div>
              )}
            </td>
          </tr>
        )}
        {isPartialLoad && (
          <tr>
            <td>
              <Loader theme="dark" />
            </td>
          </tr>
        )}
        {definition.getRowModel().rows.map((row) => {
          const isLastRow = definition.getRowModel().rows[definition.getRowModel().rows.length - 1] === row
          const rowClass = classNames(
            'border-0 border-b border-inactive-200 cursor-default',
            listViewOnSmall && 'block lg:table-row',
            isLastRow ? 'border-none' : 'border-solid',
          )
          return (
            <tr key={row.id} className={rowClass}>
              {row.getVisibleCells().map((cell) => {
                const clazz = classNames(
                  'relative py-4',
                  listViewOnSmall ? 'pl-60 lg:pl-6 pr-6' : 'px-6',
                  listViewOnSmall && 'block lg:table-cell',
                  listViewOnSmall && 'before:absolute before:left-6 before:inline-block lg:before:hidden',
                  listViewOnSmall && `before:content-[attr(data-label)]`,
                )
                return (
                  <td key={cell.id} data-label={cell.column.columnDef.header} className={clazz}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
