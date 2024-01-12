export default function SurveryResponse({
  response,
}: {
  response: string | string[];
}) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-[24px] space-y-4 shadow-sm p-8">
        {typeof response === "string" ? (
          <p className="text-sm text-dark">{response}</p>
        ) : (
          response.map((option) => (
            <p key={option} className="text-sm text-dark">
              - {option}
            </p>
          ))
        )}
      </div>
    </div>
  );
}
