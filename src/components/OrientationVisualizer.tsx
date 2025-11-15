import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface OrientationVisualizerProps {
  angle?: number
  isAnimating?: boolean
}

export function OrientationVisualizer({ angle = 45, isAnimating = false }: OrientationVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = 60

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = 'oklch(0.88 0.01 250)'
    ctx.lineWidth = 2
    ctx.stroke()

    for (let i = 0; i < 8; i++) {
      const tickAngle = (i * Math.PI) / 4
      const startX = centerX + Math.cos(tickAngle) * (radius - 10)
      const startY = centerY + Math.sin(tickAngle) * (radius - 10)
      const endX = centerX + Math.cos(tickAngle) * radius
      const endY = centerY + Math.sin(tickAngle) * radius
      
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
      ctx.strokeStyle = 'oklch(0.88 0.01 250)'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    const angleRad = (angle * Math.PI) / 180
    const arrowLength = radius - 5
    const endX = centerX + Math.cos(angleRad - Math.PI / 2) * arrowLength
    const endY = centerY + Math.sin(angleRad - Math.PI / 2) * arrowLength

    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(endX, endY)
    ctx.strokeStyle = 'oklch(0.70 0.20 25)'
    ctx.lineWidth = 3
    ctx.stroke()

    const arrowHeadLength = 12
    const arrowAngle = Math.PI / 6
    const angle1 = angleRad - Math.PI / 2 + Math.PI - arrowAngle
    const angle2 = angleRad - Math.PI / 2 + Math.PI + arrowAngle
    
    ctx.beginPath()
    ctx.moveTo(endX, endY)
    ctx.lineTo(
      endX + Math.cos(angle1) * arrowHeadLength,
      endY + Math.sin(angle1) * arrowHeadLength
    )
    ctx.moveTo(endX, endY)
    ctx.lineTo(
      endX + Math.cos(angle2) * arrowHeadLength,
      endY + Math.sin(angle2) * arrowHeadLength
    )
    ctx.strokeStyle = 'oklch(0.70 0.20 25)'
    ctx.lineWidth = 3
    ctx.stroke()

  }, [angle])

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        animate={isAnimating ? { rotate: [0, 360] } : {}}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <canvas
          ref={canvasRef}
          width={200}
          height={200}
          className="rounded-lg"
        />
      </motion.div>
      
      <div className="px-4 py-2 bg-card rounded-lg border">
        <span className="text-sm font-medium">
          Orientación: <span className="mono text-accent">{angle}°</span>
        </span>
      </div>
    </div>
  )
}