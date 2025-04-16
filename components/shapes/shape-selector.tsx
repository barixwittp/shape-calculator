"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CircleForm from "@/components/shapes/circle-form"
import RectangleForm from "@/components/shapes/rectangle-form"
import SquareForm from "@/components/shapes/square-form"
import TriangleForm from "@/components/shapes/triangle-form"
import EllipseForm from "@/components/shapes/ellipse-form"
import RegularPolygonForm from "@/components/shapes/regular-polygon-form"
import TrapezoidForm from "@/components/shapes/trapezoid-form"
import RhombusForm from "@/components/shapes/rhombus-form"
import ParallelogramForm from "@/components/shapes/parallelogram-form"
import SectorForm from "@/components/shapes/sector-form"
import SphereForm from "@/components/shapes/sphere-form"
import CubeForm from "@/components/shapes/cube-form"
import CylinderForm from "@/components/shapes/cylinder-form"
import ConeForm from "@/components/shapes/cone-form"
import PyramidForm from "@/components/shapes/pyramid-form"
import TorusForm from "@/components/shapes/torus-form"
import EllipsoidForm from "@/components/shapes/ellipsoid-form"
import PrismForm from "@/components/shapes/prism-form"
import type { Shape } from "@/lib/shapes/shape"

interface ShapeSelectorProps {
  searchQuery: string
  activeTab: string
  onCalculate: (shape: Shape) => void
}

export default function ShapeSelector({ searchQuery, activeTab, onCalculate }: ShapeSelectorProps) {
  const [selected2DShape, setSelected2DShape] = useState("circle")
  const [selected3DShape, setSelected3DShape] = useState("sphere")

  const shapes2D = [
    { id: "circle", name: "Circle" },
    { id: "ellipse", name: "Ellipse" },
    { id: "square", name: "Square" },
    { id: "rectangle", name: "Rectangle" },
    { id: "triangle", name: "Triangle" },
    { id: "regular-polygon", name: "Regular Polygon" },
    { id: "trapezoid", name: "Trapezoid" },
    { id: "rhombus", name: "Rhombus" },
    { id: "parallelogram", name: "Parallelogram" },
    { id: "sector", name: "Sector" },
  ]

  const shapes3D = [
    { id: "sphere", name: "Sphere" },
    { id: "cube", name: "Cube" },
    { id: "cylinder", name: "Cylinder" },
    { id: "cone", name: "Cone" },
    { id: "pyramid", name: "Pyramid" },
    { id: "torus", name: "Torus" },
    { id: "ellipsoid", name: "Ellipsoid" },
    { id: "prism", name: "Prism" },
  ]

  const filtered2DShapes = shapes2D.filter((shape) => shape.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const filtered3DShapes = shapes3D.filter((shape) => shape.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6">
      {activeTab === "2d" ? (
        <>
          <Select value={selected2DShape} onValueChange={setSelected2DShape}>
            <SelectTrigger className="w-full bg-white dark:bg-slate-800">
              <SelectValue placeholder="Select a 2D shape" />
            </SelectTrigger>
            <SelectContent>
              {filtered2DShapes.map((shape) => (
                <SelectItem key={shape.id} value={shape.id}>
                  {shape.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="mt-4 p-4 border rounded-md bg-white dark:bg-slate-800">
            {selected2DShape === "circle" && <CircleForm onCalculate={onCalculate} />}
            {selected2DShape === "ellipse" && <EllipseForm onCalculate={onCalculate} />}
            {selected2DShape === "rectangle" && <RectangleForm onCalculate={onCalculate} />}
            {selected2DShape === "square" && <SquareForm onCalculate={onCalculate} />}
            {selected2DShape === "triangle" && <TriangleForm onCalculate={onCalculate} />}
            {selected2DShape === "regular-polygon" && <RegularPolygonForm onCalculate={onCalculate} />}
            {selected2DShape === "trapezoid" && <TrapezoidForm onCalculate={onCalculate} />}
            {selected2DShape === "rhombus" && <RhombusForm onCalculate={onCalculate} />}
            {selected2DShape === "parallelogram" && <ParallelogramForm onCalculate={onCalculate} />}
            {selected2DShape === "sector" && <SectorForm onCalculate={onCalculate} />}
          </div>
        </>
      ) : (
        <>
          <Select value={selected3DShape} onValueChange={setSelected3DShape}>
            <SelectTrigger className="w-full bg-white dark:bg-slate-800">
              <SelectValue placeholder="Select a 3D shape" />
            </SelectTrigger>
            <SelectContent>
              {filtered3DShapes.map((shape) => (
                <SelectItem key={shape.id} value={shape.id}>
                  {shape.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="mt-4 p-4 border rounded-md bg-white dark:bg-slate-800">
            {selected3DShape === "sphere" && <SphereForm onCalculate={onCalculate} />}
            {selected3DShape === "cube" && <CubeForm onCalculate={onCalculate} />}
            {selected3DShape === "cylinder" && <CylinderForm onCalculate={onCalculate} />}
            {selected3DShape === "cone" && <ConeForm onCalculate={onCalculate} />}
            {selected3DShape === "pyramid" && <PyramidForm onCalculate={onCalculate} />}
            {selected3DShape === "torus" && <TorusForm onCalculate={onCalculate} />}
            {selected3DShape === "ellipsoid" && <EllipsoidForm onCalculate={onCalculate} />}
            {selected3DShape === "prism" && <PrismForm onCalculate={onCalculate} />}
          </div>
        </>
      )}
    </div>
  )
}

