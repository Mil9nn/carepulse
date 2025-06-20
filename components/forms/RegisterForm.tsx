"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { RegisterFormValidation } from "@/lib/validation";
import CustomFormField, { FormFieldType } from "../ui/CustomFormField";
import { SelectItem } from "../ui/select";
import SubmitButton from "../ui/SubmitButton";

export function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterFormValidation>>({
    resolver: zodResolver(RegisterFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof RegisterFormValidation>) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold">Welcome👋</h2>
          <p className="text-sm opacity-55 font-extralight">
            Let us know more about yourself
          </p>
        </section>
        <section className="space-y-5 mb-12">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user icon"
          />
          <div className="flex items-center justify-between gap-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email address"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="user icon"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="phone"
              label="Phone number"
              placeholder="+1234567890"
              iconSrc="/assets/icons/arrow.svg"
              iconAlt="phone icon"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="dateOfBirth"
              label="Date of birth"
              placeholder="Select your birth date"
              iconSrc="/assets/icons/calendar.svg"
              iconAlt="calendar icon"
            />
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="gender"
              label="Gender"
              placeholder="Select your gender"
            >
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </CustomFormField>
          </div>
          <div className="flex items-center justify-between gap-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="ex: 14 street, New york, NY-5101"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder="Software Engineer"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyPhoneNumber"
              label="Emergency phone number"
              placeholder="ex: +1234567890"
              iconSrc="/assets/icons/arrow.svg"
              iconAlt="phone icon"
            />
          </div>
        </section>

        {/* Medical History Form Section */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold">Medical Information</h2>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Primary care physician"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user icon"
          />
          <div className="flex items-center justify-between gap-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance provider"
              placeholder="ex: ABC Health"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance policy number"
              placeholder="ex: ABC4567890"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies"
              placeholder="ex: Penicillin, Nuts"
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedications"
              label="Current medications"
              placeholder="ex: Aspirin, Metformin, Levothyroxine 50mcg"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="Family medical history (if relevant)"
              placeholder="ex: Mother had breast cancer"
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="ex: Asthma diagnosis in childhood"
              iconSrc="/assets/icons/arrow.svg"
              iconAlt="phone icon"
            />
          </div>
        </section>
        <section className="space-y-5">
          <h2 className="text-2xl font-bold">Identification and Verification</h2>
          <div>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="identificationType"
              label="Identification type"
            >
                <SelectItem value="birthCertificate">Birth Certificate</SelectItem>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="nationalId">National ID</SelectItem>
                <SelectItem value="other">Other</SelectItem>
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="identificationNumber"
              label="Identification number"
              placeholder="ex: 1234567890"
            />
          </div>
        </section>
        <section className="space-y-5">
            <h2 className="text-2xl font-bold">Consent and Privacy</h2>
            <div className="space-y-2">
                <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="consentToTreatment"
              label="I consent to receive treatment for my health condition."
              placeholder="ex: 1234567890"
            />
            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="consentToPrivacyPolicy"
              label="I acknowledge that I have read and understood the privacy policy."
              placeholder="ex: 1234567890"
            />
            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="confirmInformationAccuracy"
              label="I confirm that the information I have provided is accurate and complete to the best of my knowledge."
              placeholder="ex: 1234567890"
            />
            </div>
        </section>
        <SubmitButton isLoading={false}>Submit</SubmitButton>
      </form>
    </Form>
  );
}
