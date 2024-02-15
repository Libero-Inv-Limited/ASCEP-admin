import ProposalsTable from "@/components/Democracy/proposals/ProposalsTable";
import { useNavigationContext } from "@/contexts/NavigationContext";
import ProposalProvider from "@/contexts/ProposalContext";
import { useEffect } from "react";

export default function ViewAllProposalsPage() {
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
        label: "All Proposals",
        link: "/democracy/proposals",
      },
    ]);
  }, [activeLink]);
  return (
    <div className="page-wrapper">
      <ProposalProvider>
        <ProposalsTable />
      </ProposalProvider>
    </div>
  );
}
