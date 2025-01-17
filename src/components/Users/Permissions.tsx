import { useUserSettingsContext } from "@/providers/UserSettingsProvider";
import { Skeleton } from "../ui/skeleton";
import AssignPermssion from "./AssignPermssion";

export default function Permissions() {
  const { userObj, fetchingUserObj } = useUserSettingsContext();

  return (
    <div>
      <div className="py-4 border-b border-t border-[#F0F0F0] text-dark">
        Permissions
      </div>

      <div className="grid grid-cols-5 gap-4 py-8">
        {fetchingUserObj
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton className="h-3 rounded bg-slate-200" key={i} />
            ))
          : userObj &&
            userObj.permissions.map((permission) => (
              <div
                key={permission}
                className="bg-[#6B6B6B33] px-2 py-1 rounded-lg text-xs font-medium text-center"
              >
                {permission}
              </div>
            ))}
      </div>

      <div className="flex justify-end mt-12">
        <AssignPermssion />
      </div>
    </div>
  );
}
