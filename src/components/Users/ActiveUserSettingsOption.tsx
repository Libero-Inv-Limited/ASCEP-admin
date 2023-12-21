import { useUserSettingsContext } from "@/providers/UserSettingsProvider";
import DeviceLog from "./DeviceLog";
import Permissions from "./Permissions";
import UserActivities from "./UserActivities";
import UserSettingsDropdownMenu from "./UserSettingsDropdownMenu";
import AdminsProfile from "./AdminsProfile";

export default function ActiveSettingsOption() {
  const { activeOption } = useUserSettingsContext();

  console.log(activeOption);

  return (
    <div className="col-span-8 bg-white p-6 rounded-[40px] h-fit">
      {/* <p className="pb-4 border-b border-[#F0F0F0] text-[24px] font-bold text-dark mb-4">
        {activeOption}
      </p> */}

      <div className="flex  border-b border-[#F0F0F0] pb-8 items-center gap-3 cursor-pointer">
        <img src="/images/profile-pic.png" className="w-10 h-10" alt="" />
        <div>
          <p className="text-sm font-bold">Dexter Olaniyi</p>
          <p className="text-sm text-subtle_text">Dexterola@gmail.com</p>
        </div>

        <UserSettingsDropdownMenu />
      </div>
      {activeOption === "User Profile" && <AdminsProfile />}
      {activeOption === "Permissions" && <Permissions />}
      {activeOption === "Device Log" && <DeviceLog />}
      {activeOption === "User’s Activity" && <UserActivities />}
    </div>
  );
}
