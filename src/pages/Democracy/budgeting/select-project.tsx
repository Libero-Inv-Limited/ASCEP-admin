import { useGetAllProjectProposals } from "@/api/democracy/budgeting";
import ProjectProposals from "@/components/Democracy/budgeting/ProjectProposals";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SelectProjectPage() {
  const { budgetId } = useParams();
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
        label: `Debate - ${budgetId}`,
        link: `/democracy/budgeting/${budgetId}`,
      },
    ]);
  }, [activeLink, budgetId]);

  //   if (isLoading) return <PageLoader />;
  return (
    <div className="page-wrapper">
      <h4>Projects</h4>

      <ProjectProposals />
    </div>
  );
}
