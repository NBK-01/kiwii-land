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

        <div className="flex my-auto items-center space-x-6"> 
          <Link href="https://x.com/NBK_dev" target="_blank">
            <Image src="/x-logo.png" className="md:block hidden" width={20} height={20} alt="twitter/x logo"/>
          </Link>
          <Link href="https://github.com/NBK-01" target="_blank">
            <Image src="/git-logo.png" className="md:block hidden" width={20} height={20} alt="twitter/x logo"/>
          </Link>
          <Link href="https://twitter.com/NBK_dev/status/1689000666000236544?s=20" target="_blank"> 
            <Button style={Main.style}> A post on Kiwii </Button>
          </Link>
        </div>
    </div>
  )
}

export default Navbar

