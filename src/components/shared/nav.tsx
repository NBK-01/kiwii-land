import Image from 'next/image'
import React from 'react'
import {Sub, Main} from "@/lib/fonts"
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { Button } from '../ui/button'

const Navbar = () => {
  return (
    <div className="container flex flex-row justify-between pt-10 border-b border-neutral-300"> 
        <div className="flex flex-row">
          <Image src="/kiwi-logo.png" width={65} height={65} alt="Kiwii Logo"/>
          <h1 style={Main.style} className="text-xl font-bold m-auto ml-2"> Kiwii </h1>  
        </div>

    </div>
  )
}

export default Navbar

