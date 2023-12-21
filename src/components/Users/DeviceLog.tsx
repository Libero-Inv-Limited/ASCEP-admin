import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { PiDesktop, PiDeviceMobileCamera } from "react-icons/pi";
import { DataTable } from "../custom/DataTable";

export type Log = {
  id: string;
  device: string;
  deviceType: "Mobile" | "PC";
  date: string;
  time: string;
  action: string;
  location: string;
};

export const columns: ColumnDef<Log>[] = [
  {
    accessorKey: "device",
    header: "Device",
    cell: ({ row }) => {
      return (
        <div className="flex items-start gap-1 text-sm">
          <div className="mt-1 text-subtle_text">
            {row.original.deviceType === "Mobile" ? (
              <PiDeviceMobileCamera />
            ) : (
              <PiDesktop />
            )}
          </div>
          <div className="font-light">
            <p className="uppercase text-[#414141] p-0 m-0 ">
              {row.original.deviceType}
            </p>
            <p className="text-[#8F8F8F] ">{row.original.device}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => {
      return (
        <div className="font-light">
          <p className="uppercase text-[#414141] p-0 m-0 ">
            {row.original.date}
          </p>
          <p className="text-[#8F8F8F] ">{row.original.time}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "time",
    header: "Last Online",
    cell: ({ row }) => {
      return (
        <div className="font-light">
          <p className="uppercase text-[#414141] p-0 m-0 ">
            {row.original.date}
          </p>{" "}
          <p className="text-[#8F8F8F] ">{row.original.time}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      return <p className="text-dark">{row.getValue("location")}</p>;
    },
  },
];

export default function DeviceLog() {
  const [tableData, setTableData] = useState<Log[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getData();
      setTableData(data);
    })();
  }, []);

  return (
    <div>
      <div className="py-4 border-b border-t border-[#F0F0F0] text-dark">
        Device Log
      </div>
      <DataTable columns={columns} data={tableData} />
    </div>
  );
}

async function getData(): Promise<Log[]> {
  return [
    {
      id: "728ed52f",
      deviceType: "Mobile",
      device: "iPhone 13 Pro",
      date: "Jan 1st, 2022",
      time: "12:55 AM",
      action: "User login",
      location: "Lagos, NG",
    },
    {
      id: "123ub8u1",
      deviceType: "PC",
      device: "Apple Mac",
      date: "Jan 1st, 2022",
      time: "12:55 AM",
      action: "User logout",
      location: "Lagos, NG",
    },
    {
      id: "nw901",
      deviceType: "Mobile",
      device: "iPhone 13 Pro",
      date: "Jan 1st, 2022",
      time: "12:55 AM",
      action: "User login",
      location: "Lagos, NG",
    },
  ];
}
