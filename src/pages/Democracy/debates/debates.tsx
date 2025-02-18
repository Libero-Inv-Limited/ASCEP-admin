import GoBackButton from "@/components/custom/GoBackButton";
import DebatesTable from "@/components/Democracy/debates/DebatesTable";
import DebateProvider from "@/contexts/DebateContext";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";

export default function ViewAllDebatesPage() {
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
      {
        label: "All Debates",
        link: "/democracy/debates",
      },
    ]);
  }, [activeLink]);
  return (
    <div className="page-wrapper">
      <GoBackButton link="/democracy" />
      <DebateProvider>
        <DebatesTable />
      </DebateProvider>
    </div>
  );
}
