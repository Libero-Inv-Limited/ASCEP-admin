import { SurveyResponse } from "@/components/Response";

export default function QuestionResponse({ question }: { question: Question }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-bold text-dark">{question.question_text}</p>
        <p className="mt-1 font-medium text-dark"></p>
      </div>

      <p className="text-subtle_text ">Response</p>

      <div className="grid grid-cols-2 gap-6">
        <SurveyResponse response={question.userResponse} />
      </div>
    </div>
  );
}
