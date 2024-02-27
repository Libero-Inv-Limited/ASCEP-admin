/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/custom/DataTable";
import { TableSkeleton } from "../../custom";
import { useGetAllSDGs } from "@/api/sdg";
import DeleteSDG from "./DeleteSDG";
import AddSDGTarget from "./AddSDGTarget";

const columns: ColumnDef<SDGData>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return <div className="capitalize">{row.original.title}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <div className="capitalize">{row.original.description}</div>;
    },
  },
  {
    accessorKey: "banner",
    header: "Banner",
    cell: ({ row }) => {
      return (
        <img
          src={row.original.banner}
          className="w-12 h-12 capitalize rounded-lg"
        />
      );
    },
  },

  {
    accessorKey: "official_link",
    header: "Official Link",
    cell: ({ row }) => {
      return (
        <a
          target="_blank"
          href={row.original.official_link}
          className="underline text-nowrap "
        >
          View Official Link
        </a>
      );
    },
  },

  {
    accessorKey: "sdgTarget",
    header: "Targets",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1 capitalize ">
          {row.original.sdgTarget.map((target) => (
            <div className="p-1 text-xs text-white bg-black rounded-md text-nowrap">
              Target {target.code}
            </div>
          ))}
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
              <AddSDGTarget id={row.original.id} />
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <DeleteSDG id={row.original.id} />
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function SDGTable({ isSummary }: { isSummary?: boolean }) {
  const [tableData, setTableData] = useState<SDGData[]>([]);
  const { data, isLoading } = useGetAllSDGs();

  console.log(data);

  useEffect(() => {
    if (data) {
      if (isSummary) {
        setTableData(data.slice(0, 3));
      } else setTableData(data);
    }
  }, [data]);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-3 ml-auto">
        {isSummary && (
          <Link to="/democracy/sdgs" className="text-end">
            <p className="underline text-dark text-nowrap">See all</p>
          </Link>
        )}
      </div>
      <div className="w-full p-4 bg-white rounded-lg ">
        {isLoading ? (
          <TableSkeleton count={20} />
        ) : (
          <DataTable columns={columns} data={tableData} />
        )}
      </div>
    </div>
  );
}
