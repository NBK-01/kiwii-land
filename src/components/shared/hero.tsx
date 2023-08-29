import { Main, Sub } from '@/lib/fonts'
import React from 'react'
import Image from 'next/image'
import { WaitlistForm } from "@/components/shared/forms"
import { Badge } from '../ui/badge'


const Hero = () => {
  return (
    <>
    <div className="container">
      <div className="flex flex-col md:py-44 py-20">
        <Badge className="mx-auto my-3 text-sm" variant="secondary"> Beta under construction 👨🏻‍🔬</Badge>
        <h1 style={Main.style} className="lg:text-5xl text-xl mx-auto text-center leading-tight font-medium">
           One easy platform to handle your <br/> productized-service agency
        </h1>
        <p className="text-sm text-neutral-400 mx-auto max-w-2xl text-center mt-5" style={Sub.style}>
            Control your subscription based agency all in one dashboard, give your clients their own dashboards too for a smooth & async workflow for everyone
        </p>
        <div className="mx-auto items-center">
          <WaitlistForm/>
        </div>
      </div> 
    </div>

    <Image src="/grad-kiwii.png" className="absolute top-[455px] mx-auto -z-10 hidden lg:block" width={2000} height={1200} alt=""/>
    </>
  )
}

export default Hero
