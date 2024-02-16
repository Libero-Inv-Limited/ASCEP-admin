import { Location } from "iconsax-react";

interface ResponseDetailsProps {
  title: string;
  description: string;
  sdgs: SDGObj[];
  locationMeta: string;
  createdAt: number;
}

export default function ResponseDetails({
  title,
  description,
  sdgs,
  locationMeta,
  createdAt,
}: ResponseDetailsProps) {
  return (
    <div>
      <h3>{title}</h3>
      <div className="flex items-center gap-1 text-sm">
        <Location color="black" size={14} />
        <p>{locationMeta}</p>

        <p className="font-medium text-link">
          Posted on {new Date(createdAt).toDateString()}
        </p>
      </div>

      {/* <p>{description}</p> */}

      <div
        className="mb-8  text-subtle_text"
        dangerouslySetInnerHTML={{ __html: description }}
      />

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
