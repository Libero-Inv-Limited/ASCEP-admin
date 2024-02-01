import { useEffect, useState } from "react";
import { EmptyState, TableSkeleton } from "../custom";
import { DataTable } from "../custom/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import DialogueAuthorityModeratorDropdownMenu from "./DialogueAuthorityModeratorDropdownMenu";

interface DialogeAuthorityModeratorTableProps {
  data: CategoryModeratorType[] | undefined;
  authorityId: string | undefined;
  isLoading?: boolean;
}

export default function DialogeAuthorityModeratorTable({
  data,
  isLoading,
  authorityId,
}: DialogeAuthorityModeratorTableProps) {
  const columns: ColumnDef<CategoryModeratorType>[] = [
    // {
    //   accessorKey: "id",
    //   header: "ID",
    //   cell: ({ row }) => {
    //     return <div className="capitalize">{row.getValue("id")}</div>;
    //   },
    // },
    {
      accessorKey: "user",
      header: "First Name",
      cell: ({ row }) => {
        const user = row.original.user;

        return <div className="capitalize">{user.firstname}</div>;
      },
    },
    {
      accessorKey: "user",
      header: "Last Name",
      cell: ({ row }) => {
        const user = row.original.user;

        return <div className="capitalize">{user.lastname}</div>;
      },
    },
    {
      accessorKey: "user",
      header: "Username",
      cell: ({ row }) => {
        const user = row.original.user;

        return <div className="capitalize">{user.username}</div>;
      },
    },

    {
      accessorKey: "id",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <DialogueAuthorityModeratorDropdownMenu
            authrority={row.original}
            authorityId={authorityId}
          />
        );
      },
    },
  ];
  const [tableData, setTableData] = useState<CategoryModeratorType[]>([]);

  useEffect(() => {
    if (data) {
      setTableData(data);
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
    </div>
  );
}
