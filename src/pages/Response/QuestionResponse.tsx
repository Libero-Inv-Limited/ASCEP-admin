import { ResponseComment } from "@/components/Response";

export default function QuestionResponse({ title }: { title: string }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-dark font-bold">{title}</p>
        <p className="text-dark font-medium mt-1">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <p className="text-subtle_text ">Response</p>

      <div className="grid grid-cols-2 gap-6">
        <ResponseComment />
        <ResponseComment />
        <ResponseComment />
        <ResponseComment />
      </div>
    </div>
  );
}
