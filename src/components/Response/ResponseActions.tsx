import ResponseAction from "./ResponseAction";
import { Import } from "lucide-react";
import { AddCircle, Export } from "iconsax-react";
import useDisclosure from "@/hooks/useDisclosure";
import { CreateSurvey, CreateSurveyQuestions, ImportCSV } from ".";

export default function ResponseActions() {
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
      <ResponseAction
        title="Import CSV file"
        icon={<Import />}
        onClick={onImportOpen}
      />
      <ResponseAction
        title="Export CSV file"
        icon={<Export />}
        onClick={() => {}}
      />
      <ResponseAction
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
