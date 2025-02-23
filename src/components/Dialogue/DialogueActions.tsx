import { ActionCard } from "@/components/custom";
// import StatusUpdate from "./StatusUpdate";
import AddAuthority from "./AddAuthority";
import useDisclosure from "@/hooks/useDisclosure";
import { AddCircle } from "iconsax-react";
import { useAppContext } from "@/contexts/AppContext";

export default function DialogueActions() {
  // const {
  //   isOpen: isUpdateOpen,
  //   onClose: onUpdateClose,
  //   onOpen: onUpdateOpen,
  // } = useDisclosure();
  const {
    isOpen: isAuthorityOpen,
    onClose: onAuthorityClose,
    onOpen: onAuthorityOpen,
  } = useDisclosure();
  const { user } = useAppContext();

  return (
    <div>
      <p className="mb-4 text-lg text-dark font-medium">Actions</p>
      <div className="flex gap-4">
        {/* <ActionCard
          icon={<Timer />}
          onClick={onUpdateOpen}
          title="3days"
          subtitle="Status Update"
        /> */}
        {
          user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'create authority') &&
          (<ActionCard
            icon={<AddCircle />}
            onClick={onAuthorityOpen}
            title="Add Authority"
          />)
        }

      </div>
      {/* MODALS */}
      {/* <StatusUpdate isOpen={isUpdateOpen} onClose={onUpdateClose} /> */}
      {isAuthorityOpen && (
        <AddAuthority isOpen={isAuthorityOpen} onClose={onAuthorityClose} />
      )}
    </div>
  );
}
