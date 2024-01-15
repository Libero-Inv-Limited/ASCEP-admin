import {
  ActiveSettingsOption,
  ProfileHeader,
  SettingsOptions,
} from "@/components/Settings";
import { PageFetchError, PageLoader } from "@/components/custom";
import { useAppContext } from "@/contexts/AppContext";
import SettingsProvider from "@/providers/SettingsProvider";

export default function SettingsPage() {
  const { user, fetchingUser } = useAppContext();

  return (
    <SettingsProvider>
      {fetchingUser ? (
        <PageLoader />
      ) : user !== null ? (
        <div className="w-full px-8 py-8 space-y-5  h-auto bg-[#F9F6FB] overflow-x-hidden">
          <ProfileHeader />

          <div className="relative grid grid-cols-12 gap-6 pt-28 ">
            <SettingsOptions />
            <ActiveSettingsOption />
          </div>
        </div>
      ) : (
        <PageFetchError />
      )}
    </SettingsProvider>
  );
}
