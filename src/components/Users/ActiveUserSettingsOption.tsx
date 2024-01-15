import { useUserSettingsContext } from "@/providers/UserSettingsProvider";
import DeviceLog from "./DeviceLog";
import Permissions from "./Permissions";
import UserActivities from "./UserActivities";
import UserSettingsDropdownMenu from "./UserSettingsDropdownMenu";
import UserProfile from "./UserProfile";
import { Skeleton } from "../ui/skeleton";

export default function ActiveSettingsOption() {
  const { activeOption, fetchingUserObj, userObj } = useUserSettingsContext();

  return (
    <div className="col-span-8 bg-white p-6 rounded-[24px] h-fit">
      <div className="flex  border-b border-[#F0F0F0] pb-8 items-center gap-3 cursor-pointer">
        <img src="/images/profile-pic.png" className="w-10 h-10" alt="" />
        {fetchingUserObj ? (
          <div className="grid w-1/3 grid-cols-2 gap-2">
            <Skeleton className="h-2 rounded-md bg-slate-200" />
            <Skeleton className="h-2 rounded-md bg-slate-200" />
            <Skeleton className="h-2 col-span-2 rounded-md bg-slate-200" />
          </div>
        ) : userObj ? (
          <div>
            <p className="text-sm font-bold">
              {userObj?.firstname
                ? `${userObj.firstname} ${userObj.lastname}`
                : ""}
            </p>
            <p className="text-sm text-subtle_text">{userObj.email}</p>
          </div>
        ) : (
          <></>
        )}

        <UserSettingsDropdownMenu />
      </div>
      {activeOption === "User Profile" && <UserProfile />}
      {activeOption === "Permissions" && <Permissions />}
      {activeOption === "Device Log" && <DeviceLog />}
      {activeOption === "User’s Activity" && <UserActivities />}
    </div>
  );
}
