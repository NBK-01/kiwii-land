'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Leaf, Share2, Trophy } from 'lucide-react'
import confetti from 'canvas-confetti'

const COMPANIES = [
  { name: 'TechCorp'},
]

const ACHIEVEMENTS = [
  { name: 'First Win', icon: '🏆', description: 'Win your first prize' },
  { name: 'Lucky Streak', icon: '🍀', description: 'Win 3 times in a row' },
  { name: 'Big Spender', icon: '💰', description: 'Scratch 10 cards' },
  { name: 'Level Up', icon: '⬆️', description: 'Reach level 5' },
  { name: 'Share Master', icon: '🔗', description: 'Share 5 times' },
]

export default function KiwiiScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scratchPatternRef = useRef<HTMLCanvasElement>(null)
  const [isScratching, setIsScratching] = useState(false)
  const [isScratched, setIsScratched] = useState(false)
  const [showPrize, setShowPrize] = useState(false)
  const [level, setLevel] = useState(1)
  const [xp, setXp] = useState(0)
  const [sponsor, setSponsor] = useState(COMPANIES[0])
  const [achievements, setAchievements] = useState<string[]>([])
  const [shareCount, setShareCount] = useState(0)

  useEffect(() => {
    resetCard()
    createScratchPattern()
  }, [])

  const createScratchPattern = () => {
    const patternCanvas = scratchPatternRef.current
    if (patternCanvas) {
      const ctx = patternCanvas.getContext('2d')
      if (ctx) {
        ctx.canvas.width = 20
        ctx.canvas.height = 20
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, 20, 20)
        ctx.strokeStyle = '#dddddd'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(20, 20)
        ctx.stroke()
      }
    }
  }

  const resetCard = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx && canvas) {
      ctx.globalCompositeOperation = 'source-over'
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#a8e063')
      gradient.addColorStop(1, '#56ab2f')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw QR code placeholder
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2)
      ctx.fillStyle = '#000000'
      ctx.fillRect(canvas.width / 4 + 20, canvas.height / 4 + 20, canvas.width / 2 - 40, canvas.height / 2 - 40)

      // Draw company logo
      const newSponsor = COMPANIES[Math.floor(Math.random() * COMPANIES.length)]
      setSponsor(newSponsor)
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, canvas.width / 2 - 25, canvas.height / 2 - 25, 50, 50)
      }
    }
    setIsScratched(false)
  }

  const startScratching = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    setIsScratching(true)
  }

  const stopScratching = () => {
    setIsScratching(false)
  }

  const scratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isScratching) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx && canvas) {
      const rect = canvas.getBoundingClientRect()
      let x, y
      if ('touches' in e) {
        const touch = e.touches[0]
        x = touch.clientX - rect.left
        y = touch.clientY - rect.top
      } else {
        x = e.clientX - rect.left
        y = e.clientY - rect.top
      }

      ctx.globalCompositeOperation = 'destination-out'
      const scratchPattern = scratchPatternRef.current
      if (scratchPattern) {
        const pattern = ctx.createPattern(scratchPattern, 'repeat')
        if (pattern) {
          ctx.strokeStyle = pattern
          ctx.lineWidth = 40
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x + 1, y + 1)
          ctx.stroke()
        }
      }

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const scratchedPixels = imageData.data.filter(pixel => pixel === 0).length
      const totalPixels = imageData.data.length
      const scratchedPercentage = (scratchedPixels / totalPixels) * 100

      if (scratchedPercentage > 50 && !isScratched) {
        setIsScratched(true)
        setShowPrize(true)
        addXp(50)
        checkAchievements()
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      }
    }
  }

  const addXp = (amount: number) => {
    const newXp = xp + amount
    if (newXp >= 100) {
      setLevel(prevLevel => {
        const newLevel = prevLevel + 1
        if (newLevel === 5) {
          addAchievement('Level Up')
        }
        return newLevel
      })
      setXp(newXp - 100)
    } else {
      setXp(newXp)
    }
  }

  const checkAchievements = () => {
    if (!achievements.includes('First Win')) {
      addAchievement('First Win')
    }
    // Add more achievement checks here
  }

  const addAchievement = (achievementName: string) => {
    setAchievements(prev => [...prev, achievementName])
  }

  const handleShare = () => {
    // Implement actual sharing logic here
    setShareCount(prev => {
      const newCount = prev + 1
      if (newCount === 5) {
        addAchievement('Share Master')
      }
      return newCount
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex flex-col items-center justify-between p-4">
      <div className="w-full flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Leaf className="w-8 h-8 text-green-600" />
          <h1 className="text-2xl font-bold text-green-700">Kiwii</h1>
        </div>
        <Button onClick={handleShare} variant="outline" size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md gap-4">
        <div className="w-full aspect-square">
          <canvas
            ref={canvasRef}
            width={500}
            height={500}
            onMouseDown={startScratching}
            onMouseMove={scratch}
            onMouseUp={stopScratching}
            onMouseLeave={stopScratching}
            onTouchStart={startScratching}
            onTouchMove={scratch}
            onTouchEnd={stopScratching}
            className="w-full h-full rounded-lg shadow-lg cursor-pointer"
          />
        </div>
        <canvas ref={scratchPatternRef} className="hidden" />
        <p className="text-sm text-gray-600">Scratch to reveal your prize!</p>
      </div>
      <div className="w-full max-w-sm mt-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-green-700">Level {level}</span>
          <span className="text-lg font-bold text-green-700">{xp}/100 XP</span>
        </div>
        <div className="relative mb-4">
          <Progress value={xp} className="w-full h-4 bg-green-200 rounded-full overflow-hidden" />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <span className="text-xs font-bold text-white drop-shadow">{xp}%</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {ACHIEVEMENTS.map(achievement => (
            <div
              key={achievement.name}
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                achievements.includes(achievement.name) ? 'bg-yellow-400' : 'bg-gray-300'
              }`}
              title={`${achievement.name}: ${achievement.description}`}
            >
              {achievement.icon}
            </div>
          ))}
        </div>
      </div>
      <Dialog open={showPrize} onOpenChange={(open) => {
        setShowPrize(open)
        if (!open) resetCard()
      }}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Congratulations!</DialogTitle>
            <DialogDescription>
              <p className="text-xl font-bold text-green-600 mt-4">You have won a prize from {sponsor.name}!</p>
              <p className="text-sm text-gray-600 mt-2">Scan the QR code to claim your reward.</p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">Sponsored by {sponsor.name}</p>
        </DialogContent>
      </Dialog>
    </div>
  )
}
