import { useGetResponseAnalytics } from "@/api/response";
import { StatsCard } from "../custom";
import { Messages1, Profile2User, TickSquare, User } from "iconsax-react";
import { Skeleton } from "../ui/skeleton";

export default function ResponseAnalytics() {
  const { data, isLoading } = useGetResponseAnalytics();
  return (
    <div className="grid grid-cols-4 gap-6 ">
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 bg-slate-200 rounded-xl" />
          ))
        : data && (
            <>
              <StatsCard
                icon={<User />}
                title="Total Reports"
                count={data.total_reports}
              />
              <StatsCard
                icon={<Messages1 />}
                title="Total Survey"
                count={data.total_surveys}
              />
              <StatsCard
                title="Total Surveys"
                icon={<Profile2User />}
                count={data.total_surveys}
              />
              <StatsCard
                title="Reports Engagements"
                icon={<TickSquare />}
                count={data.engagements}
              />
            </>
          )}
    </div>
  );
}
