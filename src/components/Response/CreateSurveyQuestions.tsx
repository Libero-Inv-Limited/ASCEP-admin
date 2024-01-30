/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Form } from "../ui/form";
import { FormInput } from "../custom";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Add, Location } from "iconsax-react";
import FormSelect from "../Democracy/common/FormSelect";
import { SelectItem } from "../ui/select";
import { surveyQuestionSchema } from "@/schemas/responseSchemas";
import { useLocation } from "react-router-dom";
import { useAddSurveyQuestion } from "@/api/response";

export default function CreateSurvey() {
  type Question = z.infer<typeof surveyQuestionSchema>;

  const { state } = useLocation();

  const defaultValues: Question = {
    question: "",
    response_type: "text",
    options: null,
  };

  interface FormData {
    questions: Question[];
  }

  const form = useForm<FormData>({
    // resolver: zodResolver(questionSchema),
    defaultValues: {
      questions: [defaultValues],
    },
  });

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const questions = watch("questions");

  const handleAddOption = (index: number) => {
    setValue(`questions.${index}.options`, [
      ...(questions[index]?.options || []),
      "",
    ]);
  };

  const handleAnswerTypeChange = (index: number, value: SurveyQuestionType) => {
    console.log("CHANGE");
    setValue(`questions.${index}.response_type`, value);
    if (value === "text") {
      // setValue(`questions.${index}.options`, [""]); // Add an initial option
      handleAddOption(index);
    } else {
      setValue(`questions.${index}.options`, null);
    }
  };

  const { mutate, isLoading } = useAddSurveyQuestion();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const questions = data.questions.map((question) => ({
      ...question,
      survey_id: state.survey_id,
    }));

    const payload = { questions };
    mutate(payload);
  };

  return (
    <div className="w-[680px]">
      <h4 className="pb-3 text-[32px] ">
        Upgrade of the International Airport
      </h4>

      <div className="flex items-center gap-1 text-sm">
        <p className="font-bold text-link">Development</p>
        <Location color="black" size={14} />
        <p>Umuleri, Anambra State</p>
        <p>- 15th July, 2023 - 17th July, 2023.</p>
      </div>

      <p className="mt-4 font-medium text-darkw">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam,...
      </p>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-7 ">
          {questions.map((question, index) => (
            <div className="space-y-6" key={index}>
              <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Title</p>
                <div className=" w-full max-w-[380px]">
                  <FormInput
                    // @ts-ignore
                    register={register}
                    name={`questions.${index}.question`}
                    placeholder="Question"
                    isWhite
                    requiredMessage="This field is required"
                    errorMessage={errors?.questions?.[index]?.question?.message}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Title</p>
                <div className=" w-full max-w-[380px]">
                  <FormSelect
                    // @ts-ignore
                    register={register}
                    name={`questions.${index}.response_type`}
                    placeholder="Answer Type"
                    isWhite
                    required
                    errorMessage={
                      errors?.questions?.[index]?.response_type?.message
                    }
                    onValueChange={(e: SurveyQuestionType) =>
                      handleAnswerTypeChange(index, e)
                    }
                  >
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="single_choice">Single Choice</SelectItem>
                    <SelectItem value="multiple_choice">
                      Multiple Choice
                    </SelectItem>
                  </FormSelect>
                </div>
              </div>

              {(question.response_type === "single_choice" ||
                question.response_type === "multiple_choice") && (
                <div className="flex flex-wrap gap-4 ">
                  {question.options?.map((_, optionIndex) => (
                    <div key={optionIndex} className="mb-2">
                      <FormInput
                        // @ts-ignore
                        register={register}
                        isWhite
                        name={`questions.${index}.options.${optionIndex}`}
                        placeholder={`Option ${optionIndex + 1}`}
                        requiredMessage="This option is required"
                        errorMessage={
                          errors.questions?.[index]?.options?.[optionIndex]
                            ?.message
                        }
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => handleAddOption(index)}
                    className="mb-2"
                  >
                    Add Option
                  </Button>
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() =>
                setValue("questions", [...questions, defaultValues])
              }
              className="mb-4 bg-[#F2994A29] gap-1 text-[#F2994A] hover:bg-[#F2994A29] hover:text-[#F2994A]"
            >
              <Add size={20} /> Add Question
            </Button>
          </div>
          <div className="flex items-center justify-end gap-4 ">
            {/* <Button
              variant="outline-primary"
              className="w-[175px]"
              type="button"
            >
              Save to draft
            </Button> */}
            <Button isLoading={isLoading} className="w-[175px]">
              Publish
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
