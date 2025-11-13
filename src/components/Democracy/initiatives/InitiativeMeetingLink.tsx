import { useToast } from "@/components/ui/use-toast";
import { Airdrop, Copy } from "iconsax-react";
import logger from "@/utils/logger";

//
export default function InitiativeMeetingLink({
  data,
}: {
  data: InitiativeType;
}) {
  const copyToClipboard = (text: string) => {
    // Check if the Clipboard API is available in the browser
    if (!navigator.clipboard) {
      logger.error("Clipboard API is not available", null, "InitiativeMeetingLink");
      return;
    }

    // Write the text to the clipboard
    navigator.clipboard
      .writeText(text)
      .then(() => {
        logger.debug("Text copied to clipboard:", text, "InitiativeMeetingLink");
      })
      .catch((error) => {
        logger.error("Error copying text to clipboard:", error, "InitiativeMeetingLink");
      });
  };

  const { toast } = useToast();

  const handleCopy = () => {
    copyToClipboard(data.meeting_link || "");

    if (data.meeting_link) {
      toast({
        description: "Meeting link copied to clipboard",
        variant: "default",
      });
    } else
      toast({
        description: "No meeting link to copy",
        variant: "default",
      });
  };

  return (
    <div className="flex items-center gap-10 p-4 border w-fit rounded-2xl border-primary ">
      <Airdrop size="32" color="#000" />

      <div className="space-y-2">
        <p className="font-medium">Meeting link</p>

        <p>{data.meeting_link || "No meeting link yet."}</p>
      </div>

      <Copy
        onClick={handleCopy}
        className="cursor-pointer"
        size="32"
        color="#000"
        variant="Bold"
      />
    </div>
  );
}
