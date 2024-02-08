export default function InitiativeTagsSection({
  data,
}: {
  data: InitiativeType;
}) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex items-center gap-2">
        {data.initiativeSDGs.map((sdg) => (
          <img
            key={sdg.sdg.id}
            src={sdg.sdg.banner}
            className="w-12 h-12 rounded-md"
            alt=""
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        {data.initiativeTag.map((tag) => (
          <div
            key={tag.id}
            className="px-2 py-1 capitalize rounded-xl bg-[#2929251A] text-nowrap "
          >
            {tag.tag_name}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        {data.initiativeTarget.map((target) => (
          <div
            key={target.targetInfo.id}
            className="px-4 py-1 capitalize text-white  rounded-xl bg-[#EF4444] text-nowrap "
          >
            Target {target.targetInfo.code}
          </div>
        ))}
      </div>
    </div>
  );
}
