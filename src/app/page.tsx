"use client"
import { Button } from '@/components/ui/button'
import {Toaster, toast} from "sonner"
import Image from 'next/image'

export default function Home() {
  return (
  <>
  <Toaster/>
  <h1 className="text-6xl"> Hello </h1>
  <Button onClick = {() => toast.success("Done Deal")}> Test </Button>

  </>
       )
}
