import { Form } from "../ui/form";
import { FormInput, SDGMultiSelect } from "../custom";
import { updateReportSchema } from "@/schemas/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import FormTextArea from "../custom/FormTextArea";
import { useUpdateReport } from "@/api/response";
import FormSelectCategory from "../Democracy/common/FormSelectCategories";
import { useNavigate } from "react-router-dom";

interface UpdateReportProps {
  reportData: ReportData; // Updated to directly hold the data
}

const UpdateReport: React.FC<UpdateReportProps> = ({ reportData }) => {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [selectedSDGs, setSelectedSDGs] = useState<SDGData[]>([]);

  const navigate = useNavigate();

  function extractTextFromJSXString(jsxString: string) {
    // Create a new DOMParser
    const parser = new DOMParser();

    // Parse the string as an HTML document
    const doc = parser.parseFromString(jsxString, "text/html");

    // Use textContent to extract the plain text from the parsed document
    return doc.body.textContent || "";
  }

  // Initialize form with default values from reportData
  const form = useForm<z.infer<typeof updateReportSchema>>({
    resolver: zodResolver(updateReportSchema),
    defaultValues: {
      title: reportData.title || "",
      description: extractTextFromJSXString(reportData.description),
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutate, isLoading, data } = useUpdateReport();

  // console.log(reportData.category);

  useEffect(() => {
    if (data && data.status === "success") {
      navigate(`/response/reports/${data.data.id}`);
    }
  }, [data, navigate]);

  const [updatedCategories, setUpdatedCategories] = useState<number[]>([]);
  const [updatedSdgs, setUpdatedSdgs] = useState<number[]>([]);

  const onSubmit = (data: z.infer<typeof updateReportSchema>) => {

    if (category.length === 0) {
      setUpdatedCategories((prev) => [...prev, reportData.reportCategory.category_id]);
    } else {
      setUpdatedCategories((prev) => [...prev, ...category.map(item => item.id)]);
    }

    if (selectedSDGs.length === 0) {
      setUpdatedSdgs((prev) => [...prev, ...reportData.reportSDGs.map(item => item.sdg_id)]);
    } else {
      setUpdatedSdgs((prev) => [...prev, ...selectedSDGs.map(item => item.id)]);
    }

    const payload = {
      ...data,
      sdgs: updatedSdgs,
      categories: updatedCategories,
      id: reportData.id, // Include report ID if needed in mutation
    };

    mutate(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-[670px]">
        <div className="flex items-center justify-between ">
          <p className="text-subtle_text">Title (Optional)</p>
          <div className="w-full max-w-[380px]">
            <FormInput
              control={control}
              name="title"
              label="Title"
              placeholder="Title"
              errors={errors}
              isWhite
            />
          </div>
        </div>

        <div className="flex items-center justify-between ">
          <p className="text-subtle_text">Category (Optional)</p>
          <div className="w-full max-w-[380px]">
            <FormSelectCategory setCategory={setCategory} category={category} currentCategories={reportData.reportCategory} />
          </div>
        </div>

        <div className="flex items-center justify-between ">
          <p className="text-subtle_text">Link to SDG (Optional)</p>
          <div className=" w-full max-w-[380px]">
            <SDGMultiSelect
              selected={selectedSDGs}
              setSelected={setSelectedSDGs}
              currentSDGs={reportData.reportSDGs}
              isWhite
            />
          </div>
        </div>

        <div className="flex items-center justify-between ">
          <p className="text-subtle_text">Description (Optional)</p>
          <div className="w-full max-w-[380px]">
            <FormTextArea
              control={control}
              name="description"
              placeholder="Description"
              errors={errors}
              isWhite
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button isLoading={isLoading} className="w-[175px]">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateReport;
