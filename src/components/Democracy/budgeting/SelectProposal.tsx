import { useSelectProject } from "@/api/democracy/budgeting";
import { ConfirmAction } from "@/components/custom";
import { Button } from "@/components/ui/button";
import useDisclosure from "@/hooks/useDisclosure";
import { useEffect } from "react";

export default function SelectProposal({
  proposal,
}: {
  proposal: ProjectProposalItem;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading, isSuccess } = useSelectProject();

  useEffect(() => {
    isSuccess && onClose();
  }, [isSuccess]);
  const handleContinue = () => {
    mutate({
      project_proposal: proposal.id,
    });
  };
  return (
    <div>
      {proposal.budgetItem ? (
        <Button>Selected</Button>
      ) : (
        <Button variant="outline-primary" onClick={onOpen}>
          Select
        </Button>
      )}

      <ConfirmAction
        isOpen={isOpen}
        onClose={onClose}
        message="Are you sure you want to select this proposal"
        onContinue={handleContinue}
        isLoading={isLoading}
      />
    </div>
  );
}
