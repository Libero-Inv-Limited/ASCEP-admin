import DialogueAuthorityDropdownMenu from "./DialogueAuthorityDropdownMenu";

export default function DialogueAuthorityCard({
  authority,
}: {
  authority: AuthorityType;
}) {
  return (
    <div className="flex items-center justify-between w-full p-4 bg-white rounded-3xl">
      <p className="text-subtle_text ">{authority?.name || ""}</p>
      <DialogueAuthorityDropdownMenu authority={authority} />
    </div>
  );
}
