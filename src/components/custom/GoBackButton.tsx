import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft2 } from "iconsax-react";

interface GoBackButtonProps {
  link: string;
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ link }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(link); 
  };

  return (
    <Button
      className="text-[14px] capitalize gap-1 bg-[#ebe5f0] w-fit  h-fit hover:bg-[#363636] hover:text-white text-dark px-2 mb-2"
      onClick={handleGoBack}
    >
      <ArrowLeft2 size="20" />
      Go Back
    </Button>
  );
};

export default GoBackButton;