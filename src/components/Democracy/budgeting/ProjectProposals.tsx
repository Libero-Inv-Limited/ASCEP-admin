import { useGetAllProjectProposals } from "@/api/democracy/budgeting";
import {
  CustomPagination,
  EmptyState,
  TableSkeleton,
} from "@/components/custom";
import { DataTable } from "@/components/custom/DataTable";
import UserAvatar from "@/components/custom/UserAvatar";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const columns: ColumnDef<ProjectProposalItem>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "fiscal_year",
    header: "Fiscal Year",
  },
  {
    accessorKey: "user",
    header: "Assigned User",
    cell: ({ row }) => {
      const user = row.original.user;

      return (
        <div>
          {user ? (
            <UserAvatar user={user} size={40} />
          ) : (
            <Button size="sm" variant="outline-primary">
              Assign User
            </Button>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "feasibility_status",
    header: "Feasibility",
  },
  {
    accessorKey: "valuation_status",
    header: "Valuation status",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "ward",
    header: "Ward",
  },
];

export default function ProjectProposals() {
  const { budgetId } = useParams();
  const [tableData, setTableData] = useState<ProjectProposalItem[]>([]);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllProjectProposals(
    budgetId as string,
    page
  );

  useEffect(() => {
    if (data) {
      setTableData(data.proposals);
    }
  }, [data]);

  console.log(data);

  return (
    <div className="space-y-4">
      <div className="bg-white  rounded-lg p-4 min-h-[65vh]">
        {isLoading ? (
          <TableSkeleton />
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
