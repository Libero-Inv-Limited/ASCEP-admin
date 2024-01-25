interface DialogueVisibilityTagProps {
  visibility: DiablogueVisibility;
}

export default function DialogueVisibilityTag({
  visibility,
}: DialogueVisibilityTagProps) {
  return (
    <div
      className={` rounded-[10px] text-xs font-semibold text-center w-fit px-2 py-[6px] capitalize ${
        visibility === "public"
          ? "bg-[#27AE60]/10 text-[#27AE60]"
          : "bg-[#F2994A]/10 text-[#F2994A]"
      } `}
    >
      {visibility}
    </div>
  );
}
