import { Like1 } from "iconsax-react";
import ViewSupport from "./ViewSupport";

export default function InitiativeSupportSection({
  data,
}: {
  data: InitiativeType;
}) {
  return (
    <>
      <h3 className="text-xl ">Support</h3>

      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-20 h-20 gap-2 text-sm text-green-600 bg-green-100 rounded-2xl">
          <Like1 />
          {data.supportPercentage.toFixed(2)}%
        </div>

        <div className="px-3 py-1 rounded-md shadow-sm bg-primary/100">
          {data.supportGotten}/{data.supportNeeded} supports gotten
        </div>

        <ViewSupport data={data} />
      </div>
    </>
  );
}
