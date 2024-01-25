interface DialogueStatusTag {
  status: DialogueStatus;
}

export default function DialogueStatusTag({ status }: DialogueStatusTag) {
  return (
    <div
      className={` rounded-[10px] text-xs font-semibold text-center w-fit px-2 py-[6px] capitalize ${
        status === "fulfilled" || status === "closed"
          ? "bg-[#27AE60]/10 text-[#27AE60]"
          : status === "rejected"
          ? "bg-[#E43F40]/10 text-[#E43F40]"
          : "bg-[#F2994A]/10 text-[#F2994A]"
      } `}
    >
      {status}
    </div>
  );
}
