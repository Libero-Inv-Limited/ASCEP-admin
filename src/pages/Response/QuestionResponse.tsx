import { useGetSurveyResponse } from "@/api/response";
import { SurveyResponse } from "@/components/Response";
import { CustomPagination, EmptyState } from "@/components/custom";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function QuestionResponse({ question }: { question: Question }) {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch, remove } = useGetSurveyResponse({
    id: question.id.toString(),
    page,
  });

  useEffect(() => {
    return () => remove();
  }, []);

  return (
    <div className="w-full space-y-6">
      <div>
        <p className="font-bold text-dark">{question.question_text}</p>
        <p className="mt-1 font-medium text-dark"></p>
      </div>

      <button
        onClick={() => refetch()}
        className="text-subtle_text hover:underline "
      >
        View Responses
      </button>

      {isLoading ? (
        <div className="flex items-center justify-center h-20">
          <FaSpinner className="text-xl animate-spin text-primary" />
        </div>
      ) : (
        data && (
          <>
            {data?.responses.length ? (
              <div className="grid grid-cols-2 gap-6">
                {data.responses.map((response) => (
                  <SurveyResponse
                    options={question.question_options}
                    response={response}
                    key={response.id}
                  />
                ))}

                <div className="col-span-full">
                  <CustomPagination
                    page={page}
                    setPage={setPage}
                    paginationData={data?.meta}
                  />
                </div>
              </div>
            ) : (
              <EmptyState size={40} height={"80px"} />
            )}
          </>
        )
      )}
    </div>
  );
}
