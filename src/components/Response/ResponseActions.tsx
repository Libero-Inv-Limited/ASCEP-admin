// import { Import } from "lucide-react";
import { AddCircle } from "iconsax-react";
// import useDisclosure from "@/hooks/useDisclosure";
// import { ImportCSV } from ".";
import { ActionCard } from "../custom";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";

export default function ActionCards() {
  // const {
  //   isOpen: isImportOpen,
  //   onOpen: onImportOpen,
  //   onClose: onImportClose,
  // } = useDisclosure();
  const { user } = useAppContext();
  console.log(user)

  const navigate = useNavigate();
  return (
    <div className="flex gap-5">
      {/* <ActionCard
        title="Import CSV file"
        icon={<Import />}
        onClick={onImportOpen}
      />
      <ActionCard
        title="Export CSV file"
        icon={<Export />}
        onClick={() => {}}
      /> */}
      {
        user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'create survey') &&
        (<ActionCard
          title="Create Survey" 
          icon={<AddCircle />}
          onClick={() => navigate("/response/create-survey")}
        />)
      }


      {/* <ImportCSV isOpen={isImportOpen} onClose={onImportClose} /> */}
    </div>
  );
}
