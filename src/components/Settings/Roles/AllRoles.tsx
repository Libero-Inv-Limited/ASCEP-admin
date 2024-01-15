import { useGetAllRoles } from "@/api/roles";
import { Accordion } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettingsContext } from "@/providers/SettingsProvider";
import { useEffect } from "react";
import RoleItem from "./RoleItem";

interface AllRolesProps {
  setActiveRoleOption: React.Dispatch<React.SetStateAction<RolesOption>>;
  setSelectedRole: React.Dispatch<React.SetStateAction<Role | null>>;
}

export default function AllRoles({
  setActiveRoleOption,
  setSelectedRole,
}: AllRolesProps) {
  const { setActionButton, setActiveTitle } = useSettingsContext();

  useEffect(() => {
    setActionButton({
      text: "+ New Role",
      function: () => {
        setActiveTitle("New Role");
        setActiveRoleOption("New Role");
      },
    });

    return () => setActionButton(null);
  }, []);

  const { data, isLoading } = useGetAllRoles();

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
          {data?.map((role) => (
            <RoleItem
              role={role}
              key={role.id}
              setSelectedRole={setSelectedRole}
              setActiveRoleOption={setActiveRoleOption}
            />
          ))}
        </Accordion>
      )}
    </div>
  );
}
