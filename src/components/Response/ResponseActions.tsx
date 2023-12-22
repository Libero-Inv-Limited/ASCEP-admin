import ResponseAction from "./ResponseAction";
import { Import } from "lucide-react";
import { AddCircle, Export } from "iconsax-react";

export default function ResponseActions() {
  return (
    <div className="flex gap-5">
      <ResponseAction
        title="Import CSV file"
        icon={<Import />}
        onClick={() => {}}
      />
      <ResponseAction
        title="Import CSV file"
        icon={<Export />}
        onClick={() => {}}
      />
      <ResponseAction
        title="Import CSV file"
        icon={<AddCircle />}
        onClick={() => {}}
      />
    </div>
  );
}
