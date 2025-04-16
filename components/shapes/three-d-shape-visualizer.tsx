"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import type { ShapeResult } from "@/lib/shapes/shape"

interface ThreeDShapeVisualizerProps {
  result: ShapeResult
}

export default function ThreeDShapeVisualizer({ result }: ThreeDShapeVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !result || result.error) return

    // Setup scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf8f9fa)

    // Setup camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 5

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(300, 300)
    containerRef.current.innerHTML = ""
    containerRef.current.appendChild(renderer.domElement)

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    // Create geometry based on shape type
    let geometry: THREE.BufferGeometry
    let material: THREE.Material
    const dimensionLabels: THREE.Mesh[] = []

    const addDimensionLabel = (text: string, position: THREE.Vector3) => {
      const canvas = document.createElement("canvas")
      const context = canvas.getContext("2d")
      if (!context) return

      canvas.width = 128
      canvas.height = 64
      context.fillStyle = "#ffffff"
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.font = "24px Arial"
      context.fillStyle = "#000000"
      context.textAlign = "center"
      context.textBaseline = "middle"
      context.fillText(text, canvas.width / 2, canvas.height / 2)

      const texture = new THREE.CanvasTexture(canvas)
      const labelMaterial = new THREE.SpriteMaterial({ map: texture })
      const sprite = new THREE.Sprite(labelMaterial)
      sprite.position.copy(position)
      sprite.scale.set(1, 0.5, 1)
      scene.add(sprite)
      dimensionLabels.push(sprite)
    }

    switch (result.shapeName) {
      case "Sphere":
        geometry = new THREE.SphereGeometry(result.parameters.radius, 32, 32)
        material = new THREE.MeshStandardMaterial({
          color: 0x6366f1,
          transparent: true,
          opacity: 0.8,
          wireframe: false,
        })
        addDimensionLabel(`r: ${result.parameters.radius}`, new THREE.Vector3(1.5, 0, 0))
        break

      case "Cube":
        geometry = new THREE.BoxGeometry(result.parameters.side, result.parameters.side, result.parameters.side)
        material = new THREE.MeshStandardMaterial({
          color: 0x6366f1,
          transparent: true,
          opacity: 0.8,
        })
        addDimensionLabel(`s: ${result.parameters.side}`, new THREE.Vector3(1.5, 0, 0))
        break

      case "Cylinder":
        geometry = new THREE.CylinderGeometry(
          result.parameters.radius,
          result.parameters.radius,
          result.parameters.height,
          32,
        )
        material = new THREE.MeshStandardMaterial({
          color: 0x6366f1,
          transparent: true,
          opacity: 0.8,
        })
        addDimensionLabel(`r: ${result.parameters.radius}`, new THREE.Vector3(1.5, 0, 0))
        addDimensionLabel(`h: ${result.parameters.height}`, new THREE.Vector3(0, 1.5, 0))
        break

      case "Cone":
        geometry = new THREE.ConeGeometry(result.parameters.radius, result.parameters.height, 32)
        material = new THREE.MeshStandardMaterial({
          color: 0x6366f1,
          transparent: true,
          opacity: 0.8,
        })
        addDimensionLabel(`r: ${result.parameters.radius}`, new THREE.Vector3(1.5, -1, 0))
        addDimensionLabel(`h: ${result.parameters.height}`, new THREE.Vector3(0, 1, 0))
        break

      case "Pyramid":
        // Create a pyramid (square base)
        geometry = new THREE.ConeGeometry(result.parameters.baseLength / Math.sqrt(2), result.parameters.height, 4)
        material = new THREE.MeshStandardMaterial({
          color: 0x6366f1,
          transparent: true,
          opacity: 0.8,
        })
        addDimensionLabel(`b: ${result.parameters.baseLength}`, new THREE.Vector3(1.5, -1, 0))
        addDimensionLabel(`h: ${result.parameters.height}`, new THREE.Vector3(0, 1, 0))
        break

      case "Torus":
        geometry = new THREE.TorusGeometry(result.parameters.majorRadius, result.parameters.minorRadius, 16, 100)
        material = new THREE.MeshStandardMaterial({
          color: 0x6366f1,
          transparent: true,
          opacity: 0.8,
        })
        addDimensionLabel(`R: ${result.parameters.majorRadius}`, new THREE.Vector3(1.5, 0, 0))
        addDimensionLabel(`r: ${result.parameters.minorRadius}`, new THREE.Vector3(0, 1.5, 0))
        break

      case "Ellipsoid":
        // Create an ellipsoid by scaling a sphere
        geometry = new THREE.SphereGeometry(1, 32, 32)
        material = new THREE.MeshStandardMaterial({
          color: 0x6366f1,
          transparent: true,
          opacity: 0.8,
        })
        addDimensionLabel(`rx: ${result.parameters.radiusX}`, new THREE.Vector3(1.5, 0, 0))
        addDimensionLabel(`ry: ${result.parameters.radiusY}`, new THREE.Vector3(0, 1.5, 0))
        addDimensionLabel(`rz: ${result.parameters.radiusZ}`, new THREE.Vector3(0, 0, 1.5))
        break

      case "Prism":
        // Create a simple prism (using a box for visualization)
        const baseSize = Math.sqrt(result.parameters.baseArea)
        geometry = new THREE.BoxGeometry(baseSize, result.parameters.height, baseSize)
        material = new THREE.MeshStandardMaterial({
          color: 0x6366f1,
          transparent: true,
          opacity: 0.8,
        })
        addDimensionLabel(`base: ${result.parameters.baseArea}`, new THREE.Vector3(1.5, 0, 0))
        addDimensionLabel(`h: ${result.parameters.height}`, new THREE.Vector3(0, 1.5, 0))
        break

      default:
        // Fallback to a sphere
        geometry = new THREE.SphereGeometry(1, 32, 32)
        material = new THREE.MeshStandardMaterial({
          color: 0x6366f1,
          transparent: true,
          opacity: 0.8,
        })
    }

    // Create mesh and add to scene
    const mesh = new THREE.Mesh(geometry, material)

    // Scale ellipsoid if needed
    if (result.shapeName === "Ellipsoid") {
      mesh.scale.set(result.parameters.radiusX, result.parameters.radiusY, result.parameters.radiusZ)
    }

    scene.add(mesh)

    // Add wireframe
    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry),
      new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 }),
    )

    // Scale wireframe for ellipsoid if needed
    if (result.shapeName === "Ellipsoid") {
      wireframe.scale.set(result.parameters.radiusX, result.parameters.radiusY, result.parameters.radiusZ)
    }

    scene.add(wireframe)

    // Add axes helper
    const axesHelper = new THREE.AxesHelper(3)
    scene.add(axesHelper)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      scene.remove(mesh)
      scene.remove(wireframe)
      scene.remove(axesHelper)
      dimensionLabels.forEach((label) => scene.remove(label))
      renderer.dispose()
      controls.dispose()
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
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
      <div ref={containerRef} className="border rounded-md" style={{ width: 300, height: 300 }} />
      <p className="text-sm text-muted-foreground mt-2">{result.shapeName} - Drag to rotate</p>
    </div>
  )
}

