import { Import } from "lucide-react";
import { AddCircle, Export } from "iconsax-react";
import useDisclosure from "@/hooks/useDisclosure";
import { CreateSurvey, CreateSurveyQuestions, ImportCSV } from ".";
import { ActionCard } from "../custom";

export default function ActionCards() {
  const {
    isOpen: isImportOpen,
    onOpen: onImportOpen,
    onClose: onImportClose,
  } = useDisclosure();
  const {
    isOpen: isSurveyOpen,
    onOpen: onSurveyOpen,
    onClose: onSurveyClose,
  } = useDisclosure();

  const {
    isOpen: isSurveyQuestionsOpen,
    onOpen: onSurveyQuestionsOpen,
    onClose: onSurveyQuestionsClose,
  } = useDisclosure();
  return (
    <div className="flex gap-5">
      <ActionCard
        title="Import CSV file"
        icon={<Import />}
        onClick={onImportOpen}
      />
      <ActionCard
        title="Export CSV file"
        icon={<Export />}
        onClick={() => {}}
      />
      <ActionCard
        title="Create Survey"
        icon={<AddCircle />}
        onClick={onSurveyOpen}
      />

      <ImportCSV isOpen={isImportOpen} onClose={onImportClose} />
      <CreateSurvey
        openNext={onSurveyQuestionsOpen}
        isOpen={isSurveyOpen}
        onClose={onSurveyClose}
      />
      <CreateSurveyQuestions
        isOpen={isSurveyQuestionsOpen}
        onClose={onSurveyQuestionsClose}
      />
    </div>
  );
}
