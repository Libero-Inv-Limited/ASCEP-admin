import GoBackButton from "@/components/custom/GoBackButton";
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
        label: "governance",
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
      <GoBackButton link="/democracy" />
      <ProposalProvider>
        <ProposalsTable />
      </ProposalProvider>
    </div>
  );
}
