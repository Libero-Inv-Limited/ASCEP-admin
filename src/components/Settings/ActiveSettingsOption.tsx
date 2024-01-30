import { useSettingsContext } from "@/providers/SettingsProvider";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import TwoFactorAuth from "./TwoFactorAuth";
import TwoFactorAuthOTP from "./TwoFactorAuthOTP";
import Activities from "./Activities";
import { useGetUserProfile } from "@/api/auth";
import RolesSteps from "./Roles/RolesSteps";
import { Button } from "../ui/button";
import UserProfile from "./UserProfile";
import ApiIntegrationSteps from "./ApiIntegrations/ApiIntegrationSteps";
import SystemConfigurations from "./SystemConfigurations";

export default function ActiveSettingsOption() {
  const { activeOption, actionButton } = useSettingsContext();
  const { data } = useGetUserProfile();

  return (
    <div className="col-span-7 bg-white p-6 rounded-[40px] h-fit">
      <div className="pb-4 border-b border-[#F0F0F0] flex items-center justify-between  mb-4">
        <p className="text-[24px] font-bold text-dark">{activeOption}</p>

        {actionButton && (
          <Button
            size="sm"
            className="px-6 rounded-full"
            onClick={actionButton.function}
          >
            {actionButton.text}
          </Button>
        )}
      </div>
      {activeOption === "User Profile" && <UserProfile />}
      {activeOption === "Change Password" && <ChangePassword />}
      {activeOption === "Edit Profile" && data && (
        <EditProfile defaultValues={data} />
      )}
      {activeOption === "Enable 2FA" && <TwoFactorAuth />}
      {activeOption === "Verify 2FA OTP" && <TwoFactorAuthOTP />}
      {activeOption === "Activities" && <Activities />}
      {activeOption === "Roles & Permissions" && <RolesSteps />}
      {activeOption === "API Integration" && <ApiIntegrationSteps />}
      {activeOption === "System Configurations" && <SystemConfigurations />}
    </div>
  );
}
