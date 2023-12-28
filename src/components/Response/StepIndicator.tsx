export default function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="border rounded-lg border-primary">
        <div className="w-4 h-4 rounded-full m-[3px] bg-primary"></div>
      </div>

      <div className="border-t border-primary w-[135px] "></div>

      <div className="border rounded-lg border-primary">
        <div
          className={`w-4 h-4 rounded-full m-[3px] ${
            step === 2 ? "bg-primary" : ""
          } `}
        ></div>
      </div>
    </div>
  );
}
