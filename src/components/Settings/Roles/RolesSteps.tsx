import { useState } from "react";
import AllRoles from "./AllRoles";
import CreateRole from "./CreateRole";
import UpdateRole from "./UpdateRole";

export default function RolesSteps() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [activeRoleOption, setActiveRoleOption] =
    useState<RolesOption>("Roles");
  return (
    <div>
      {activeRoleOption === "Roles" && (
        <AllRoles
          setActiveRoleOption={setActiveRoleOption}
          setSelectedRole={setSelectedRole}
        />
      )}
      {activeRoleOption === "New Role" && (
        <CreateRole setActiveRoleOption={setActiveRoleOption} />
      )}

      {activeRoleOption === "Update Role" && selectedRole && (
        <UpdateRole
          setActiveRoleOption={setActiveRoleOption}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
      )}
    </div>
  );
}
