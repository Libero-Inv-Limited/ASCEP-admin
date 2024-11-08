import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "../ui/skeleton";
import { useGetReportTrendOverTime } from "@/api/main";
import { useEffect, useState } from "react";
import { getPastDays } from "@/utils/helper";
import { FilterDropdown } from "../custom";
import { Link } from "react-router-dom";

const dateRange: FilterOption[] = [
  {
    label: "Today",
    value: getPastDays(0),
  },
  {
    label: "Past One Week",
    value: getPastDays(7),
  },
  {
    label: "Past One Month",
    value: getPastDays(31),
  },
  {
    label: "Past One Year",
    value: getPastDays(366),
  },
];

export default function ResponseChart() {
  const [date, setDate] = useState(getPastDays(0));
  const { data, isLoading, isRefetching } = useGetReportTrendOverTime(date);
  const [categories, setCategories] = useState<ChartCategory[]>([]);

  useEffect(() => {
    if (data) {
      const categories = [
        {
          title: "Total Reports",
          total: data.reduce((acc, cur) => acc + cur.total_reports, 0),
          color: "#FFC334",
        },
        {
          title: "Approved Reports",
          total: data.reduce((acc, cur) => acc + cur.approved_reports, 0),
          color: "#111211",
        },
        {
          title: "Rejected Reports",
          total: data.reduce((acc, cur) => acc + cur.rejected_reports, 0),
          color: "#ED4A4A",
        },
        {
          title: "Comments",
          total: data.reduce((acc, cur) => acc + cur.total_comments, 0),
          color: "#032282",
        },
      ];
      setCategories(categories);
    }
  }, [data]);

  const handleSetDateRange = (date: FilterOption) => {
    setDate(date.value as string);
  };

  return (
    <div className="bg-white w-full py-5 px-7 space-y-8 rounded-[30px]">
      <div className="flex items-center gap-6">
        <Link to='/response/reports' className="mr-8 text-lg text-dark">Response</Link>

        {categories.map((category) => (
          <div key={category.title} className="flex items-center gap-4 ">
            <div
              className={`rounded-full w-[6px] h-[6px] `}
              style={{ backgroundColor: category.color }}
            />
            <div className="text-xs font-medium text-subtitle">
              {category.title}
            </div>
            <div className="text-sm font-semibold text-dark">
              {category.total}
            </div>
          </div>
        ))}

        <div className="ml-auto">
          <FilterDropdown
            title="Date range"
            options={dateRange}
            onSelect={handleSetDateRange}
          />
        </div>
      </div>

      <div>{isRefetching && <p className="text-lg">Updating...</p>}</div>
      <ResponsiveContainer width="100%" height={400}>
        {isLoading ? (
          <div className="flex items-end h-full gap-3">
            <Skeleton className="w-10 bg-slate-200 h-2/3" />
            <Skeleton className="w-10 bg-slate-200 h-1/4" />
            <Skeleton className="w-10 bg-slate-200 h-2/5" />
            <Skeleton className="w-10 h-full bg-slate-200" />
            <Skeleton className="w-10 bg-slate-200 h-2/3" />
            <Skeleton className="w-10 bg-slate-200 h-1/4" />
            <Skeleton className="w-10 bg-slate-200 h-2/3" />
            <Skeleton className="w-10 bg-slate-200 h-1/4" />
            <Skeleton className="w-10 bg-slate-200 h-2/5" />
            <Skeleton className="w-10 h-full bg-slate-200" />
            <Skeleton className="w-10 bg-slate-200 h-2/3" />
            <Skeleton className="w-10 bg-slate-200 h-1/4" />
            <Skeleton className="w-10 bg-slate-200 h-2/3" />
            <Skeleton className="w-10 bg-slate-200 h-1/4" />
            <Skeleton className="w-10 bg-slate-200 h-2/5" />
            <Skeleton className="w-10 h-full bg-slate-200" />
            <Skeleton className="w-10 bg-slate-200 h-2/3" />
            <Skeleton className="w-10 bg-slate-200 h-1/4" />
            <Skeleton className="w-10 bg-slate-200 h-2/3" />
            <Skeleton className="w-10 bg-slate-200 h-1/4" />
            <Skeleton className="w-10 bg-slate-200 h-2/5" />
            <Skeleton className="w-10 h-full bg-slate-200" />
            <Skeleton className="w-10 bg-slate-200 h-2/3" />
            <Skeleton className="w-10 bg-slate-200 h-1/4" />
          </div>
        ) : (
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis opacity={0.6} className="mr-10" dataKey="month" />
            <YAxis opacity={0.6} tickFormatter={(value) => `${value}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="approved_reports"
              stroke="#18A201"
              strokeWidth={3.5}
              strokeOpacity={0.4}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="total_reports"
              stroke="#FFC334"
              strokeWidth={3.5}
              strokeOpacity={0.4}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="rejected_reports"
              stroke="#ED4A4A"
              strokeWidth={3.5}
              strokeOpacity={0.4}
            />
            <Line
              type="monotone"
              dataKey="total_comments"
              stroke="#354D99"
              strokeWidth={3.5}
              strokeOpacity={0.4}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload) {
    // Customize the tooltip content here
    return (
      <div className="bg-white rounded-[32px] py-6 ">
        <p className="pbf-2 text-[#034483] px-5 font-bold">
          {payload[0].payload.name}
        </p>
        <div className="space-y-2">
          {payload.map((payloadItem: any, i: number) => (
            <div
              key={i}
              className="flex items-center text-[#032282]  gap-2 bg-[#F6F8FFE5] px-[18px]"
            >
              <div
                className={`rounded-full w-[6px] h-[6px]  `}
                style={{ backgroundColor: payloadItem.stroke }}
              />
              <p className="capitalize ">
                {`${payloadItem.name} :`}{" "}
                <span className="font-bold">
                  {payloadItem.value.toLocaleString()}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

// const categories = [
//   {
//     title: "Approved Reports",
//     total: "112,190,000",
//     color: "#18A201",
//   },
//   {
//     title: "Invalid Reports",
//     total: "112,190,000",
//     color: "#ED4A4A",
//   },
//   {
//     title: "Comments (/10k)",
//     total: "112,190,000",
//     color: "#354D99",
//   },
// ];
