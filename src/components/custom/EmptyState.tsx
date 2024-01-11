import { FolderOpen } from "lucide-react";
import React from "react";

interface EmptyStateProps {
  height: string | number;
}
export default function EmptyState({ height }: EmptyStateProps) {
  return (
    <div
      style={{
        height,
      }}
      className="flex flex-col items-center justify-center h-full gap-4"
    >
      <FolderOpen size="72" color="#FFC334" />
      <p className="text-xl font-medium text-dark">No Data Found</p>
    </div>
  );
}
