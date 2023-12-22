import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
} from "recharts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data = [
  {
    name: "Debates",
    total: 3000,
    color: "#032282",
  },
  {
    name: "Initiatives",
    total: 2300,
    color: "#5879FD",
  },
  {
    name: "Proposals",
    total: 4100,
    color: "#007A7F",
  },
  {
    name: "Voting",
    total: 3800,
    color: "#C6D1FF",
  },
  {
    name: "Budgeting",
    total: 3200,
    color: "#5600AB",
  },
  {
    name: "SDG",
    total: 1200,
    color: "#5600AB",
  },
];

export default function DemocracyBarChart() {
  return (
    <div className="w-full py-5 space-y-8 bg-white rounded-lg px-7">
      <div className="flex items-center justify-between">
        <h3 className="mr-8 text-lg text-dark">Response</h3>

        <Select>
          <SelectTrigger className="w-[180px] border border-black/10 focus:ring-0 ">
            <SelectValue placeholder="This Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this month">This Month</SelectItem>
            <SelectItem value="last month">Last Month</SelectItem>
            <SelectItem value="this year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ResponsiveContainer width="100%" height={290}>
        <BarChart data={data} barSize={32}>
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            width={20}
            dataKey="total"
            fill="#032282"
            radius={[5, 5, 5, 5]}
          />
          <XAxis interval={0} className="text-xs" dataKey="name" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
