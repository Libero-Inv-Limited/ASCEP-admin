import {
  ActiveUserSettingsOption,
  UserSettingsOptions,
} from "@/components/Users";
import { useNavigationContext } from "@/contexts/NavigationContext";
import UserSettingsProvider from "@/providers/UserSettingsProvider";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft2 } from "iconsax-react";

export default function UserDetailsPage() {
  const { setBreadcrumbs, activeLink } = useNavigationContext();

  const { userId } = useParams();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/users");
  };

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
        <Button
          className="text-[14px] capitalize gap-1 bg-[#ebe5f0] w-fit  h-fit hover:bg-[#363636] hover:text-white text-dark px-2 mb-4"
          onClick={handleGoBack}
        >
          <ArrowLeft2 size="20" />
          Go Back
        </Button>
        <div className="relative grid grid-cols-12 gap-6 h-[85vh] pb-10 overflow-y-auto ">
          <UserSettingsOptions />
          <ActiveUserSettingsOption />
        </div>
      </div>
    </UserSettingsProvider>
  );
}
