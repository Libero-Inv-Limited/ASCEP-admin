import AdminsProfile from "./UserProfile";
import DeviceLog from "./DeviceLog";
import Permissions from "./Permissions";
import UserActivities from "./UserActivities";
import UserSettingsDropdownMenu from "./UserSettingsDropdownMenu";

export default function UserProfileSettings() {
  return (
    <div>
      <div className="flex  border-b border-[#F0F0F0] pb-8 items-center gap-3 cursor-pointer">
        <img src="/images/profile-pic.png" className="w-10 h-10" alt="" />
        <div>
          <p className="text-sm font-bold">Dexter Olaniyi</p>
          <p className="text-sm text-subtle_text">Dexterola@gmail.com</p>
        </div>

        <UserSettingsDropdownMenu />
      </div>

      <div className="space-y-8">
        <AdminsProfile />
        <Permissions />
        <DeviceLog />
        <UserActivities />
      </div>
    </div>
  );
}
