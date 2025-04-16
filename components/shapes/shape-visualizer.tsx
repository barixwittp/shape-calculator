"use client"

import { useEffect, useRef } from "react"
import type { ShapeResult } from "@/lib/shapes/shape"

interface ShapeVisualizerProps {
  result: ShapeResult
}

export default function ShapeVisualizer({ result }: ShapeVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !result || result.error) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set canvas dimensions
    canvas.width = 300
    canvas.height = 300

    // Center point
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Check if we're in dark mode
    const isDarkMode = document.documentElement.classList.contains("dark")

    // Draw shape based on type
    ctx.fillStyle = isDarkMode ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"
    ctx.strokeStyle = isDarkMode ? "rgb(129, 140, 248)" : "rgb(99, 102, 241)"
    ctx.lineWidth = 2

    // Text color based on theme
    const textColor = isDarkMode ? "#e2e8f0" : "#1e293b"

    switch (result.shapeName) {
      case "Circle":
        const radius = Math.min(centerX, centerY) * 0.8
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        // Add radius line
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(centerX + radius, centerY)
        ctx.stroke()

        // Add radius label
        ctx.fillStyle = textColor
        ctx.font = "14px Arial"
        ctx.fillText(`r: ${result.parameters.radius}`, centerX + radius / 2 - 10, centerY - 10)
        break

      case "Rectangle":
        const width = Math.min(canvas.width * 0.8, result.parameters.width * 50)
        const height = Math.min(canvas.height * 0.8, result.parameters.length * 50)
        ctx.beginPath()
        ctx.rect(centerX - width / 2, centerY - height / 2, width, height)
        ctx.fill()
        ctx.stroke()

        // Add labels
        ctx.fillStyle = textColor
        ctx.font = "14px Arial"
        ctx.fillText(`w: ${result.parameters.width}`, centerX - 15, centerY + height / 2 + 20)
        ctx.fillText(`l: ${result.parameters.length}`, centerX + width / 2 + 10, centerY)
        break

      case "Square":
        const side = Math.min(canvas.width * 0.8, canvas.height * 0.8)
        ctx.beginPath()
        ctx.rect(centerX - side / 2, centerY - side / 2, side, side)
        ctx.fill()
        ctx.stroke()

        // Add label
        ctx.fillStyle = textColor
        ctx.font = "14px Arial"
        ctx.fillText(`s: ${result.parameters.side}`, centerX - 15, centerY + side / 2 + 20)
        break

      case "Triangle":
        // Scale triangle to fit canvas
        const maxSide = Math.max(result.parameters.sideA, result.parameters.sideB, result.parameters.sideC)
        const scale = (Math.min(canvas.width, canvas.height) * 0.4) / maxSide

        // Use law of cosines to calculate angles
        const a = result.parameters.sideA * scale
        const b = result.parameters.sideB * scale
        const c = result.parameters.sideC * scale

        const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c))

        // Calculate coordinates
        const x1 = centerX
        const y1 = centerY - c / 2
        const x2 = x1 + b * Math.cos(Math.PI / 2 - angleA)
        const y2 = y1 + b * Math.sin(Math.PI / 2 - angleA)
        const x3 = x1 - c / 2
        const y3 = centerY + c / 2

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.lineTo(x3, y3)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // Add labels
        ctx.fillStyle = textColor
        ctx.font = "12px Arial"
        ctx.fillText(`a: ${result.parameters.sideA}`, (x1 + x2) / 2, (y1 + y2) / 2 - 5)
        ctx.fillText(`b: ${result.parameters.sideB}`, (x2 + x3) / 2, (y2 + y3) / 2 + 15)
        ctx.fillText(`c: ${result.parameters.sideC}`, (x1 + x3) / 2 - 25, (y1 + y3) / 2)
        break

      case "Ellipse":
        const radiusX = Math.min(centerX * 0.8, result.parameters.radiusX * 30)
        const radiusY = Math.min(centerY * 0.8, result.parameters.radiusY * 30)
        ctx.beginPath()
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        // Add radius lines
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(centerX + radiusX, centerY)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(centerX, centerY - radiusY)
        ctx.stroke()

        // Add labels
        ctx.fillStyle = textColor
        ctx.font = "14px Arial"
        ctx.fillText(`rx: ${result.parameters.radiusX}`, centerX + radiusX / 2, centerY - 10)
        ctx.fillText(`ry: ${result.parameters.radiusY}`, centerX + 10, centerY - radiusY / 2)
        break

      case "RegularPolygon":
        const polygonRadius = Math.min(centerX, centerY) * 0.8
        const sides = result.parameters.sides

        ctx.beginPath()
        for (let i = 0; i < sides; i++) {
          const angle = (i * 2 * Math.PI) / sides - Math.PI / 2
          const x = centerX + polygonRadius * Math.cos(angle)
          const y = centerY + polygonRadius * Math.sin(angle)

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // Add label
        ctx.fillStyle = textColor
        ctx.font = "14px Arial"
        ctx.fillText(`sides: ${sides}`, centerX - 25, centerY - polygonRadius - 10)
        ctx.fillText(`side length: ${result.parameters.sideLength}`, centerX - 45, centerY + polygonRadius + 20)
        break

      case "Trapezoid":
        const topWidth = Math.min(canvas.width * 0.6, result.parameters.topWidth * 40)
        const bottomWidth = Math.min(canvas.width * 0.8, result.parameters.bottomWidth * 40)
        const trapHeight = Math.min(canvas.height * 0.6, result.parameters.height * 40)

        ctx.beginPath()
        ctx.moveTo(centerX - bottomWidth / 2, centerY + trapHeight / 2)
        ctx.lineTo(centerX + bottomWidth / 2, centerY + trapHeight / 2)
        ctx.lineTo(centerX + topWidth / 2, centerY - trapHeight / 2)
        ctx.lineTo(centerX - topWidth / 2, centerY - trapHeight / 2)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // Add labels
        ctx.fillStyle = textColor
        ctx.font = "12px Arial"
        ctx.fillText(`a: ${result.parameters.topWidth}`, centerX - 15, centerY - trapHeight / 2 - 10)
        ctx.fillText(`b: ${result.parameters.bottomWidth}`, centerX - 15, centerY + trapHeight / 2 + 20)
        ctx.fillText(`h: ${result.parameters.height}`, centerX + bottomWidth / 2 + 10, centerY)
        break

      case "Rhombus":
        const rhombusWidth = Math.min(canvas.width * 0.7, result.parameters.diagonal1 * 30)
        const rhombusHeight = Math.min(canvas.height * 0.7, result.parameters.diagonal2 * 30)

        ctx.beginPath()
        ctx.moveTo(centerX, centerY - rhombusHeight / 2)
        ctx.lineTo(centerX + rhombusWidth / 2, centerY)
        ctx.lineTo(centerX, centerY + rhombusHeight / 2)
        ctx.lineTo(centerX - rhombusWidth / 2, centerY)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // Add labels
        ctx.fillStyle = textColor
        ctx.font = "12px Arial"
        ctx.fillText(`d1: ${result.parameters.diagonal1}`, centerX + 5, centerY)
        ctx.fillText(`d2: ${result.parameters.diagonal2}`, centerX - 25, centerY - rhombusHeight / 2 - 5)
        break

      case "Parallelogram":
        const pWidth = Math.min(canvas.width * 0.7, result.parameters.base * 30)
        const pHeight = Math.min(canvas.height * 0.5, result.parameters.height * 30)
        const offset = pWidth * 0.3

        ctx.beginPath()
        ctx.moveTo(centerX - pWidth / 2 + offset, centerY - pHeight / 2)
        ctx.lineTo(centerX + pWidth / 2 + offset, centerY - pHeight / 2)
        ctx.lineTo(centerX + pWidth / 2 - offset, centerY + pHeight / 2)
        ctx.lineTo(centerX - pWidth / 2 - offset, centerY + pHeight / 2)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // Add labels
        ctx.fillStyle = textColor
        ctx.font = "12px Arial"
        ctx.fillText(`b: ${result.parameters.base}`, centerX, centerY + pHeight / 2 + 15)
        ctx.fillText(`h: ${result.parameters.height}`, centerX - pWidth / 2 - 25, centerY)
        break

      case "Sector":
        const sectorRadius = Math.min(centerX, centerY) * 0.8
        const startAngle = 0
        const endAngle = result.parameters.angle * (Math.PI / 180)

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, sectorRadius, startAngle, endAngle)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // Add labels
        ctx.fillStyle = textColor
        ctx.font = "12px Arial"
        ctx.fillText(`r: ${result.parameters.radius}`, centerX + sectorRadius / 2, centerY - 10)
        ctx.fillText(`θ: ${result.parameters.angle}°`, centerX + sectorRadius / 2, centerY + 20)
        break

      default:
        // Draw a placeholder or message
        ctx.fillStyle = textColor
        ctx.font = "16px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Shape visualization not available", centerX, centerY)
    }
  }, [result])

  if (!result || result.error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No shape to visualize</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <canvas ref={canvasRef} width={300} height={300} className="border rounded-md bg-white dark:bg-slate-900" />
      <p className="text-sm text-muted-foreground mt-2">{result.shapeName}</p>
    </div>
  )
}

