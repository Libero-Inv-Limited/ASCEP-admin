import { useState } from "react";

const useDisclosure = (defaultValue?: boolean) => {
  const [isOpen, setIsOpen] = useState(defaultValue || false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  return {
    isOpen,
    onOpen,
    onClose,
    toggle,
  };
};

export default useDisclosure;
