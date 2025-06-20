import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import Image from "next/image";
import { Checkbox } from "./checkbox";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./select";

import 'react-phone-number-input/style.css'
import ReactDatePicker from "react-datepicker";
import PhoneInput from "react-phone-number-input";
import { E164Number } from 'libphonenumber-js';

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType?: FormFieldType;
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
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
          <textarea
            placeholder={placeholder}
            {...field}
            className="shadcn-textarea"
            disabled={props.disabled}
          ></textarea>
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
            <label 
              htmlFor={props.name} 
              className="shad-checkbox-label"
            >
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <FormControl>
          <ReactDatePicker>
            showTimeSelect={props.showTimeSelect}
            selected={field.value}
            onChange={(date: Date) => field.onChange(date)}
            timeInputLabel={"Time:"}
            dateFormat={props.dateFormat || "yyy/MM/dd"}
            wrapperClassName={"date-picker"}
          </ReactDatePicker>
        </FormControl>
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
            className="phone-input"
          />
        </FormControl>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
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

const CustomFormField = (props: CustomProps) => {
  const { control, name, label, fieldType } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {fieldType !== FormFieldType.CHECKBOX && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {/* RenderInput component comes here */}
            <RenderInput field={field} props={props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
