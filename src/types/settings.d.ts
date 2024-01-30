// import { ReactNode } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
type SettingsOption =
  | "User Profile"
  | "Change Password"
  | "Enable 2FA"
  | "Verify 2FA OTP"
  | "Activities"
  | "Edit Profile"
  | "Roles & Permissions"
  | "API Integration"
  | "System Configurations";

type RolesOption = "Roles" | "Update Role" | "New Role";

type APIIntegrationOption = "API Integration" | "New API";

interface ActionButton {
  text: string;
  function: (arg: any) => void;
}

interface SettingsContextType {
  timeLimit: number;
  setTimeLimit: (arg: number) => void;
  activeOption: SettingsOption;
  setActiveOption: (arg: SettingsOption) => void;
  activeTitle: string | null;
  setActiveTitle: (arg: string | null) => void;
  setTwoFactorAuth: (arg: boolean) => void;
  twoFactorAuth: boolean;
  actionButton: ActionButton | null;
  setActionButton: (arg: ActionButton | null) => void;
}

interface SettingsOptionObj {
  title: SettingsOption;
  subtitle: string;
}

interface UserData {
  id: number;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  mobile: string;
  bio: any;
  role: number;
  dob: any;
  last_login: string;
  date_joined: string;
  profile_picture: any;
  analytic: any;
  twoFA: TwoFA | null;
  roleDetail: RoleDetail;
}

interface TwoFA {
  verified: boolean;
}

interface RoleDetail {
  id: number;
  name: string;
  rolePermission: any[];
}

interface TwoFactorAuthForm {
  type: "email" | "authenticator app" | "sms";
  email?: string;
}

interface UserActivitiesResponse {
  activities: UserActivitiesType[];
  meta: MetaDataType;
}

interface UserActivitiesType {
  id: number;
  user_id: number;
  activity_type: string;
  activity_details: string;
  timestamp: any;
  ip_address: string;
  user_agent: string;
  updatedAt: string;
  createdAt: string;
}

// ROLES AND PERMISSIONS

interface Permission {
  id: number;
  name: string;
  description: string;
}

interface Role {
  id: number;
  name: string;
  description: string;
  type: string;
  rolePermission: RolePermission[];
}

interface RolePermission {
  id: number;
  role_id: number;
  permission_id: number;
  permission: Permission;
}

// API Integrations

// SYSTEM CONFIGURATIONS

interface SystemConfigItem {
  id: number;
  config_key: string;
  config_value: string;
  modified_by: any;
  updated_at: string;
  created_at: string;
  slug: string;
  input_field: string;
}

interface UpdateSystemConfigPayload {
  slug: string;
  config_value: string;
}
