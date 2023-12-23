import { ActionCard } from "@/components/custom";
import StatusUpdate from "./StatusUpdate";
import AddAuthority from "./AddAuthority";
import useDisclosure from "@/hooks/useDisclosure";
import { AddCircle, Timer } from "iconsax-react";

export default function DialogueActions() {
  const {
    isOpen: isUpdateOpen,
    onClose: onUpdateClose,
    onOpen: onUpdateOpen,
  } = useDisclosure();
  const {
    isOpen: isAuthorityOpen,
    onClose: onAuthorityClose,
    onOpen: onAuthorityOpen,
  } = useDisclosure();

  return (
    <div>
      <p className="mb-4 text-lg text-subtle_text">Actions</p>
      <div className="flex gap-4">
        <ActionCard
          icon={<Timer />}
          onClick={onUpdateOpen}
          title="3days"
          subtitle="Status Update"
        />
        <ActionCard
          icon={<AddCircle />}
          onClick={onAuthorityOpen}
          title="Add Authority"
        />
      </div>
      {/* MODALS */}
      <StatusUpdate isOpen={isUpdateOpen} onClose={onUpdateClose} />
      <AddAuthority isOpen={isAuthorityOpen} onClose={onAuthorityClose} />
    </div>
  );
}
