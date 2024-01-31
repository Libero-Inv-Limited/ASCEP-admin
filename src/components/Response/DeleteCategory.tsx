import React, { useEffect } from "react";
import { ConfirmAction } from "../custom";
import useDisclosure from "@/hooks/useDisclosure";
import { useDeleteCategory } from "@/api/category";

interface DeleteCategoryProps {
  trigger: React.ReactNode;
  categoryid: number;
}

export default function DeleteCategory({
  trigger,
  categoryid,
}: DeleteCategoryProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { data, isLoading, mutate } = useDeleteCategory();

  useEffect(() => {
    data && onClose();
  }, [data]);

  const onContinue = () => {
    mutate(categoryid);
  };
  return (
    <div>
      <button onClick={onOpen}>{trigger}</button>

      <ConfirmAction
        isOpen={isOpen}
        onClose={onClose}
        onContinue={onContinue}
        message="Are you sure you want to delete this category?"
        isLoading={isLoading}
      />
    </div>
  );
}
