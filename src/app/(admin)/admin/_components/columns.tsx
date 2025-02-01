'use client'

import { ColumnDef } from '@tanstack/react-table'
import type { Pool } from '@/types/pools'
import { DataTableColumnHeader } from './data-table-column-head'
import { DataTableRowActions } from './data-table-row-actions'
import Link from 'next/link'

// Define the columns for the pools table
export const columns: ColumnDef<Pool>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="이름" />
    ),
    cell: ({ row }) => {
      const name = row.original.name
      const id = row.original.id

      return (
        <Link
          href={`/pools/${id}`}
          className="text-left font-medium hover:text-primary hover:underline"
        >
          {name}
        </Link>
      )
    },
  },
  {
    accessorKey: 'address',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="주소" />
    ),
    cell: ({ row }) => {
      const address = row.original.address

      return <div className="text-left font-medium">{address}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
