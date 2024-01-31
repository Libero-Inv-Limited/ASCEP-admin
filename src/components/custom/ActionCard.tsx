import { MouseEventHandler, ReactNode } from "react";
import IconWrapper from "./IconWrapper";

interface ActionCardProps {
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
  title: string;
  subtitle?: string;
  icon: ReactNode;
}

export default function ActionCard({
  onClick,
  icon,
  title,
  subtitle,
}: ActionCardProps) {
  return (
    <div
      onClick={onClick}
      className="w-[232px] border border-[#1E1432] p-4 rounded-[26px] cursor-pointer flex items-center gap-4"
    >
      <IconWrapper className=" bg-[#DBDBDB] rounded-xl w-12 h-12">
        {icon}
      </IconWrapper>

      <div className="space-y-1">
        <p className="text-xs">{subtitle}</p>
        <p className="text-base font-medium">{title}</p>
      </div>
    </div>
  );
}
