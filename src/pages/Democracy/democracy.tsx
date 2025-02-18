import GoBackButton from "@/components/custom/GoBackButton";
import {
  DemocracyActions,
  DemocracyDebateCategories,
  DemocracySDG,
  DemocracyStats,
} from "@/components/Democracy";
import DemocracyTableSection from "@/components/Democracy/DemocracyTableSection";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";

export default function DemocracyPage() {
  const { setBreadcrumbs, activeLink } = useNavigationContext();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "main",
        link: "/main",
      },
      {
        label: "governance",
        link: "/democracy",
      },
    ]);
  }, [activeLink]);
  return (
    <div className="space-y-8 page-wrapper ">
      <GoBackButton link="/main" />

      <DemocracyStats />
      {/* <DemocracyActions /> */}
      <DemocracySDG />
      {/* <DemocracyDebateCategories /> */}
      <DemocracyTableSection />
    </div>
  );
}
