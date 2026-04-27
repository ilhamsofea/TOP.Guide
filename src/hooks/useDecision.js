import { useState } from 'react'
import { DECISION_STEPS } from '../data/decisionData'

export function useDecision() {
  const [history, setHistory] = useState([])
  const [currentKey, setCurrentKey] = useState('start')

  const current = DECISION_STEPS[currentKey]

  function choose(optionIndex) {
    const option = current.options[optionIndex]
    setHistory(prev => [...prev, { key: currentKey, chosen: option.text }])
    setCurrentKey(option.next)
  }

  function back() {
    if (history.length === 0) return
    const prev = history[history.length - 1]
    setHistory(h => h.slice(0, -1))
    setCurrentKey(prev.key)
  }

  function reset() {
    setHistory([])
    setCurrentKey('start')
  }

  const stepNumber = history.length + 1
  const isResult = Boolean(current?.result)

  return { current, currentKey, history, choose, back, reset, stepNumber, isResult }
}