'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { useSpring, animated } from '@react-spring/web'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, Loader, X} from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Toaster, toast } from "sonner"
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
  XIcon
} from 'react-share'
import axios from "axios"

const formSchema = z.object({
  email: z.string().email({message: "Invalid email address"}),
})

export default function KiwiiLandingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isMobile])

  const gradientProps = useSpring({
    from: { opacity: 0.7 },
    to: { opacity: 1 },
    config: { duration: 2000 },
    loop: { reverse: true },
  })

  const bulletPoints = [
    "It's fun!",
    "It's engaging",
    "It's just for you"
  ]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const res = await axios.post("/api/createWaitlist", {
        method: "POST",
        email: JSON.stringify(values.email),
      })
      toast.success("You're in! Expect updates very soon...")
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again.")
    }
    setIsLoading(false)
  }

  const shareUrl = 'https://kiwii.app'
  const title = 'Check out Kiwii - dont miss out on the big reveal'

  const ShareModal = () => (
    <AnimatePresence>
      {isShareModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsShareModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Share Kiwii</h3>
              <button onClick={() => setIsShareModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={48} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={title}>
                <XIcon size={48} round />
              </TwitterShareButton>
              <WhatsappShareButton url={shareUrl} title={title}>
                <WhatsappIcon size={48} round />
              </WhatsappShareButton>
              <EmailShareButton url={shareUrl} subject={title} body="Check out this awesome new app!">
                <EmailIcon size={48} round />
              </EmailShareButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      <Toaster richColors position="top-center"/>
      <ShareModal />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0" />

      <animated.div
        style={gradientProps}
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-300 to-transparent rounded-full filter blur-3xl z-0"
      />
      <animated.div
        style={gradientProps}
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-green-300 to-transparent rounded-full filter blur-3xl z-0"
      />

      <nav className="sticky top-0 z-50 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/">
              <Image src="/kiwi-logo.png" width={65} height={60} alt="Kiwii Logo"/>
            </Link>
            <div className="flex-1" />
            <div className="flex items-center">
            </div>
            <div className="flex-1 flex justify-end">
              <button
                className="text-green-600 hover:text-green-800 transition-colors"
                onClick={() => setIsShareModalOpen(true)}
              >
                <Share2 className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                Something Exciting is Coming Your Way!
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                A daily dose of joy awaits. Be the first to experience it.
              </p>
              <p className="text-lg text-gray-500 mb-6">
                Get ready for a new kind of excitement!
              </p>
              <ul className="space-y-4">
                {bulletPoints.map((point, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2 text-green-500">🥝</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-2xl">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <h2 className="text-3xl font-bold mb-2 text-gray-800">Don&apos;t miss out on the big reveal!</h2>
                  <h1 className="text-sm font-normal mb-6 text-gray-500">Enter your email below to stay updated and secure your spot for early access.</h1>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Enter your email" 
                            disabled={isLoading} 
                            {...field} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit"
                    disabled={isLoading} 
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    {isLoading && (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Join Now
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          {/* Download Links */}
          <div className="flex justify-end gap-4 mt-4">
            <button className="transition-transform hover:scale-105" onClick={() => window.open('https://play.google.com/store/apps/details?id=com.app.kiwiiapp&hl=en&pli=1', '_blank')}>
              <img 
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                alt="Get it on Google Play" 
                className="h-[55px] w-auto"
              />
            </button>
            <button className="transition-transform hover:scale-105" onClick={() => window.open('https://kiwii.shop', '_blank')}>
              <img 
				src="/PWA.svg"
                alt="Get it on Google Play" 
                className="h-[36px] w-auto"
              />
            </button>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Social Icons - Bottom Left */}
            <div className="flex space-x-4">
              <a href="https://www.tiktok.com/@kiwii.app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/kiwii.app/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.snapchat.com/@kiwii.app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors">

<svg className="w-5 h-5" viewBox="2 3.32231558 46 43.33368442"  fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="m24.563 3.344c-.985 0-3.075.152-5.344 1.156-2.27 1.004-4.723 2.918-6.25 6.344-1.153 2.582-.813 6.34-.625 9.344.015.222.02.414.031.625-.094.042-.012.062-.313.062-.453 0-1.058-.148-1.812-.5-.3-.14-.621-.188-.938-.188a3.13 3.13 0 0 0 -1.624.47c-.489.296-.958.757-1.094 1.468-.082.438.011 1.094.437 1.625s1.086.965 2.125 1.375c.227.09.457.176.688.25.469.148 1.02.309 1.437.531.418.223.664.485.75.688.094.218.121.558-.187 1.187a.466.466 0 0 0 -.031.063c-.004.015-.02.027-.032.062-.125.282-2.863 6.25-8.562 7.188a1.444 1.444 0 0 0 -1.219 1.5c.012.215.082.445.156.625.278.652.871 1.133 1.844 1.562.898.399 2.297.75 4.156 1.063.047.129.11.37.188.718 0 .008-.004.024 0 .032.07.324.136.68.25 1.062.113.39.402.774.75.969.347.195.676.219.875.219.414 0 .758-.086 1.125-.157.605-.117 1.336-.25 2.281-.25.523 0 1.07.036 1.625.126.95.156 1.883.773 3 1.562 1.617 1.145 3.559 2.531 6.469 2.531.05 0 .105-.027.156-.031.05.004.105 0 .156 0 .082.004.168.031.25.031 2.91 0 4.848-1.386 6.469-2.531 1.113-.79 2.05-1.406 3-1.563a10.17 10.17 0 0 1 1.625-.124c.914 0 1.637.117 2.313.25.43.085.757.124 1.093.124h.063c.308 0 .664-.085.968-.312a1.67 1.67 0 0 0 .594-.844c.114-.383.176-.75.25-1.093a6.59 6.59 0 0 1 .188-.72c1.86-.312 3.258-.663 4.156-1.062.973-.43 1.566-.914 1.844-1.562.082-.188.144-.41.156-.625a1.45 1.45 0 0 0 -1.219-1.5c-2.875-.473-4.984-2.203-6.406-3.875-1.414-1.664-2.117-3.254-2.156-3.344v-.031a.466.466 0 0 0 -.032-.063c-.312-.629-.312-.965-.218-1.187.086-.203.332-.465.75-.688.418-.222.965-.383 1.437-.531.235-.074.469-.164.688-.25.91-.36 1.535-.734 1.968-1.188.434-.453.633-1.015.626-1.5-.02-1.023-.782-1.703-1.657-2.03l-.031-.032c-.008-.004-.023.004-.031 0a3.004 3.004 0 0 0 -1.125-.219 2.33 2.33 0 0 0 -1.063.219c-.68.32-1.25.477-1.687.5h-.032c-.027 0-.007.004-.03 0-.13-.016-.09-.04-.157-.063.012-.171.02-.324.031-.5v-.125c.192-3.003.528-6.757-.625-9.343-1.527-3.426-3.976-5.371-6.25-6.375a13.437 13.437 0 0 0 -5.343-1.125h-.126zm0 2h.875c.8 0 2.617.125 4.53.968 1.915.844 3.93 2.38 5.25 5.344.75 1.68.63 5.406.438 8.406v.125c-.027.418-.074.825-.093 1.22a.994.994 0 0 0 .312.75c.156.16.813.675 1.906.718h.062c.81-.031 1.657-.277 2.532-.688a.767.767 0 0 1 .219-.03c.125 0 .289.03.375.062.008.004.023-.004.031 0a.61.61 0 0 0 .063.031c.234.082.343.176.374.219.008.008-.003.027 0 .031-.011.02-.023.02-.062.063-.145.152-.543.425-1.281.718a7.974 7.974 0 0 1 -.532.188c-.472.148-1.144.351-1.78.687-.637.336-1.31.832-1.657 1.657-.371.87-.215 1.828.219 2.75.004.015-.004.019 0 .03.015.044.031.067.031.063.09.207.848 1.973 2.469 3.875 1.457 1.711 3.672 3.48 6.625 4.25-.125.082-.04.078-.282.188-.718.316-1.953.656-3.968.968-.57.086-.996.626-1.157 1-.16.376-.242.747-.343 1.22-.047.218-.106.417-.157.624-.136-.011-.25-.011-.5-.062a13.674 13.674 0 0 0 -2.687-.282c-.64 0-1.281.047-1.938.157-1.535.258-2.73 1.117-3.843 1.906-1.625 1.145-3.008 2.156-5.313 2.156-.093 0-.187.004-.281 0a.668.668 0 0 0 -.125 0c-.04.004-.11 0-.156 0-2.305 0-3.696-1.011-5.313-2.156-1.117-.79-2.308-1.652-3.843-1.906a11.706 11.706 0 0 0 -1.938-.157 13.76 13.76 0 0 0 -2.688.282c-.242.047-.332.074-.468.093-.055-.218-.137-.425-.188-.656-.094-.43-.156-.808-.312-1.187a1.913 1.913 0 0 0 -.375-.594c-.188-.2-.465-.36-.781-.406-2.012-.313-3.282-.684-4-1-.25-.11-.157-.102-.282-.188 6.23-1.61 8.942-7.773 9.094-8.125l.031-.062c.004-.012-.004-.016 0-.032.434-.921.59-1.878.219-2.75-.352-.824-1.02-1.32-1.656-1.656-.637-.336-1.278-.539-1.75-.687-.23-.074-.446-.14-.563-.188-.84-.332-1.207-.648-1.312-.781 0 .02-.024-.066.125-.156.164-.098.453-.157.594-.157.078 0 .074.004.062 0 .938.438 1.828.688 2.688.688 1.187 0 1.898-.516 2.093-.719a.993.993 0 0 0 .281-.75c-.023-.437-.066-.883-.093-1.343-.188-3.004-.313-6.727.437-8.407 1.32-2.96 3.309-4.5 5.219-5.344a11.81 11.81 0 0 1 4.563-.968z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/kiwiiapp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://x.com/Kiwiiapp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
            
            {/* Copyright - Center */}
            <div className="flex-1 text-center">
              <p className="text-sm text-gray-500">
               Copyright © {new Date().getFullYear()} KiwiiApp a product by <a href="https://disruptor.ventures" target="_blank" className="text-green-500"> Disruptor Ventures </a> LLC. <br/> All rights reserved.
              </p>
            </div>
            
            {/* Empty space for balance */}
            <div className="w-24"></div>
          </div>
        </div>
      </footer>
    </div>
  )
}
