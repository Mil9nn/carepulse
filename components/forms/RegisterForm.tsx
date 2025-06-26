"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";

import { PatientFormValidation } from "@/lib/validation";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { SelectItem } from "../ui/select";
import SubmitButton from "../SubmitButton";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/components/forms/constants";
import Image from "next/image";
import FileUploader from "../ui/fileUploader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerPatient } from "@/lib/actions/patient.actions";

type PatientFormValues = z.infer<typeof PatientFormValidation>;

export function RegisterForm({ user }: { user: User }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
    },
  });

  async function onSubmit(values: PatientFormValues) {
    setIsLoading(true);

    let formData;

    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };

      // @ts-expect-error wow
      const patient = await registerPatient(patientData);

      if (patient) router.push(`/patients/${user.$id}/new-appointment`);
    } catch (error) {
      console.error("Error registering patient:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 pb-10">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-4">
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

          {/* BirthDate & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-4">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of birth"
            />
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={() => (
                <FormControl>
                  <RadioGroup className="flex items-center">
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem
                          className="radio-item"
                          value={option}
                          id={option}
                        />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-4">
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
              name="emergencyContactNumber"
              label="Emergency contact number"
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
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary physician"
            placeholder="Select a physician"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user icon"
          >
            {Doctors.map((doctor, index) => (
              <SelectItem key={index} value={doctor.name}>
                <div className="flex items-center gap-2">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={26}
                    height={26}
                    className="rounded-full"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-4">
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
              name="currentMedication"
              label="Current medications"
              placeholder="ex: Aspirin, Metformin, Levothyroxine 50mcg"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-4">
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
          <h2 className="text-2xl font-bold">
            Identification and Verification
          </h2>
          <div className="space-y-5">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="identificationType"
              label="Identification type"
            >
              {IdentificationTypes.map((type, index) => (
                <SelectItem key={index} value={type}>
                  {type}
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="identificationNumber"
              label="Identification number"
              placeholder="ex: 1234567890"
            />
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="identificationDocument"
              label="Scanned copy of identification document"
              renderSkeleton={(field) => (
                <FormControl>
                  <FileUploader files={field.value as File[]} onChange={field.onChange} />
                </FormControl>
              )}
            ></CustomFormField>
          </div>
        </section>
        <section className="space-y-5">
          <h2 className="text-2xl font-bold">Consent and Privacy</h2>
          <div className="space-y-2">
            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="treatmentConsent"
              label="I consent to receive treatment for my health condition."
              placeholder="ex: 1234567890"
            />
            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="disclosureConsent"
              label="I consent to the use and disclosure of my health information for treatment purposes."
              placeholder="ex: 1234567890"
            />
            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="privacyConsent"
              label="I acknowledge that I have read and understood the privacy policy."
              placeholder="ex: 1234567890"
            />
          </div>
        </section>
        <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
      </form>
    </Form>
  );
}
