import { SurveyResponseTable } from "@/components/Response";
import useDisclosure from "@/hooks/useDisclosure";

export default function QuestionResponse({ question }: { question: Question }) {
  const { isOpen, toggle } = useDisclosure();

  return (
    <div className="w-full space-y-6">
      <div>
        <p className="font-bold text-dark">{question.question_text}</p>
        <p className="mt-1 font-medium text-dark"></p>
      </div>

      <button onClick={toggle} className="text-subtle_text hover:underline ">
        {isOpen ? "Hide" : "View"}Responses
      </button>

      {isOpen && <SurveyResponseTable questionId={question.id} />}
    </div>
  );
}
