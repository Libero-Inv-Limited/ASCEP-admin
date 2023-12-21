export default function AdminsProfile() {
  const data: UserData = {
    id: 1,
    email: "user@example.com",
    username: "user123",
    firstname: "John",
    lastname: "Doe",
    mobile: "1234567890",
    bio: null,
    role: 1,
    dob: null,
    last_login: "2023-01-01T12:00:00Z",
    date_joined: "2022-01-01T12:00:00Z",
    profile_picture: null,
    analytic: null,
    twoFA: null,
    roleDetail: {
      id: 1,
      name: "Guest",
      rolePermission: [],
    },
  };
  return (
    <div>
      <div className="py-4 border-b border-[#F0F0F0] text-dark">
        Admin's Profile
      </div>
      <div className="space-y-6">
        <ProfileRow
          title="Full name"
          value={`${data?.firstname} ${data?.lastname}`}
        />
        <ProfileRow title="Email" value={data?.email || ""} />
        <ProfileRow title="Phone number" value={data?.mobile || ""} />
        <ProfileRow title="Username" value={data?.username || ""} />
        <ProfileRow title="Role" value={data?.roleDetail.name || ""} />
        <ProfileRow
          title="Date Joined"
          value={
            data?.date_joined ? new Date(data!.date_joined)?.toDateString() : ""
          }
        />
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
