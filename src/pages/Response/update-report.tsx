import UpdateReport from "@/components/Response/UpdateReport";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";
import {useLocation} from "react-router-dom";

export default function UpdateReportPage() {
  const { setBreadcrumbs, activeLink } = useNavigationContext();
  const location = useLocation();

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
        label: "Update Report",
        link: "/response/reports/update-report",
      },
    ]);
  }, [activeLink]);

  return (
    <div className="page-wrapper space-y-7">

      <UpdateReport reportData={location.state.reportData} />
    </div>
  );
}
