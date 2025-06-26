import { PatientForm } from "@/components/forms/PatientForm";
import PassKeyModal from "@/components/PassKeyModal";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: { searchParams: Promise<{admin?: string}> } ) {
  const { admin } = await searchParams;
  const isAdmin = admin === 'true';
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PassKeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image 
            src="/assets/icons/logo-full.svg"
            alt="Logo"
            width={1000}
            height={1000}
            className="w-fit h-10"
          />
          
          <PatientForm />

          <div className="text-14-regular flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">&copy; 2024 CarePulse . All rights reserved.</p>
            <Link href='/?admin=true' className="text-green-500">Admin</Link>
          </div>
        </div>
      </section>

      <Image
        src='/assets/images/onboarding-img.png'
        alt='patient onboarding'
        width={1000}
        height={1000}
        className="hidden xl:block w-full h-full object-cover"
      />
    </div>
  );
}
