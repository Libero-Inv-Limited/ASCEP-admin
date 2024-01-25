import { useGetDialogueRequestInfo } from "@/api/dialogue";
import { useParams } from "react-router-dom";
import DialogueStatusTag from "./DialogueStatusTag";
import DialogueVisibilityTag from "./DialogueVisibilityTag";
import { Skeleton } from "../ui/skeleton";

export default function DialogueRequestInfo() {
  const { requestId } = useParams();
  const { data, isLoading } = useGetDialogueRequestInfo(requestId!);
  return (
    <div className="w-9/12 space-y-7">
      {isLoading ? (
        <>
          <Skeleton className="h-5 rounded bg-slate-200" />
          <Skeleton className="w-4/12 h-5 rounded bg-slate-200" />
          <Skeleton className="w-7/12 h-5 rounded bg-slate-200" />
        </>
      ) : (
        data && (
          <>
            <h3 className="font-medium text-text ">{data.title}</h3>
            <span className="leading-7 tracking-wide text-subtle_text">
              Request to {data.authority.name} by {data.author.username} on{" "}
              {new Date(data.createdAt).toDateString()}
            </span>
            <div className="flex gap-3">
              <DialogueStatusTag status={data.status} />
              <DialogueVisibilityTag visibility={data.public_identifier} />
            </div>
          </>
        )
      )}
    </div>
  );
}
