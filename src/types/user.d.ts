type UserSettingsOption =
  | "User Profile"
  | "Permissions"
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
}

interface UserSettingsOptionObj {
  title: UserSettingsOption;
  subtitle: string;
}
