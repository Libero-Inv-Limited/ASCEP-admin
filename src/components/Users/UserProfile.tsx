import { useUserSettingsContext } from "@/providers/UserSettingsProvider";
import { Skeleton } from "../ui/skeleton";

export default function UserProfile() {
  const { fetchingUserObj, userObj } = useUserSettingsContext();
  return (
    <div className="space-y-8">
      <div className="py-4 border-b border-[#F0F0F0] text-dark">
        Admin's Profile
      </div>
      <div className="space-y-6">
        {fetchingUserObj ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-3 rounded-md bg-slate-200" />
          ))
        ) : (
          <>
            {userObj?.firstname && (
              <ProfileRow
                title="Full name"
                value={`${userObj?.firstname} ${userObj?.lastname}`}
              />
            )}
            <ProfileRow title="Email" value={userObj?.email || ""} />
            <ProfileRow title="Phone number" value={userObj?.mobile || ""} />
            <ProfileRow title="Username" value={userObj?.username || ""} />
            <ProfileRow title="Role" value={userObj?.roleDetail.name || ""} />
            <ProfileRow
              title="Date Joined"
              value={
                userObj?.date_joined
                  ? new Date(userObj!.date_joined)?.toDateString()
                  : ""
              }
            />
          </>
        )}
      </div>
    </div>
  );
}

function ProfileRow({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex items-center justify-between font-medium">
      <p className="text-subtle_text ">{title}</p>
      <p className="text-dark">{value}</p>
    </div>
  );
}
