import {
  ActiveUserSettingsOption,
  UserSettingsOptions,
} from "@/components/Users";
import { useNavigationContext } from "@/contexts/NavigationContext";
import UserSettingsProvider from "@/providers/UserSettingsProvider";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UserDetailsPage() {
  const { setBreadcrumbs, activeLink } = useNavigationContext();

  const { userId } = useParams();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "main",
        link: "/main",
      },
      {
        label: "users",
        link: "/users",
      },
      {
        label: "view user",
        link: `/users/${userId}`,
      },
    ]);
  }, [activeLink]);

  return (
    <UserSettingsProvider>
      <div className=" page-wrapper" style={{ paddingBottom: 0 }}>
        <div className="relative grid grid-cols-12 gap-6 h-[85vh] pb-10 overflow-y-auto ">
          <UserSettingsOptions />
          <ActiveUserSettingsOption />
        </div>
      </div>
    </UserSettingsProvider>
  );
}
