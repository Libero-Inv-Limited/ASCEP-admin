import React from 'react'
import { useGetAllPermissions } from "@/api/permissions";
import { Accordion } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettingsContext } from "@/providers/SettingsProvider";
import { useEffect } from "react";
import PermissionItem from './PermissionItem';

interface AllPermissionsProps {
  setActiveRoleOption: React.Dispatch<React.SetStateAction<RolesOption>>;
  setSelectedPermission: React.Dispatch<React.SetStateAction<Permission | null>>;
}

const AllPermissions = ({
  setActiveRoleOption,
  setSelectedPermission,
}: AllPermissionsProps) => {

  const { setActionButton, setActiveTitle } = useSettingsContext();

  useEffect(() => {
    setActionButton({
      text: "+ New Permission",
      function: () => {
        setActiveTitle("New Permission");
        setActiveRoleOption("New Permission");
      },
    });

    return () => setActionButton(null);
  }, []);

  const { data, isLoading } = useGetAllPermissions();

  console.log(data);  

  return (
    <div className="">
      {isLoading ? (
        Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 my-3 rounded-lg bg-slate-200" />
        ))
      ) : (
        <Accordion
          // className="AccordionRoot"
          type="single"
          defaultValue="item-1"
          collapsible
        >
          {data?.map((permission) => (
            <PermissionItem
              permission={permission}
              key={permission.id}
              setSelectedPermission={setSelectedPermission}
              setActiveRoleOption={setActiveRoleOption}
            />
          ))}
        </Accordion>
      )}
    </div>
  )
}

export default AllPermissions
