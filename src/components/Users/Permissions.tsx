export default function Permissions() {
  return (
    <div>
      <div className="py-4 border-b border-t border-[#F0F0F0] text-dark">
        Permissions
      </div>

      <div className="grid grid-cols-5 gap-4 py-8">
        {Array.from({ length: 10 }).map((_, i) => (
          <div className="bg-[#6B6B6B33] px-2 py-1 rounded-lg text-xs font-medium text-center">
            Permission {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
