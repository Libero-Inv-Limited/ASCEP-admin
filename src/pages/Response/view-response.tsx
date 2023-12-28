import {
  ResponseComment,
  ResponseDetails,
  ResponseImageSelect,
} from "@/components/Response";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import QuestionResponse from "./QuestionResponse";

export default function ViewResponsepage() {
  const { state } = useLocation();
  console.log(state);
  return (
    <div
      className="page-wrapper space-y-6 relative"
      style={{ paddingBottom: 100 }}
    >
      <h3 className="text-2xl">View Response</h3>
      {state.type === "Post" && <ResponseImageSelect />}
      <ResponseDetails />
      {state.status !== "pending" ? (
        <>
          {state.type === "Survey" ? (
            <>
              <QuestionResponse title="Question 1" />
              <QuestionResponse title="Question 2" />
            </>
          ) : (
            <>
              <ResponseComment />
              <ResponseComment />
              <ResponseComment />
            </>
          )}
        </>
      ) : (
        <div className="flex justify-end gap-3">
          <Button className="px-6 h-[44px]" variant="outline-primary">
            Reject post
          </Button>

          <Button className="px-6 h-[44px]">Approve post</Button>
        </div>
      )}

      {state.status !== "pending" && (
        <Button className="fixed bottom-10 right-10  ">
          Download Response
        </Button>
      )}
    </div>
  );
}
