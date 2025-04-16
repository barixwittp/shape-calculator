"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0")
  const [memory, setMemory] = useState<number | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(true)
  const [pendingOperator, setPendingOperator] = useState<string | null>(null)
  const [calculationHistory, setCalculationHistory] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("standard")

  const calculate = (rightOperand: number, pendingOperator: string): number => {
    let newResult = 0

    switch (pendingOperator) {
      case "+":
        newResult = Number.parseFloat(display) + rightOperand
        break
      case "-":
        newResult = Number.parseFloat(display) - rightOperand
        break
      case "×":
        newResult = Number.parseFloat(display) * rightOperand
        break
      case "÷":
        if (rightOperand === 0) {
          setDisplay("Error")
          return 0
        }
        newResult = Number.parseFloat(display) / rightOperand
        break
      case "^":
        newResult = Math.pow(Number.parseFloat(display), rightOperand)
        break
    }

    return newResult
  }

  const digitPressed = (digit: string) => {
    let newDisplay = display

    if ((display === "0" && digit === "0") || display === "Error") {
      return
    }

    if (waitingForOperand) {
      newDisplay = digit
      setWaitingForOperand(false)
    } else {
      newDisplay = display === "0" ? digit : display + digit
    }

    setDisplay(newDisplay)
  }

  const decimalPressed = () => {
    let newDisplay = display

    if (waitingForOperand) {
      newDisplay = "0."
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      newDisplay = display + "."
    }

    setDisplay(newDisplay)
  }

  const operatorPressed = (operator: string) => {
    const operand = Number.parseFloat(display)

    if (pendingOperator !== null && !waitingForOperand) {
      const result = calculate(operand, pendingOperator)
      setDisplay(String(result))
      setCalculationHistory([...calculationHistory, `${display} ${pendingOperator} ${operand} = ${result}`])
    } else {
      setCalculationHistory([...calculationHistory, `${display} ${operator}`])
    }

    setPendingOperator(operator)
    setWaitingForOperand(true)
  }

  const equalsPressed = () => {
    const operand = Number.parseFloat(display)

    if (pendingOperator !== null && !waitingForOperand) {
      const result = calculate(operand, pendingOperator)
      setDisplay(String(result))
      setCalculationHistory([...calculationHistory, `${display} ${pendingOperator} ${operand} = ${result}`])
      setPendingOperator(null)
    }

    setWaitingForOperand(true)
  }

  const clearAll = () => {
    setDisplay("0")
    setWaitingForOperand(true)
    setPendingOperator(null)
  }

  const clearDisplay = () => {
    setDisplay("0")
    setWaitingForOperand(true)
  }

  const backspace = () => {
    if (waitingForOperand) return

    setDisplay(display.length > 1 ? display.substring(0, display.length - 1) : "0")
    if (display.length === 1) setWaitingForOperand(true)
  }

  const changeSign = () => {
    const value = Number.parseFloat(display)
    if (value === 0) return
    setDisplay(String(-value))
  }

  const memoryAdd = () => {
    setMemory((memory || 0) + Number.parseFloat(display))
    setWaitingForOperand(true)
  }

  const memorySubtract = () => {
    setMemory((memory || 0) - Number.parseFloat(display))
    setWaitingForOperand(true)
  }

  const memoryRecall = () => {
    if (memory !== null) {
      setDisplay(String(memory))
      setWaitingForOperand(false)
    }
  }

  const memoryClear = () => {
    setMemory(null)
    setWaitingForOperand(true)
  }

  const scientificFunction = (func: string) => {
    const value = Number.parseFloat(display)
    let result = 0

    switch (func) {
      case "sin":
        result = Math.sin(value)
        break
      case "cos":
        result = Math.cos(value)
        break
      case "tan":
        result = Math.tan(value)
        break
      case "log":
        if (value <= 0) {
          setDisplay("Error")
          return
        }
        result = Math.log10(value)
        break
      case "ln":
        if (value <= 0) {
          setDisplay("Error")
          return
        }
        result = Math.log(value)
        break
      case "sqrt":
        if (value < 0) {
          setDisplay("Error")
          return
        }
        result = Math.sqrt(value)
        break
      case "x^2":
        result = Math.pow(value, 2)
        break
      case "1/x":
        if (value === 0) {
          setDisplay("Error")
          return
        }
        result = 1 / value
        break
      case "pi":
        result = Math.PI
        break
      case "e":
        result = Math.E
        break
    }

    setDisplay(String(result))
    setWaitingForOperand(true)
    setCalculationHistory([...calculationHistory, `${func}(${value}) = ${result}`])
  }

  return (
    <div className="p-4 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-lg">
      <div className="mb-4">
        <Input value={display} readOnly className="text-right text-2xl h-12 font-mono" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="scientific">Scientific</TabsTrigger>
        </TabsList>

        <TabsContent value="standard" className="space-y-2">
          <div className="grid grid-cols-4 gap-2">
            <Button variant="outline" onClick={memoryClear}>
              MC
            </Button>
            <Button variant="outline" onClick={memoryRecall}>
              MR
            </Button>
            <Button variant="outline" onClick={memoryAdd}>
              M+
            </Button>
            <Button variant="outline" onClick={memorySubtract}>
              M-
            </Button>

            <Button variant="outline" onClick={clearAll}>
              C
            </Button>
            <Button variant="outline" onClick={clearDisplay}>
              CE
            </Button>
            <Button variant="outline" onClick={backspace}>
              ⌫
            </Button>
            <Button variant="outline" onClick={() => operatorPressed("÷")}>
              ÷
            </Button>

            <Button onClick={() => digitPressed("7")}>7</Button>
            <Button onClick={() => digitPressed("8")}>8</Button>
            <Button onClick={() => digitPressed("9")}>9</Button>
            <Button variant="outline" onClick={() => operatorPressed("×")}>
              ×
            </Button>

            <Button onClick={() => digitPressed("4")}>4</Button>
            <Button onClick={() => digitPressed("5")}>5</Button>
            <Button onClick={() => digitPressed("6")}>6</Button>
            <Button variant="outline" onClick={() => operatorPressed("-")}>
              -
            </Button>

            <Button onClick={() => digitPressed("1")}>1</Button>
            <Button onClick={() => digitPressed("2")}>2</Button>
            <Button onClick={() => digitPressed("3")}>3</Button>
            <Button variant="outline" onClick={() => operatorPressed("+")}>
              +
            </Button>

            <Button onClick={changeSign}>±</Button>
            <Button onClick={() => digitPressed("0")}>0</Button>
            <Button onClick={decimalPressed}>.</Button>
            <Button variant="default" className="bg-blue-500 hover:bg-blue-600" onClick={equalsPressed}>
              =
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="scientific" className="space-y-2">
          <div className="grid grid-cols-5 gap-2">
            <Button variant="outline" onClick={() => scientificFunction("sin")}>
              sin
            </Button>
            <Button variant="outline" onClick={() => scientificFunction("cos")}>
              cos
            </Button>
            <Button variant="outline" onClick={() => scientificFunction("tan")}>
              tan
            </Button>
            <Button variant="outline" onClick={() => scientificFunction("log")}>
              log
            </Button>
            <Button variant="outline" onClick={() => scientificFunction("ln")}>
              ln
            </Button>

            <Button variant="outline" onClick={() => scientificFunction("sqrt")}>
              √
            </Button>
            <Button variant="outline" onClick={() => scientificFunction("x^2")}>
              x²
            </Button>
            <Button variant="outline" onClick={() => operatorPressed("^")}>
              x^y
            </Button>
            <Button variant="outline" onClick={() => scientificFunction("1/x")}>
              1/x
            </Button>
            <Button variant="outline" onClick={clearAll}>
              C
            </Button>

            <Button variant="outline" onClick={() => scientificFunction("pi")}>
              π
            </Button>
            <Button variant="outline" onClick={() => scientificFunction("e")}>
              e
            </Button>
            <Button variant="outline" onClick={backspace}>
              ⌫
            </Button>
            <Button variant="outline" onClick={() => operatorPressed("÷")}>
              ÷
            </Button>
            <Button variant="outline" onClick={() => operatorPressed("×")}>
              ×
            </Button>

            <Button onClick={() => digitPressed("7")}>7</Button>
            <Button onClick={() => digitPressed("8")}>8</Button>
            <Button onClick={() => digitPressed("9")}>9</Button>
            <Button variant="outline" onClick={() => operatorPressed("-")}>
              -
            </Button>

            <Button onClick={() => digitPressed("4")}>4</Button>
            <Button onClick={() => digitPressed("5")}>5</Button>
            <Button onClick={() => digitPressed("6")}>6</Button>
            <Button variant="outline" onClick={() => operatorPressed("+")}>
              +
            </Button>

            <Button onClick={() => digitPressed("1")}>1</Button>
            <Button onClick={() => digitPressed("2")}>2</Button>
            <Button onClick={() => digitPressed("3")}>3</Button>
            <Button variant="default" className="bg-blue-500 hover:bg-blue-600" onClick={equalsPressed} rowSpan={2}>
              =
            </Button>

            <Button onClick={changeSign}>±</Button>
            <Button onClick={() => digitPressed("0")}>0</Button>
            <Button onClick={decimalPressed}>.</Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-4 border-t pt-2">
        <h4 className="text-sm font-medium mb-2">History</h4>
        <div className="max-h-[100px] overflow-y-auto text-sm">
          {calculationHistory.length === 0 ? (
            <p className="text-muted-foreground">No calculations yet</p>
          ) : (
            calculationHistory.map((calc, index) => (
              <div key={index} className="py-1 border-b last:border-0">
                {calc}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

