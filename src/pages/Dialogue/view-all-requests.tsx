import GoBackButton from "@/components/custom/GoBackButton";
import { DialogueRequests } from "@/components/Dialogue";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";

export default function ViewAllRequestsPage() {
  const { setBreadcrumbs, activeLink } = useNavigationContext();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "main",
        link: "/main",
      },
      {
        label: "dialogue",
        link: "/dialogue",
      },
      {
        label: "Requests",
        link: "/dialogue/requests",
      },
    ]);
  }, [activeLink]);
  return (
    <div className="page-wrapper">
      <GoBackButton link="/dialogue" />

      <DialogueRequests />
    </div>
  );
}
