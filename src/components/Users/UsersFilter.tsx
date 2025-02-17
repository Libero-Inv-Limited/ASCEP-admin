import FilterDropdown from "../custom/FilterDropdown";
import { useAppContext } from "@/contexts/AppContext";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import useResponseFilters from "@/hooks/useResponseFilters";
import { useGetAllRoles } from "@/api/roles";

export default function UsersFilters({setRoleId}) {
  const [rolesFilters, setRolesFilters] = useState<FilterOption[]>([]);
  const { data: roles, isLoading } = useGetAllRoles();

  function clearFilter() {
    
  }

  useEffect(() => {
    if (roles) {
      const rolesOptions: FilterOption[] = roles?.map((role) => ({
        label: role?.name,
        value: role?.id,
      }));

      rolesOptions.unshift({ label: "All", value: "" });
      setRolesFilters(rolesOptions);
    }
  }, [roles]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white md:items-center md:flex-row ">
      {!!rolesFilters.length && (
        <FilterDropdown
          title={"Roles"}
          options={rolesFilters}
          onSelect={(e) =>
            setRoleId(e.value === "" ? "" : e.value)
          }
        />
      )}

      <div className="flex flex-row gap-4 md:hidden">
        <Button
          className="w-full"
          variant="outline-primary"
          onClick={() => {
            clearFilter();
          }}
        >
          Clear all filters
        </Button>
      </div>
    </div>
  );
}
