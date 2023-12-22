import { MouseEventHandler, ReactNode } from "react";
import { IconWrapper } from "../custom";

interface ResponseActionProps {
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
  title: string;
  icon: ReactNode;
}

export default function ResponseAction({
  onClick,
  icon,
  title,
}: ResponseActionProps) {
  return (
    <div
      onClick={onClick}
      className="w-[232px] border border-[#1E1432] p-4 rounded-[26px] cursor-pointer flex items-center gap-4"
    >
      <IconWrapper className=" bg-[#DBDBDB] rounded-xl w-12 h-12">
        {icon}
      </IconWrapper>

      <p className="text-base font-medium">{title}</p>
    </div>
  );
}
