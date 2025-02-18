import { useGetUsersAnalytics } from "@/api/user";
import { UsersTable } from "@/components/Users";
import { StatsCard } from "@/components/custom";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { Messages1, Profile2User, User, ArrowLeft2 } from "iconsax-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/main");
  };

  useEffect(() => {
    if (isSuccess) setUsersData(data);
  }, [data, isSuccess]);

  return (
    <div className="page-wrapper space-y-7">
      <Button
        className="text-[14px] capitalize gap-1 bg-[#ebe5f0] w-fit  h-fit hover:bg-[#363636] hover:text-white text-dark px-2"
        onClick={handleGoBack}
      >
        <ArrowLeft2 size="20" />
        Go Back
      </Button>

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
