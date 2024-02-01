import {
  DialogueActions,
  DialogueAnalytics,
  DialogueAuthorities,
  DialogueRequests,
} from "@/components/Dialogue";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";

export default function DialoguePage() {
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
    ]);
  }, [activeLink]);
  return (
    <div className="space-y-8 page-wrapper">
      <DialogueAnalytics />
      <DialogueActions />
      <DialogueAuthorities />
      <DialogueRequests isSummary />
    </div>
  );
}
