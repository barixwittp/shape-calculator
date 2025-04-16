import type { ShapeResult } from "./shapes/shape"

const HISTORY_KEY = "shape-calculator-history"
const SAVED_KEY = "shape-calculator-saved"

export const saveToHistory = (result: ShapeResult) => {
  if (!result || result.error) return

  try {
    const history = getHistory()
    history.unshift(result)

    // Limit history to 20 items
    const limitedHistory = history.slice(0, 20)

    localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory))
  } catch (error) {
    console.error("Error saving to history:", error)
  }
}

export const getHistory = (): ShapeResult[] => {
  try {
    const historyJson = localStorage.getItem(HISTORY_KEY)
    return historyJson ? JSON.parse(historyJson) : []
  } catch (error) {
    console.error("Error getting history:", error)
    return []
  }
}

export const saveResult = (result: ShapeResult): ShapeResult[] => {
  if (!result || result.error) return getSavedResults()

  try {
    const savedResults = getSavedResults()
    const updatedResults = [...savedResults, result]
    localStorage.setItem(SAVED_KEY, JSON.stringify(updatedResults))
    return updatedResults
  } catch (error) {
    console.error("Error saving result:", error)
    return getSavedResults()
  }
}

export const getSavedResults = (): ShapeResult[] => {
  try {
    const savedJson = localStorage.getItem(SAVED_KEY)
    return savedJson ? JSON.parse(savedJson) : []
  } catch (error) {
    console.error("Error getting saved results:", error)
    return []
  }
}

export const deleteSavedResult = (id: string): ShapeResult[] => {
  try {
    const savedResults = getSavedResults()
    const updatedResults = savedResults.filter((result) => result.id !== id)
    localStorage.setItem(SAVED_KEY, JSON.stringify(updatedResults))
    return updatedResults
  } catch (error) {
    console.error("Error deleting saved result:", error)
    return getSavedResults()
  }
}

export const clearSavedResults = (): ShapeResult[] => {
  try {
    localStorage.removeItem(SAVED_KEY)
    return []
  } catch (error) {
    console.error("Error clearing saved results:", error)
    return getSavedResults()
  }
}

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY)
}

