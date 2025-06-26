import { z } from "zod";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, ControllerRenderProps, FieldValues } from "react-hook-form";
import Image from "next/image";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "react-datepicker/dist/react-datepicker.css";
import { E164Number } from "libphonenumber-js";
import DatePicker from "react-datepicker";
import { Textarea } from "./ui/textarea";
import { PatientFormValidation } from "@/lib/validation";

import type { Path } from "react-hook-form";

type PatientFormValues = z.infer<typeof PatientFormValidation>;

interface CustomProps<T extends FieldValues = PatientFormValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: ControllerRenderProps<T, Path<T>>) => React.ReactNode;
  fieldType?: FormFieldType;
}

const RenderInput = <T extends FieldValues>({
  field,
  props,
}: {
  field: ControllerRenderProps<T, Path<T>>;
  props: CustomProps<T>;
}) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="relative flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={25}
              height={25}
              className="shadcn-input-icon"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shadcn-input"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="shadcn-textarea"
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="shad-checkbox-container">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              className="shad-checkbox"
              disabled={props.disabled}
            />
            <label htmlFor={props.name} className="shad-checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex items-center rounded-md border p-1 border-dark-400 bg-dark-200">
          <Image
            src="/assets/icons/calendar.svg"
            alt="calendar icon"
            width={25}
            height={25}
            className="mx-1"
          />
          <DatePicker
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
            showTimeSelect={props.showTimeSelect ?? false}
            timeInputLabel="Time:"
            className="outline-2 outline-dark-500 bg-dark-200 text-white rounded-md px-5 ml-2 py-1 w-full"
          />
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
          />
        </FormControl>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <div className="bg-dark-400 px-2 py-1 rounded-md">
                  <SelectValue placeholder={props.placeholder} />
                </div>
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
  }
};

export enum FormFieldType {
  INPUT = "input",
  SELECT = "select",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datepicker",
  PHONE_INPUT = "phoneinput",
  SKELETON = "skeleton",
}

const CustomFormField = <T extends FieldValues>(props: CustomProps<T>) => {
  const { control, name, label, fieldType } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {fieldType !== FormFieldType.CHECKBOX && (
            <FormLabel>{label}</FormLabel>
          )}
          <FormControl>
            {/* RenderInput component comes here */}
            <RenderInput field={field} props={props} />
          </FormControl>
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
