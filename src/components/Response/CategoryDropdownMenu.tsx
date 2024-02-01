import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DeleteCategory from "./DeleteCategory";
import { Link } from "react-router-dom";

export default function CategoryDropdownMenu({
  category,
}: {
  category: CollectionData;
}) {
  return (
    <div className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-8 h-8 p-0 bg-transparent hover:bg-gray-200 ">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="px-2 font-normal text-subtle_text"
          align="end"
        >
          <DropdownMenuLabel>
            <Link to={`/response/categories/${category.id}`}>
              View Category
            </Link>
          </DropdownMenuLabel>
          <DropdownMenuLabel>
            <DeleteCategory
              trigger={<p>Delete Category</p>}
              categoryid={category.id}
            />
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
