import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import { useState } from "react";
import { useGetSurveyTrendOverTime } from "@/api/main";
import { Skeleton } from "../ui/skeleton";
import { getPastDays } from "@/utils/helper";
import { FilterDropdown } from "../custom";

export default function DemocracyBarChart() {
  const [date, setDate] = useState(getPastDays(0));
  const { data, isLoading } = useGetSurveyTrendOverTime(date);
  const [dataKey, setDataKey] = useState("completed_surveys");

  const handleSetDateRange = (date: FilterOption) => {
    setDate(date.value as string);
  };
  return (
    <div className="w-full py-5 space-y-8 bg-white rounded-lg px-7">
      <div className="flex items-center justify-between">
        <h3 className="mr-8 text-lg text-dark">Surveys</h3>

        <div className="flex gap-2 ml-auto -mr-12 scale-75 ">
          <FilterDropdown
            title="Status"
            options={statuses}
            onSelect={(e) => setDataKey(e.value as string)}
          />
          <FilterDropdown
            title="Date range"
            options={dateRange}
            onSelect={handleSetDateRange}
          />
        </div>
      </div>

      {/* <div>{isRefetching && <p className="text-lg">Updating...</p>}</div> */}

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
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={290}>
          <BarChart data={data} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              width={20}
              dataKey={dataKey}
              fill="#032282"
              radius={[5, 5, 5, 5]}
            />
            <YAxis opacity={0.6} tickFormatter={(value) => `${value}`} />

            <XAxis
              interval={1}
              angle={-40}
              className="text-xs"
              dataKey="month"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

const statuses: FilterOption[] = [
  {
    label: "Completed",
    value: "completed_surveys",
  },
  {
    label: "Drafts",
    value: "draft_surveys",
  },
  {
    label: "Ongoing",
    value: "ongoing_surveys",
  },
  {
    label: "Total Responses",
    value: "total_responses",
  },
  {
    label: "Total Surveys",
    value: "total_surveys",
  },
];

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
    value: getPastDays(100),
  },
];
