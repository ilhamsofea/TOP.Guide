// hooks/useDecision.js
import { useState } from "react";
import { TREE } from "../data/decisionData";

export function useDecision() {
  const [history, setHistory] = useState([]);
  const [currentId, setCurrentId] = useState("start");

  const current = TREE[currentId];
  const isResult = !!current?.result;
  const isChecklist = !!current?.checklist;
  const isShariahChecklist = !!current?.shariah_checklist;

  // optionIndex: number for normal nodes, or {text, next} object for checklist
  function choose(optionIndex) {
    const option =
      typeof optionIndex === "object"
        ? optionIndex
        : current.options[optionIndex];
    setHistory((prev) => [...prev, { nodeId: currentId, chosen: option.text }]);
    setCurrentId(option.next);
  }

  function back() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentId(prev.nodeId);
  }

  function reset() {
    setHistory([]);
    setCurrentId("start");
  }

  return { current, history, choose, back, reset, isResult, isChecklist, isShariahChecklist};
}
