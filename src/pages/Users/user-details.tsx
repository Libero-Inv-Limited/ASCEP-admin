import {
  ActiveUserSettingsOption,
  UserSettingsOptions,
} from "@/components/Users";
import UserSettingsProvider from "@/providers/UserSettingsProvider";

export default function UserDetailsPage() {
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
