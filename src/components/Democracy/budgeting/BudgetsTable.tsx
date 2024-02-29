/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/custom/DataTable";
import { CustomPagination, EmptyState, TableSkeleton } from "../../custom";
import { useGetAllBudgets } from "@/api/democracy/budgeting";
import UpdateBudgetStatus from "./UpdateBudgetStatus";
// import DeleteSDG from "./DeleteSDG";
// import AddSDGTarget from "./AddSDGTarget";

const columns: ColumnDef<BudgetItem>[] = [
  //   {
  //     accessorKey: "title",
  //     header: "Title",
  //     cell: ({ row }) => {
  //       return <div className="capitalize">{row.original.title}</div>;
  //     },
  //   },
  {
    accessorKey: "fiscal_year",
    header: "Fiscal Year",
    // cell: ({ row }) => {
    //   return <div className="capitalize">{row.original.fiscal_year}</div>;
    // },
  },
  {
    accessorKey: "start_date",
    header: "Start date",
    cell: ({ row }) => {
      return <div>{new Date(row.original.start_date).toDateString()}</div>;
    },
  },
  {
    accessorKey: "end_date",
    header: "End date",
    cell: ({ row }) => {
      return <div>{new Date(row.original.end_date).toDateString()}</div>;
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div
          className={`capitalize text-center rounded-xl px-1 py-[2px] ${
            status === "approved"
              ? "bg-success/20 text-success"
              : status === "rejected"
              ? "bg-red-500/20 text-red-500"
              : "bg-amber-500/20 text-amber-500"
          }`}
        >
          {row.original.status}
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-8 h-8 p-0 bg-transparent hover:bg-gray-200">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="px-2" align="end">
            <DropdownMenuLabel>
              <UpdateBudgetStatus budget={row.original} />
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              {/* <DeleteSDG id={row.original.id} /> */}
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function BudgetsTable({ isSummary }: { isSummary?: boolean }) {
  const [tableData, setTableData] = useState<BudgetItem[]>([]);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllBudgets(page);

  useEffect(() => {
    if (data) {
      if (isSummary) {
        setTableData(data.budgets.slice(0, 3));
      } else setTableData(data.budgets);
    }
  }, [data]);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-3 ml-auto">
        {isSummary && (
          <Link to="/democracy/budgeting" className="text-end">
            <p className="underline text-dark text-nowrap">See all</p>
          </Link>
        )}
      </div>
      <div className="w-full p-4 bg-white rounded-lg ">
        {isLoading ? (
          <TableSkeleton count={20} />
        ) : tableData ? (
          <DataTable columns={columns} data={tableData} />
        ) : (
          <EmptyState height={"60vh"} />
        )}
      </div>

      {data && (
        <CustomPagination
          page={page}
          setPage={setPage}
          paginationData={data?.meta}
        />
      )}
    </div>
  );
}
