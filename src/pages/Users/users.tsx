import { MainStatsCard } from "@/components/Main";
import { UsersTable } from "@/components/Users";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { Messages1, Profile2User, User } from "iconsax-react";
import { useEffect } from "react";

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
  return (
    <div className="page-wrapper space-y-7">
      <div className="grid grid-cols-3 gap-6 ">
        <MainStatsCard icon={<User />} title="Total Users" count={"32k"} />
        <MainStatsCard
          icon={<Messages1 />}
          title="Inactive User"
          count={"3.2k"}
        />
        <MainStatsCard
          icon={<Profile2User />}
          title="Active Users"
          count={"1.2k"}
        />
      </div>

      <UsersTable />
    </div>
  );
}
