import { useAppContext } from "@/contexts/AppContext";
import { CategoryCard } from "../custom";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import AddCategory from "./AddCategory";
import useDisclosure from "@/hooks/useDisclosure";

export default function ResponseCategories() {
  const { categories, fetchingCategories, user } = useAppContext();

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between text-lg">
        <p className="text-dark text-xl font-medium">Categories</p>

        <div className="flex items-center gap-4">
          {
            user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'create category') &&
            (<Button onClick={onOpen} variant="primary" size="xs">
              + Create Category
            </Button>)
          }

          <Link to="/response/categories" className="underline text-dark">
            See all
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-5">
        {fetchingCategories
          ? Array.from({ length: 8 }).map((_, i) => (
            <Skeleton
              key={i}
              className="w-full h-20 bg-slate-200 rounded-xl"
            />
          ))
          : categories &&
          categories.map((category) => <CategoryCard category={category} />)}
      </div>

      <AddCategory isOpen={isOpen} onClose={onClose} categoryData={undefined} />
    </div>
  );
}
