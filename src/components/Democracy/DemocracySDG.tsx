export default function DemocracySDG() {
  return (
    <div>
      <p className="mb-4 text-lg text-subtle_text">SDGs</p>

      <div className="flex gap-4 overflow-x-auto">
        {sdgs.map((sdg) => (
          <img
            src={sdg}
            key={sdg}
            className="object-contain w-[60px]"
            alt="sdg"
          />
        ))}
      </div>
    </div>
  );
}

const sdgs = [
  "/images/SDG/image 19.png",
  "/images/SDG/image 20.png",
  "/images/SDG/image 21.png",
  "/images/SDG/image 23.png",
  "/images/SDG/image 24.png",
  "/images/SDG/image 25.png",
  "/images/SDG/image 26.png",
  "/images/SDG/image 27.png",
  "/images/SDG/image 28.png",
  "/images/SDG/image 29.png",
  "/images/SDG/image 30.png",
  "/images/SDG/image 31.png",
  "/images/SDG/image 32.png",
  "/images/SDG/image 33.png",
  "/images/SDG/image 34.png",
  "/images/SDG/image 35.png",
];
