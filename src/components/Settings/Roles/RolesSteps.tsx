import { useState } from "react";
import AllRoles from "./AllRoles";
import CreateRole from "./CreateRole";
import UpdateRole from "./UpdateRole";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import AllPermissions from "../Permissions/AllPermissions";
import CreatePermission from "../Permissions/CreatePermission";
import UpdatePermission from "../Permissions/UpdatePermission";

export default function RolesSteps() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
  const [activeRoleOption, setActiveRoleOption] =
    useState<RolesOption>("Roles");

  function handlePermissions() {
    setActiveRoleOption((prev) => {
      if (prev !== "Permissions") {
        setSelectedRole(null); // Reset selected role when switching to Permissions
        return "Permissions";
      }
      return prev;
    });
  }

  function handleRoles() {
    setActiveRoleOption((prev) => {
      if (prev !== "Roles") {
        setSelectedPermission(null); // Reset selected permission when switching to Roles
        return "Roles";
      }
      return prev;
    });
  }
  
  return (
    <div>
      {/* {activeRoleOption === "Roles" && (
        <AllRoles
          setActiveRoleOption={setActiveRoleOption}
          setSelectedRole={setSelectedRole}
        />
      )} */}
      <Accordion
        // className="AccordionRoot"
        type="single"
        defaultValue="item-1"
        collapsible
      >
        <AccordionItem className="py-4" value={activeRoleOption}>
          <AccordionTrigger className="flex items-center justify-between w-full py-0 hover:no-underline" onClick={handleRoles}>
            <p className="text-lg font-semibold">Roles</p>
          </AccordionTrigger>

          <AccordionContent className="ps-2 py-5 spacy-5">
            {activeRoleOption === "Roles" && (
              <AllRoles
                setActiveRoleOption={setActiveRoleOption}
                setSelectedRole={setSelectedRole}
              />
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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

      <Accordion
        // className="AccordionRoot"
        type="single"
        defaultValue="item-1"
        collapsible
      >
        <AccordionItem className="py-4" value={activeRoleOption}>
          <AccordionTrigger className="flex items-center justify-between w-full py-0 hover:no-underline" onClick={handlePermissions}>
            <p className="text-lg font-semibold">Permissions</p>
          </AccordionTrigger>

          <AccordionContent className="ps-2 py-5 spacy-5">
            {activeRoleOption === "Permissions" && (
              <AllPermissions
                setActiveRoleOption={setActiveRoleOption}
                setSelectedPermission={setSelectedPermission}
              />
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {activeRoleOption === "New Permission" && (
        <CreatePermission setActiveRoleOption={setActiveRoleOption} />
      )}

      {activeRoleOption === "Update Permission" && selectedPermission && (
        <UpdatePermission
          setActiveRoleOption={setActiveRoleOption}
          selectedPermission={selectedPermission}
          setSelectedPermission={setSelectedPermission}
        />
      )}
    </div>
  );
}
