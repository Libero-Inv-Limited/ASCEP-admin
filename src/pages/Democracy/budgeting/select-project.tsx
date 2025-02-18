import GoBackButton from "@/components/custom/GoBackButton";
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
        label: "governance",
        link: "/democracy",
      },
      {
        label: `budgeting - project - ${budgetId}`,
        link: `/democracy/budgeting/select-project/${budgetId}`,
      },
    ]);
  }, [activeLink, budgetId]);

  return (
    <div className="page-wrapper">
      <GoBackButton link="/democracy" />
      <h4>Projects</h4>

      <ProjectProposals />
    </div>
  );
}
