import { DialogueAuthoritiesTable } from "@/components/Dialogue";
import AddAuthority from "@/components/Dialogue/AddAuthority";
import { Button } from "@/components/ui/button";
import { useNavigationContext } from "@/contexts/NavigationContext";
import useDisclosure from "@/hooks/useDisclosure";
import { useEffect } from "react";

export default function AuthoritiesPage() {
  const { SetTopBarComponents } = useNavigationContext();

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    SetTopBarComponents(<Button onClick={onOpen}>Add Authority</Button>);

    return () => SetTopBarComponents(null);
  }, []);

  return (
    <div className="page-wrapper">
      <DialogueAuthoritiesTable />

      <AddAuthority isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
