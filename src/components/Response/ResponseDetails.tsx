import { Location } from "iconsax-react";

interface ResponseDetailsProps {
  title: string;
  description: string;
  sdgs: SDGObj[];
  locationMeta: string;
}

export default function ResponseDetails({
  title,
  description,
  sdgs,
  locationMeta,
}: ResponseDetailsProps) {
  return (
    <div>
      <h3>{title}</h3>
      <div className="flex items-center gap-1 text-sm">
        <Location color="black" size={14} />
        <p>{locationMeta}</p>
        <p className="font-bold text-link">Posted by</p>
        <p>David Olaniyi on Oct 28, 2023/</p>
      </div>

      <div className="my-5 font-medium text-dark">
        <p>{description}</p>
      </div>

      <div className="flex gap-6">
        {sdgs.map((sdg) => (
          <img
            className="w-16 h-16"
            src={sdg.sdg.banner}
            key={sdg.sdg_id}
            alt=""
          />
        ))}
      </div>
    </div>
  );
}
