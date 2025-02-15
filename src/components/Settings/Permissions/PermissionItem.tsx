import { Button } from "@/components/ui/button";
import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ConfirmAction } from "@/components/custom";
import useDisclosure from "@/hooks/useDisclosure";
import { useDeletePermission } from "@/api/permissions";

interface PermissionItemProps {
  permission: Permission;
  setSelectedPermission: React.Dispatch<React.SetStateAction<Permission | null>>;
  setActiveRoleOption: React.Dispatch<React.SetStateAction<RolesOption>>;
}

export default function PermissionItem({
  permission,
  setSelectedPermission,
  setActiveRoleOption,
}: PermissionItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useDeletePermission();

  const handleEdit = () => {
    setSelectedPermission(permission);
    setActiveRoleOption("Update Permission");
  };

  return (
    <AccordionItem className="py-4" value={permission.id.toString()}>
      <AccordionTrigger className="flex items-center justify-between w-full py-0 hover:no-underline">
        <p className="text-base font-normal">{permission.name}</p>
      </AccordionTrigger>

      <AccordionContent className="py-5 spacy-5">
        <div className="flex flex-wrap gap-2 min-h-10 bg-gray-200 rounded-lg p-2">
          {permission.description}
        </div>

        <div className="flex justify-end gap-6 mt-10">
          <Button
            onClick={handleEdit}
            disabled={isLoading}
            className="w-[130px] h-[46px]"
          >
            Edit Permission
          </Button>
          <Button
            onClick={onOpen}
            className="w-[130px] h-[46px]"
            variant="outline-primary"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Delete Permission
          </Button>
        </div>
      </AccordionContent>

      <ConfirmAction
        isOpen={isOpen}
        onClose={onClose}
        message="Are you sure you want to delete this permission?"
        onContinue={() => mutate(permission.id)}
        isLoading={isLoading}
      />
    </AccordionItem>
  );
}
