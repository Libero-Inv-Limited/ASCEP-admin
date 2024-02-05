export default function DebateTagsSection({ data }: { data: DebateType }) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex items-center gap-2">
        {data.debateSDGs.map((sdg) => (
          <img
            key={sdg.sdgs.id}
            src={sdg.sdgs.banner}
            className="w-12 h-12 rounded-md"
            alt=""
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        {data.debateTag.map((tag) => (
          <div
            key={tag.id}
            className="px-2 py-1 capitalize rounded-xl bg-[#2929251A] text-nowrap "
          >
            {tag.tag_name}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        {data.debateTarget.map((target) => (
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
