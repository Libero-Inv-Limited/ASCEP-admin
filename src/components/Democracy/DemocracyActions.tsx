import { ActionCard } from "@/components/custom";
import { AddCircle, DocumentDownload } from "iconsax-react";
import DemocracyCreateSDGModal from "./DemocracyCreateSDGModal";
import DemocracyDownloadModal from "./DemocracyDownloadModal";
import useDisclosure from "@/hooks/useDisclosure";

export default function DemocracyActions() {
  const {
    isOpen: isDownloadOpen,
    onClose: onDownloadClose,
    onOpen: onDownloadOpen,
  } = useDisclosure();
  const {
    isOpen: isCreateOpen,
    onClose: onCreateClose,
    onOpen: onCreateOpen,
  } = useDisclosure();

  return (
    <div>
      <p className="mb-4 text-lg text-subtle_text">Actions</p>

      <div className="flex gap-4">
        <ActionCard
          icon={<DocumentDownload />}
          onClick={onDownloadOpen}
          title="Download"
        />
        <ActionCard
          icon={<AddCircle />}
          onClick={onCreateOpen}
          title="Create SDG"
        />
        <ActionCard icon={<AddCircle />} onClick={() => {}} title="Integrate" />
      </div>

      <DemocracyDownloadModal
        isOpen={isDownloadOpen}
        onClose={onDownloadClose}
      />
      <DemocracyCreateSDGModal isOpen={isCreateOpen} onClose={onCreateClose} />
    </div>
  );
}
