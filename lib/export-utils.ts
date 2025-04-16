import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import type { ShapeResult } from "./shapes/shape"

export const exportToPDF = async (results: ShapeResult[]) => {
  if (!results || results.length === 0) {
    throw new Error("No results to export")
  }

  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text("Shape Calculator Results", 20, 20)
  doc.setFontSize(12)

  let yPos = 30

  results.forEach((result, index) => {
    // Add a new page if we're running out of space
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }

    doc.setFontSize(14)
    doc.text(`${index + 1}. ${result.shapeName}`, 20, yPos)
    yPos += 10

    doc.setFontSize(12)
    // Parameters
    Object.entries(result.parameters || {}).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 25, yPos)
      yPos += 7
    })

    // Results
    doc.text(`Area: ${result.area.toFixed(2)}`, 25, yPos)
    yPos += 7
    doc.text(`Perimeter: ${result.perimeter.toFixed(2)}`, 25, yPos)
    yPos += 7

    if (result.volume !== undefined) {
      doc.text(`Volume: ${result.volume.toFixed(2)}`, 25, yPos)
      yPos += 7
    }

    if (result.surfaceArea !== undefined) {
      doc.text(`Surface Area: ${result.surfaceArea.toFixed(2)}`, 25, yPos)
      yPos += 7
    }

    yPos += 5
  })

  doc.save("shape-calculator-results.pdf")
  return true
}

export const exportToCSV = async (results: ShapeResult[]) => {
  if (!results || results.length === 0) {
    throw new Error("No results to export")
  }

  // Create CSV header
  let csv = "Shape,Parameters,Area,Perimeter,Volume,Surface Area\n"

  // Add each result as a row
  results.forEach((result) => {
    const parameters = Object.entries(result.parameters || {})
      .map(([key, value]) => `${key}:${value}`)
      .join("; ")

    const row = [
      result.shapeName,
      `"${parameters}"`,
      result.area.toFixed(2),
      result.perimeter.toFixed(2),
      result.volume !== undefined ? result.volume.toFixed(2) : "N/A",
      result.surfaceArea !== undefined ? result.surfaceArea.toFixed(2) : "N/A",
    ]

    csv += row.join(",") + "\n"
  })

  // Create and download the file
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.setAttribute("href", url)
  link.setAttribute("download", "shape-calculator-results.csv")
  link.style.visibility = "hidden"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  return true
}

export const exportToImage = async (element: HTMLElement) => {
  if (!element) {
    throw new Error("No element to export")
  }

  try {
    const canvas = await html2canvas(element)
    const image = canvas.toDataURL("image/png")

    const link = document.createElement("a")
    link.href = image
    link.download = "shape-calculator-result.png"
    link.click()
    return true
  } catch (error) {
    console.error("Error exporting to image:", error)
    throw error
  }
}

