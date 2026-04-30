// hooks/useDecision.js
import { useState } from "react";
import { DECISION_TREE } from "../data/decisionData";

export function useDecision() {
  const [history, setHistory] = useState([]); // [{ nodeId, chosen }]
  const [currentId, setCurrentId] = useState("start");

  const current = DECISION_TREE[currentId];
  const isResult = !!current?.result;

  function choose(optionIndex) {
    const option = current.options[optionIndex];
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

  return { current, history, choose, back, reset, isResult };
}
