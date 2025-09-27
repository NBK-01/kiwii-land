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
              <a href="https://www.snapchat.com/@kiwii.app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors group">
                <img src="/Snap.svg" alt="Snapchat" className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
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
