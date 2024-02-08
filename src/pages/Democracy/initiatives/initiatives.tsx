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
        label: "democracy",
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
      <InitiativeProvider>
        <InitiativesTable />
      </InitiativeProvider>
    </div>
  );
}
