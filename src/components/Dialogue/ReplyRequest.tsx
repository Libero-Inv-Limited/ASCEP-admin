/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useDisclosure from "@/hooks/useDisclosure";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useCreateRequestResponse } from "@/api/dialogue";
import { CreateRequestResponseSchema } from "@/schemas/dialogueSchemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormTextArea from "../custom/FormTextArea";

export default function ReplyRequest({
  requestId,
}: {
  requestId: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const form = useForm<z.infer<typeof CreateRequestResponseSchema>>({
    resolver: zodResolver(CreateRequestResponseSchema),
    defaultValues: {
      content: "",
      request_id: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutateAsync: createResponse, isLoading, data: successResp } = useCreateRequestResponse();


  useEffect(() => {
    if (successResp) onClose();
  }, [successResp]);

  async function onSubmit(values: z.infer<typeof CreateRequestResponseSchema>) {
    const formData = new FormData();
    formData.append("content", values.content);
    formData.append("request_id", requestId!);
    await createResponse(formData);
    onClose();
  }

  return (
    <div>
      <Button onClick={onOpen}>Write a Reply</Button>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent
            className="min-w-[700px]"
            style={{ borderRadius: 40, padding: 32 }}
          >
            <h3 className="border-b text-text border-black/10">
              Add a Response
            </h3>

            <div className="space-y-6">
              <p className="text-base text-subtitle_text">
                Write a response to the request
              </p>

              <div className="">
                <Form {...form}>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                  >
                    {/* TITLE */}
                    <FormTextArea
                      name="content"
                      label="Write reply"
                      control={control}
                      errors={errors}
                      placeholder="Enter reply "
                    />
                    <div className="flex gap-3 flex-wrap">
                      <Button
                        type="submit"
                        className="w-full max-w-[150px] text-base p-1 h-12 py-3"
                        isLoading={isLoading}
                        disabled={isLoading}
                      >
                        Send reply
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )
      }
    </div >
  );
}
