type UserSettingsOption =
  | "User Profile"
  | "Permissions"
  | "Change Role"
  | "Posts"
  | "Device Log"
  | "User’s Activity"
  | "Edit Profile";

interface UserSettingsContextType {
  timeLimit: number;
  setTimeLimit: (arg: number) => void;
  activeOption: UserSettingsOption;
  setActiveOption: (arg: UserSettingsOption) => void;
  setTwoFactorAuth: (arg: boolean) => void;
  twoFactorAuth: boolean;
  userObj: UserObj | undefined;
  fetchingUserObj: boolean;
}

interface UserSettingsOptionObj {
  title: UserSettingsOption;
  subtitle: string;
}

interface UsersData {
  analytics: Analytics;
  users: UserObj[];
  meta: MetaDataType;
}

interface Analytics {
  total_users: string;
  active_users: string;
  inactive_users: string;
}

interface UserObj {
  id: number;
  email: string;
  remember_me_token: any;
  mobile: string;
  role: number;
  email_verified: boolean;
  account_verified_on?: string;
  login_count: number;
  profile_picture?: string;
  username: string;
  date_joined: string;
  last_login?: string;
  two_fa_session_token?: string;
  status: string;
  bio: any;
  dob: any;
  updated_at: string;
  created_at: string;
  profile_picture_id?: string;
  firstname?: string;
  lastname?: string;
  occupation: any;
  age_group: any;
  location: any;
  gender: any;
  educational_level: any;
  twoFA?: TwoFa;
  roleDetail: RoleDetail;
  permissions: string[];
}

interface TwoFa {
  id: number;
  method: string;
  verified: boolean;
  user_id: number;
}

interface RoleDetail {
  id: number;
  name: string;
}
