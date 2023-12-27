/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DataTable } from "@/components/custom/DataTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  //   DropdownMenuContent,
  //   DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

export const columns: ColumnDef<Authorities>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("date")}</div>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("title")}</div>;
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
    accessorKey: "sdgs",
    header: "SDGs",
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          {/* @ts-ignore */}
          {row.getValue("sdgs").map((sdg) => (
            <img src={sdg} key={sdg} className="w-7" />
          ))}
        </div>
      );
    },
  },

  {
    accessorKey: "engagements",
    header: "Engagements",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3 ">
          <img src="/public/images/avatar.png" className="w-8" alt="" />
          <p>{row.getValue("engagements")}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div
          className={` rounded-[10px] text-xs font-semibold text-center w-fit px-2 py-[6px] capitalize ${
            status === "active"
              ? "bg-[#27AE60]/10 text-[#27AE60]"
              : "bg-[#F2994A]/10 text-[#F2994A]"
          } `}
        >
          {row.getValue("status")}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-8 h-8 p-0 bg-transparent hover:bg-gray-200">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          {/* <DropdownMenuContent className="px-2" align="end">
            <DropdownMenuLabel>
              <Link to="/posts/1">
                <div className="table-menu">Download</div>
              </Link>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="table-menu">Edit Survey</div>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="table-menu">Delete Survey</div>
            </DropdownMenuLabel>
          </DropdownMenuContent> */}
        </DropdownMenu>
      );
    },
  },
];

export default function AuthoritiesPage() {
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

  const [tableData, setTableData] = useState<Authorities[]>([]);

  useEffect(() => {
    (async () => {
      const tableData = await getData(authorities);
      setTableData(tableData);
    })();
  }, []);
  return (
    <div className="page-wrapper">
      <div className="p-4 bg-white rounded-lg">
        <DataTable columns={columns} data={tableData} />
      </div>
    </div>
  );
}

const authorities: Authorities[] = [
  {
    id: "728ed52f",
    title: "Risk Management",
    description: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "active",
    engagements: "110,108",
    sdgs: [
      "/images/SDG/image 19.png",
      "/images/SDG/image 20.png",
      "/images/SDG/image 21.png",
      "/images/SDG/image 22.png",
    ],
  },
  {
    id: "123ub8u1",
    title: "Police",

    description: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "inactive",
    engagements: "32,108",
    sdgs: [
      "/images/SDG/image 19.png",
      "/images/SDG/image 21.png",
      "/images/SDG/image 22.png",
    ],
  },
  {
    id: "nw901",
    title: "State Assembly",
    description: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "active",
    engagements: "29,108",
    sdgs: ["/images/SDG/image 21.png", "/images/SDG/image 22.png"],
  },
  {
    id: "12dcu1",
    title: "High court",
    description: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "inactive",
    engagements: "110,108",
    sdgs: [
      "/images/SDG/image 19.png",
      "/images/SDG/image 20.png",
      "/images/SDG/image 21.png",
    ],
  },
  {
    id: "xn180h2",
    title: "FRSC",
    description: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "active",
    engagements: "110,108",
    sdgs: [
      "/images/SDG/image 19.png",
      "/images/SDG/image 20.png",
      "/images/SDG/image 21.png",
      "/images/SDG/image 22.png",
    ],
  },

  {
    id: "728ed52f",
    title: "NDLEA",
    description: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "active",
    engagements: "110,108",
    sdgs: [
      "/images/SDG/image 19.png",
      "/images/SDG/image 20.png",
      "/images/SDG/image 21.png",
      "/images/SDG/image 22.png",
    ],
  },
  {
    id: "123ub8u1",
    title: "Risk Management",
    description: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "active",
    engagements: "110,108",
    sdgs: [
      "/images/SDG/image 19.png",
      "/images/SDG/image 20.png",
      "/images/SDG/image 21.png",
      "/images/SDG/image 22.png",
    ],
  },
];
async function getData(data: Authorities[]): Promise<Authorities[]> {
  return data;
}
