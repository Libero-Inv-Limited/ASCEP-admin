import { Button } from "@/components/ui/button";
import { AddSquare, MinusSquare } from "iconsax-react";

interface CommentCardFooterProp {
  showResponse: boolean;
  setShowResponse: React.Dispatch<React.SetStateAction<boolean>>;
  numberOfResponses: number;
  loading: boolean;
  isLoadingResponses: boolean;
  fetchResponse: () => void;
}
const CommentCardFooter: React.FC<CommentCardFooterProp> = ({
  showResponse,
  setShowResponse,
  numberOfResponses,
  loading,
  isLoadingResponses,
  fetchResponse,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-start gap-2">
      {showResponse ? (
        <Button
          className="bg-transparent hover:bg-transparent h-fit w-fit p-0  text-[14px]"
          onClick={() => {
            setShowResponse(false);
          }}
        >
          <MinusSquare size={25} />
          <span>{numberOfResponses} responses</span>
        </Button>
      ) : (
        <Button
          className="bg-transparent hover:bg-transparent h-fit w-fit p-0  text-[14px] disabled:opacity-100"
          onClick={fetchResponse}
          isLoading={loading}
          disabled={isLoadingResponses || numberOfResponses === 0}
        >
          <AddSquare size={25} />
          <span>{numberOfResponses} responses</span>
        </Button>
      )}
    </div>
  );
};

export default CommentCardFooter;
