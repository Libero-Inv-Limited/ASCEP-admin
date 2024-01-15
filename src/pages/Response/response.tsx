import {
  ReportsTable,
  ResponseActions,
  ResponseAnalytics,
  ResponseCategories,
  SurveysTable,
} from "@/components/Response";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";

export default function ResponsePage() {
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
    ]);
  }, [activeLink]);

  return (
    <div className="page-wrapper">
      <div className="mt-8 space-y-5">
        {/* MAIN STATS */}
        <ResponseAnalytics />

        <ResponseActions />
        <ResponseCategories />

        <ReportsTable isSummary />
        <SurveysTable isSummary />
      </div>
    </div>
  );
}
