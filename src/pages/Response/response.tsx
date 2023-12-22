import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";

export default function ResponsePage() {
  const { setBreadcrumbs, activeLink } = useNavigationContext();

  console.log(activeLink);

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
  return <div>ResponsePage</div>;
}
