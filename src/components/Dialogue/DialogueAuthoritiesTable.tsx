/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useGetAllAuthorities } from "@/api/authorities";
import { EmptyState, TableSkeleton } from "@/components/custom";
import { DataTable } from "@/components/custom/DataTable";

import { useNavigationContext } from "@/contexts/NavigationContext";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import DialogueAuthorityDropdownMenu from "./DialogueAuthorityDropdownMenu";
// import { Link } from "react-router-dom";

export const columns: ColumnDef<AuthorityType>[] = [
  {
    accessorKey: "name",
    header: "Title",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("name")}</div>;
    },
  },

  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <div className="capitalize line-clamp-1 max-w-[300px]">
          {row.getValue("description")}
        </div>
      );
    },
  },

  {
    accessorKey: "contact_info",
    header: "Contact Info",
    cell: ({ row }) => {
      return <div className="flex gap-1">{row.getValue("contact_info")}</div>;
    },
  },

  {
    accessorKey: "total_request_cache",
    header: "Total Requests",
    cell: ({ row }) => {
      return (
        <div className="">
          <p>{row.getValue("total_request_cache")}</p>
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const authority = row.original;
      return <DialogueAuthorityDropdownMenu authority={authority} />;
    },
  },
];

export default function DialogueAuthoritiesTable() {
  const { setBreadcrumbs, activeLink } = useNavigationContext();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "main",
        link: "/main",
      },
      {
        label: "dialogue",
        link: "/dialogue",
      },
      {
        label: "authorities",
        link: "/dialogue/authorities",
      },
    ]);
  }, [activeLink]);

  const [tableData, setTableData] = useState<AuthorityType[]>([]);

  const { data, isLoading } = useGetAllAuthorities();

  useEffect(() => {
    if (data) setTableData(data);
  }, [data]);
  return (
    <div className="bg-white  rounded-lg p-4 min-h-[65vh]">
      {isLoading ? (
        <TableSkeleton />
      ) : tableData ? (
        <DataTable columns={columns} data={tableData} />
      ) : (
        <EmptyState height={"60vh"} />
      )}
    </div>
  );
}
