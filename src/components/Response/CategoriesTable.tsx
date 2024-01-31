import { useEffect, useState } from "react";
import { EmptyState, TableSkeleton } from "../custom";
import { DataTable } from "../custom/DataTable";
import { useGetAllCategories } from "@/api/category";
import { ColumnDef } from "@tanstack/react-table";
import CategoryDropdownMenu from "./CategoryDropdownMenu";

export const columns: ColumnDef<CollectionData>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Title",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("type")}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("description")}</div>;
    },
  },

  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      return <CategoryDropdownMenu category={row.original} />;
    },
  },
];

export default function CategoriesTable() {
  const [tableData, setTableData] = useState<CollectionData[]>([]);

  const { data, isLoading } = useGetAllCategories();

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
