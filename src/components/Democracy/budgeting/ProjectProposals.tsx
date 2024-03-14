import { useGetAllProjectProposals } from "@/api/democracy/budgeting";
import {
  CustomPagination,
  EmptyState,
  TableSkeleton,
} from "@/components/custom";
import { DataTable } from "@/components/custom/DataTable";
import UserAvatar from "@/components/custom/UserAvatar";
import { ColumnDef } from "@tanstack/react-table";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AssignUser from "./AssignUser";
import SelectProposal from "./SelectProposal";

const columns: ColumnDef<ProjectProposalItem>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="max-w-[300px] line-clamp-4">{row.original.title}</div>
    ),
  },
  {
    accessorKey: "user",
    header: "Assigned User",
    cell: ({ row }) => {
      const user = row.original.assignedUser;

      return (
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <UserAvatar user={user} size={40} />
              <p>
                {user.firstname} {user.lastname}
              </p>
            </div>
          ) : (
            <AssignUser id={row.original.id} />
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
    cell: ({ row }) => <div>N{row.original.amount}</div>,
  },

  {
    accessorKey: "total_votes_for_cache",
    header: "Votes For",
  },
  {
    accessorKey: "total_votes_against_cache",
    header: "Votes against",
  },
  {
    accessorKey: "ward",
    header: "Ward",
    cell: ({ row }) => <div>{row.original.ward.ward}</div>,
  },
  {
    accessorKey: "id",
    header: "Select",
    cell: ({ row }) => {
      const proposal = row.original;
      return <SelectProposal proposal={proposal} />;
    },
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
