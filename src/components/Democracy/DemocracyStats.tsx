import { useGetDemocracyAnalytics } from "@/api/democracy/admin";
import { StatsCard } from "@/components/custom";
import { TickSquare } from "iconsax-react";
import { Skeleton } from "../ui/skeleton";

export default function DemocracyStats() {
  const { data, isLoading } = useGetDemocracyAnalytics();

  console.log(data);

  return (
    <div className="grid grid-cols-4 gap-6 ">
      {isLoading
        ? Array.from({ length: 4 }, (_, i) => (
            <Skeleton className="h-32 bg-slate-200" key={i}></Skeleton>
          ))
        : data && (
            <>
              <StatsCard
                icon={<TickSquare />}
                title="Total Debates"
                count={data.total_debates}
              />
              <StatsCard
                icon={<TickSquare />}
                title="Total initiatives"
                count={data.total_initiatives}
              />
              <StatsCard
                icon={<TickSquare />}
                title="Total Proposals"
                count={data.total_proposals}
              />

              <StatsCard
                icon={<TickSquare />}
                title="Total SDGs"
                count={data.total_sdgs}
              />
              <StatsCard
                icon={<TickSquare />}
                title="Total SDGs"
                count={"18"}
              />
            </>
          )}
    </div>
  );
}
