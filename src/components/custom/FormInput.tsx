/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
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

import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { ReactNode, useState } from "react";
import { Input, InputProps } from "../ui/input";

type FormInputProps<TFormValues extends FieldValues = FieldValues> = {
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
  register?: UseFormRegister<TFormValues>;
  label?: string;
  placeholder?: string;
  rightElement?: ReactNode;
  leftElement?: ReactNode;
  isWhite?: boolean;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
  errorMessage?: string | undefined;
  requiredMessage?: string;
} & Omit<InputProps, "name">;

const FormInput = <TFormValues extends Record<string, unknown>>({
  control,
  label,
  name,
  register,
  placeholder,
  rightElement,
  leftElement,
  errors,
  isWhite,
  errorMessage,
  requiredMessage,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const error_message = lodash.get(errors, name) || errorMessage;
  const hasError = (!!errors || errorMessage) && error_message;

  const [show, setShow] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  if (register)
    return (
      <FormField
        {...register(name, { required: requiredMessage })}
        render={({ field }) => (
          <FormItem>
            <div className="relative ">
              {leftElement && (
                <div className="absolute top-0 w-10 bg-[#F5F5f5] flex items-center h-full px-4 rounded-l-[20px] ">
                  {leftElement}
                </div>
              )}

              {showLabel && (
                <p
                  className={`absolute h-full text-[11px] font-normal top-1 left-4 ${
                    hasError ? "text-red-500" : "text-primary"
                  }`}
                >
                  {label}
                </p>
              )}

              <FormControl>
                {/* @ts-ignore */}
                <Input
                  onFocus={() => setShowLabel(true)}
                  onBlurCapture={() => setShowLabel(false)}
                  // onBlur={() => setShowLabel(false)}
                  className={` text-base text-text focus-visible:ring-0 focus-visible:ring-primary border-none focus:border-none focus-visible:ring-offset-0 rounded-[20px] h-[50px] placeholder:text-base placeholder:text-subtle_text/30 placeholder:font-medium
                 ${isWhite ? "bg-white" : "bg-[#F5F5F5]"}                 
                ${leftElement ? "pl-12" : "pl-[18px]"}  ${
                    rightElement ? "pr-12" : "pr-[18px]"
                  } ${showLabel ? "pt-4" : ""}`}
                  placeholder={placeholder}
                  type={
                    props?.type === "password"
                      ? show
                        ? "text"
                        : "password"
                      : props?.type
                  }
                  {...field}
                />
              </FormControl>
              {(rightElement || props.type === "password") && (
                <div className="absolute rounded-r-[20px] bg-[#f5f5f5] top-0 flex items-center h-full pr-4 pl-1 right-0 ">
                  {props.type === "password" ? (
                    <p
                      className="cursor-pointer text-subtle_text"
                      onClick={() => setShow((prev) => !prev)}
                    >
                      {show ? "Hide" : "Show"}
                    </p>
                  ) : (
                    rightElement
                  )}
                </div>
              )}
            </div>
            {hasError && (
              <FormMessage className="px-4 text-[11px] font-normal">
                {error_message.message}
              </FormMessage>
            )}
          </FormItem>
        )}
      />
    );
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="relative ">
            {leftElement && (
              <div className="absolute top-0 w-10 bg-[#F5F5f5] flex items-center h-full px-4 rounded-l-[20px] ">
                {leftElement}
              </div>
            )}

            {showLabel && (
              <p
                className={`absolute h-full text-[11px] font-normal top-1 left-4 ${
                  hasError ? "text-red-500" : "text-primary"
                }`}
              >
                {label}
              </p>
            )}

            <FormControl>
              {/* @ts-ignore */}
              <Input
                onFocus={() => setShowLabel(true)}
                onBlurCapture={() => setShowLabel(false)}
                // onBlur={() => setShowLabel(false)}
                className={` text-base text-text focus-visible:ring-0 focus-visible:ring-primary border-none focus:border-none focus-visible:ring-offset-0 rounded-[20px] h-[50px] placeholder:text-base placeholder:text-subtle_text/30 placeholder:font-medium
                 ${isWhite ? "bg-white" : "bg-[#F5F5F5]"}                 
                ${leftElement ? "pl-12" : "pl-[18px]"}  ${
                  rightElement ? "pr-12" : "pr-[18px]"
                } ${showLabel ? "pt-4" : ""}`}
                placeholder={placeholder}
                type={
                  props?.type === "password"
                    ? show
                      ? "text"
                      : "password"
                    : props?.type
                }
                {...field}
              />
            </FormControl>
            {(rightElement || props.type === "password") && (
              <div className="absolute rounded-r-[20px] bg-[#f5f5f5] top-0 flex items-center h-full pr-4 pl-1 right-0 ">
                {props.type === "password" ? (
                  <p
                    className="cursor-pointer text-subtle_text"
                    onClick={() => setShow((prev) => !prev)}
                  >
                    {show ? "Hide" : "Show"}
                  </p>
                ) : (
                  rightElement
                )}
              </div>
            )}
          </div>
          {hasError && (
            <FormMessage className="px-4 text-[11px] font-normal">
              {error_message.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};

export default FormInput;
