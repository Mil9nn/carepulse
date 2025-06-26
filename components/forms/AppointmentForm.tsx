"use client";

import React from "react";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { SelectItem } from "@/components/ui/select";
import SubmitButton from "@/components/SubmitButton";
import { Doctors } from "@/components/forms/constants";
import { useState } from "react";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getAppointmentSchema } from "@/lib/validation";
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.actions";
import { useRouter } from "next/navigation";
import { Appointment } from "@/types/appwrite.types";

export function AppointmentForm({
  userId,
  patientId,
  type,
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
  appointment?: Appointment;
  setOpen?: (open: boolean) => void;
}) {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : '',
      schedule: appointment ? new Date(appointment.schedule) : new Date(),
      reason: appointment ? appointment.reason : "",
      note: appointment ? appointment.note : "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);

    let status;

    switch (type) {
      case "create":
        status = "pending";
        break;
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          note: values.note,
          status: status as Status,
          reason: values.reason!,
        };
        const appointment = await createAppointment(appointmentData);

        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id as string,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: status as Status,
            cancellationReason: values.cancellationReason,
          },
          type,
        }
        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if(updatedAppointment && setOpen) {
            setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  let buttonLabel;

  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "create":
      buttonLabel = "Create Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      status = "";
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        {type==='create' && <section>
          <h2 className="text-2xl font-bold">Hey there👋</h2>
          <p className="text-sm opacity-55 font-extralight">
            Request a new appointment in 10 seconds
          </p>
        </section>}
        {type !== "cancel" && (
          <>
            <section className="space-y-5">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="primaryPhysician"
                label="Doctor"
                placeholder="Select a doctor"
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
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="reason"
                  label="Reason for appointment"
                  placeholder="ex: Annual monthly checkup"
                />
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="note"
                  label="Additional notes (if any)"
                  placeholder="ex: I have a persistent cough"
                />
              </div>
              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="schedule"
                label="Expected appointment date"
                showTimeSelect
                dateFormat="MM/dd/yyyy - hh:mm aa"
              />
            </section>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "bg-red-400" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
}
