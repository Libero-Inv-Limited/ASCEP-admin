import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";
import { useGetAllAuthorities } from "@/api/authorities";
import DialogueAuthorityCard from "./DialogueAuthorityCard";

export default function ResponseCategories() {
  const { data, isLoading } = useGetAllAuthorities();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between text-lg">
        <p className="text-subtle_text">Authorities</p>

        <div className="flex items-center gap-4">
          <Link to="/dialogue/authorities" className="underline text-dark">
            See all
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-full h-20 bg-slate-200 rounded-xl"
              />
            ))
          : data &&
            data.map((authority) => (
              <DialogueAuthorityCard authority={authority} />
            ))}
      </div>
    </div>
  );
}
