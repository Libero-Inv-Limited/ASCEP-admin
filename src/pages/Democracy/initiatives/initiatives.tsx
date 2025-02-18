import GoBackButton from "@/components/custom/GoBackButton";
import InitiativesTable from "@/components/Democracy/initiatives/InitiativesTable";
import InitiativeProvider from "@/contexts/InitiativeContext";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";

export default function ViewAllInitiativesPage() {
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
        label: "All Initiatives",
        link: "/democracy/initiatives",
      },
    ]);
  }, [activeLink]);
  return (
    <div className="page-wrapper">
      <GoBackButton link="/democracy" />
      <InitiativeProvider>
        <InitiativesTable />
      </InitiativeProvider>
    </div>
  );
}
