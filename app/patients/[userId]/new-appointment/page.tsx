import Image from "next/image";
import { getPatient } from "@/lib/actions/patient.actions";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import Link from "next/link";

const NewAppointment = async ({ params }: { params: Promise<{userId: string}> }) => {
  const { userId } = await params;
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container overflow-y-scroll h-full my-auto">
        <div className="sub-container max-w-[600px]">
          <Link href='/'>
            <Image
            src="/assets/icons/logo-full.svg"
            alt="Logo"
            width={1000}
            height={1000}
            className="w-fit h-10"
          />
          </Link>
          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
           />
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        alt="patient onboarding"
        width={1000}
        height={1000}
        className="hidden xl:block w-full h-full object-cover"
      />
    </div>
  );
};

export default NewAppointment
