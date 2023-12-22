import { MainStatsCard } from "@/components/Main";
import { ResponseActions } from "@/components/Response";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { Messages1, Profile2User, TickSquare } from "iconsax-react";
import { User } from "lucide-react";
import { useEffect } from "react";

export default function ResponsePage() {
  const { setBreadcrumbs, activeLink } = useNavigationContext();

  console.log(activeLink);

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "main",
        link: "/main",
      },
      {
        label: "response",
        link: "/response",
      },
    ]);
  }, [activeLink]);
  return (
    <div className="page-wrapper">
      <div className="mt-8 space-y-5">
        {/* MAIN STATS */}
        <div className="grid grid-cols-4 gap-6 ">
          <MainStatsCard icon={<User />} title="Total Reports" count={"32k"} />
          <MainStatsCard
            icon={<Messages1 />}
            title="Total Survey"
            count={"3.2k"}
          />
          <MainStatsCard
            title="Total Democracy"
            icon={<Profile2User />}
            count={"1.2k"}
          />
          <MainStatsCard
            title="Reports Engagements"
            icon={<TickSquare />}
            count={"1.274m"}
          />
        </div>

        <ResponseActions />
      </div>
    </div>
  );
}
