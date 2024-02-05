import { useEffect, useState } from "react";
import { EmptyState, TableSkeleton } from "../custom";
import { DataTable } from "../custom/DataTable";
import { useGetCategoryModerators } from "@/api/category";
import { ColumnDef } from "@tanstack/react-table";
import UserAvatar from "../custom/UserAvatar";
import CategoryModeratorDropdownMenu from "./CategotyModeratorDropdown";

export const columns: ColumnDef<CategoryModeratorType>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "category_id",
    header: "Cateogory ID",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("category_id")}</div>;
    },
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex items-center gap-3 capitalize">
          <UserAvatar user={user} size={40} />

          <p>
            {user.firstname} {user.lastname}
          </p>
        </div>
      );
    },
  },
  //   {
  //     accessorKey: "description",
  //     header: "Description",
  //     cell: ({ row }) => {
  //       return <div className="capitalize">{row.getValue("description")}</div>;
  //     },
  //   },

  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      return <CategoryModeratorDropdownMenu category={row.original} />;
    },
  },
];

export default function CategoryModeratorTable({ id }: { id: string }) {
  const [tableData, setTableData] = useState<CategoryModeratorType[]>([]);

  const { data, isLoading } = useGetCategoryModerators(id);

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
