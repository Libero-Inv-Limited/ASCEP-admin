import { Button } from "@/components/ui/button";
import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ConfirmAction, EmptyState } from "@/components/custom";
import { useDeleteRole } from "@/api/roles";
import useDisclosure from "@/hooks/useDisclosure";

interface RoleItemProps {
  role: Role;
  setSelectedRole: React.Dispatch<React.SetStateAction<Role | null>>;
  setActiveRoleOption: React.Dispatch<React.SetStateAction<RolesOption>>;
}

export default function RoleItem({
  role,
  setSelectedRole,
  setActiveRoleOption,
}: RoleItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useDeleteRole();

  const handleEdit = () => {
    setSelectedRole(role);
    setActiveRoleOption("Update Role");
  };

  return (
    <AccordionItem className="py-4" value={role.id.toString()}>
      <AccordionTrigger className="flex items-center justify-between w-full py-0 hover:no-underline">
        <p className="text-base font-normal"> {role.name}</p>
      </AccordionTrigger>

      <AccordionContent className="py-5 spacy-5 ">
        <div className="flex flex-wrap gap-2">
          {role.rolePermission.length ? (
            role.rolePermission.map((permission) => (
              <div className="px-2 py-1 text-white bg-black rounded-md w-fit">
                {permission.permission.name}
              </div>
            ))
          ) : (
            <EmptyState height="150px" />
          )}
        </div>

        <div className="flex justify-end gap-6 mt-10">
          <Button
            onClick={handleEdit}
            disabled={isLoading}
            className="w-[130px] h-[46px]"
          >
            Edit Role
          </Button>
          <Button
            onClick={onOpen}
            className="w-[130px] h-[46px]"
            variant="outline-primary"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Delete Role
          </Button>
        </div>
      </AccordionContent>

      <ConfirmAction
        isOpen={isOpen}
        onClose={onClose}
        message="Are you sure you want to delete this role?"
        onContinue={() => mutate(role.id)}
        isLoading={isLoading}
      />
    </AccordionItem>
  );
}
