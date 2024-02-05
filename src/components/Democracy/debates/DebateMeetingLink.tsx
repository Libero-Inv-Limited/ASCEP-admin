import { Airdrop, Copy } from "iconsax-react";

//
export default function DebateMeetingLink({ data }: { data: DebateType }) {
  console.log(data);
  return (
    <div className="flex items-center gap-10 p-4 border w-fit rounded-2xl border-primary ">
      <Airdrop size="32" color="#000" />

      <div className="space-y-2">
        <p className="font-medium">Meeting link</p>

        <p>httc/vfhthtntjtgjmy.gjjgmgg</p>
      </div>

      <Copy size="32" color="#000" variant="Bold" />
    </div>
  );
}
