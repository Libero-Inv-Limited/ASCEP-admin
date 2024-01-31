import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";
import { ReportsTable } from "@/components/Response";

export default function AllReports() {
  const { setBreadcrumbs, activeLink } = useNavigationContext();

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
      {
        label: "All Reports",
        link: "/response/reports",
      },
    ]);
  }, [activeLink]);
  return (
    <div className="space-y-5 page-wrapper">
      <ReportsTable />
    </div>
  );
}
