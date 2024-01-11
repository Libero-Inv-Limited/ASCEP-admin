import { useGetUsersAnalytics } from "@/api/user";
import { UsersTable } from "@/components/Users";
import { StatsCard } from "@/components/custom";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { Messages1, Profile2User, User } from "iconsax-react";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const { setBreadcrumbs } = useNavigationContext();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "main",
        link: "/main",
      },
      {
        label: "users",
        link: "/users",
      },
    ]);
  }, []);

  const [usersData, setUsersData] = useState<UsersData | null>(null);
  const { data, isLoading, isSuccess } = useGetUsersAnalytics(1);

  useEffect(() => {
    if (isSuccess) setUsersData(data);
  }, [data, isSuccess]);

  return (
    <div className="page-wrapper space-y-7">
      <div className="grid grid-cols-3 gap-6 ">
        {isLoading && !usersData ? (
          <>
            <Skeleton className="h-28 rounded-xl bg-slate-200" />
            <Skeleton className="h-28 rounded-xl bg-slate-200" />
            <Skeleton className="h-28 rounded-xl bg-slate-200" />
          </>
        ) : (
          usersData && (
            <>
              <StatsCard
                icon={<User />}
                title="Total Users"
                count={usersData?.analytics.total_users}
              />
              <StatsCard
                icon={<Messages1 />}
                title="Inactive User"
                count={usersData?.analytics.inactive_users}
              />
              <StatsCard
                icon={<Profile2User />}
                title="Active Users"
                count={usersData?.analytics.active_users}
              />
            </>
          )
        )}
      </div>

      <UsersTable />
    </div>
  );
}
