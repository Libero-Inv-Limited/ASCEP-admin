import { DemocracyCreateSDGModal } from "@/components/Democracy";
import { SDGTable } from "@/components/Democracy/SDGs";
import { Button } from "@/components/ui/button";
import useDisclosure from "@/hooks/useDisclosure";

interface SDGProps {}
const SDGHomePage: React.FC<SDGProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="page-wrapper">
      <div className="flex items-center justify-between">
        <h3>SDGs</h3>

        <Button onClick={onOpen}>Create SDG</Button>
      </div>
      <SDGTable />

      <DemocracyCreateSDGModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default SDGHomePage;
