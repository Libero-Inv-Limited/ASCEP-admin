import { useGetResponseAnalytics } from "@/api/response";
import { StatsCard } from "../custom";
import { Messages1, Profile2User, TickSquare, User } from "iconsax-react";
import { Skeleton } from "../ui/skeleton";
import { useAppContext } from "@/contexts/AppContext";

export default function ResponseAnalytics() {
  const { data, isLoading } = useGetResponseAnalytics();
  const { categories, fetchingCategories } = useAppContext();

  return (
    <div className="grid grid-cols-4 gap-6">
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
                title="Total Surveys"
                icon={<Profile2User />}
                count={data.total_surveys}
              />
              <StatsCard
                title="Categories"
                icon={<TickSquare />}
                count={categories.length}
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
