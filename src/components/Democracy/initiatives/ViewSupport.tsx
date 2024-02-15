import { Dialog, DialogContent } from "@/components/ui/dialog";
import useDisclosure from "@/hooks/useDisclosure";

export default function ViewSupport({ data }: { data: InitiativeType }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <div
        onClick={onOpen}
        className="px-4 py-[6px] text-sm underline cursor-pointer rounded-xl bg-black/10  hover:bg-[#333]/10"
      >
        View Supports
      </div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="min-w-[600px]"
          style={{
            padding: 24,
            borderRadius: 40,
          }}
        >
          <h3 className="pb-3 text-2xl border-b text-text border-black/10">
            View support (4 out of 5)
          </h3>

          <p className="py-5 text-text border-b border-[333]/10">User</p>

          {/* <div className="min-h-[300]">{data.support_needed.m}</div> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
