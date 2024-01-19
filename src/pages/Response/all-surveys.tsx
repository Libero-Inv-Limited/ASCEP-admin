import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";
import { SurveysTable } from "@/components/Response";

export default function AllSurveys() {
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
        label: "All Surveys",
        link: "/response/all-surveys",
      },
    ]);
  }, [activeLink]);
  return (
    <div className="space-y-5 page-wrapper">
      <SurveysTable />
    </div>
  );
}
