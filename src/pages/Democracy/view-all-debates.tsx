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
        label: "democracy",
        link: "/democracy",
      },
      {
        label: "view all",
        link: "/democracy/debates",
      },
    ]);
  }, [activeLink]);
  return (
    <div className="page-wrapper">
      <DebateProvider>
        <DebatesTable />
      </DebateProvider>
    </div>
  );
}
