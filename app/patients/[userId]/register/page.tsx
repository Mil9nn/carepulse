import { RegisterForm } from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import React from 'react'

const Register = async ({ params }: { params: Promise<{userId: string}> }) => {
  const { userId } = await params;
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">

      <section className="remove-scrollbar container overflow-y-scroll">
        <div className="sub-container max-w-[600px]">
          <Image 
            src="/assets/icons/logo-full.svg"
            alt="Logo"
            width={1000}
            height={1000}
            className="w-fit h-10 mb-5"
          />
          <RegisterForm user={user} />
        </div>
      </section>

      <Image
        src='/assets/images/register-img.png'
        alt='patient onboarding'
        width={1000}
        height={1000}
        className="hidden xl:block w-full h-full object-cover"
      />
    </div>
  )
}

export default Register
