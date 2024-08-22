import React from "react";
import * as lodash from "lodash";
import {
  Control,
  DeepMap,
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectProps } from "@radix-ui/react-select";

type FormInputProps<TFormValues extends FieldValues = FieldValues> = {
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  register?: UseFormRegister<TFormValues>;
  placeholder?: string;
  description?: string;
  isWhite?: boolean;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
  errorMessage?: string | undefined;
  requiredMessage?: string;
} & Omit<SelectProps, "name">;

const FormSelect = React.forwardRef(
  <TFormValues extends Record<string, unknown>>(
    {
      control,
      label,
      name,
      placeholder,
      errors,
      description,
      children,
      errorMessage,
      isWhite,
      register,
      requiredMessage,
      ...props
    }: FormInputProps<TFormValues>,
    ref: React.Ref<HTMLDivElement>
  ): JSX.Element => {
    const error_message = lodash.get(errors, name) || errorMessage;
    const hasError = !!errors && error_message;

    if (register)
      return (
        <FormField
          {...register(name, { required: requiredMessage })}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>{label}</FormLabel>
              <p className="text-[12px] text-dark -tracking-[0.28px]">
                {description}
              </p>
              <FormControl>
                <Select {...field} onValueChange={props.onValueChange}>
                  <SelectTrigger
                    className={`focus-visible:ring-1 bg-[#C4C4C41F] ${
                      isWhite ? "bg-white" : ""
                    } ${
                      hasError
                        ? "focus-visible:ring-red-500"
                        : "focus-visible:ring-primary"
                    } focus-visible:ring-offset-1 h-12 rounded-full px-4`}
                    {...props}
                    ref={ref}
                  >
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>{children}</SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>{label}</FormLabel>
            <p className="text-[12px] text-dark -tracking-[0.28px]">
              {description}
            </p>
            <FormControl>
              <Select {...field} onValueChange={(e) => field.onChange(e)}>
                <SelectTrigger
                  className={`focus-visible:ring-1 bg-[#C4C4C41F] ${
                    isWhite ? "bg-white" : ""
                  } ${
                    hasError
                      ? "focus-visible:ring-red-500"
                      : "focus-visible:ring-primary"
                  } focus-visible:ring-offset-1 h-12 rounded-full px-4`}
                  {...props}
                  ref={ref}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>{children}</SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

export default FormSelect;
