import { useEffect, useState } from "react";
import { EmptyState, TableSkeleton } from "../custom";
import { DataTable } from "../custom/DataTable";
import { useGetAllCategories } from "@/api/category";
import { ColumnDef } from "@tanstack/react-table";

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

  //   {
  //     accessorKey: "id",
  //     header: "Actions",
  //     cell: ({ row }) => {
  //       return (
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button className="w-8 h-8 p-0 bg-transparent hover:bg-gray-200">
  //               <span className="sr-only">Open menu</span>
  //               <MoreHorizontal className="w-4 h-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent className="px-2" align="end">
  //             <DropdownMenuLabel>
  //               <Link to={`/users/${row.getValue("id")}`}>
  //                 <div className="table-menu">View User</div>
  //               </Link>
  //             </DropdownMenuLabel>
  //             {/* <DropdownMenuLabel>
  //               <div className="table-menu">Assign role / privilege</div>
  //             </DropdownMenuLabel>
  //             <DropdownMenuLabel>
  //               <div className="table-menu">Reset Password </div>
  //             </DropdownMenuLabel>
  //             <DropdownMenuLabel>
  //               <div className="table-menu">Reset 2FA</div>
  //             </DropdownMenuLabel> */}
  //             <DropdownMenuLabel>
  //               <DeactivateAccount
  //                 status={row.original.status}
  //                 id={row.getValue("id")}
  //               />
  //             </DropdownMenuLabel>
  //             <DropdownMenuLabel>
  //               <DeleteAccount id={row.getValue("id")} />
  //             </DropdownMenuLabel>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       );
  //     },
  //   },
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
