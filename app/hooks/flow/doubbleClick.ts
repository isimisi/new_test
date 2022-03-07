import { useState } from "react";
import { Node } from "react-flow-renderer";

const useDoubbleClick = () => {
  const [nodeTextTarget, setNodeTextTarget] = useState<HTMLElement | null>(null);
  const [nodeTarget, setNodeTarget] = useState<Node | null>(null);

  const addNodeTextTarget = (target: HTMLElement) => {
    setNodeTextTarget(target);
  };

  const removeNodeTextTarget = () => {
    if (nodeTextTarget) {
      nodeTextTarget.classList.remove("nodrag");
      nodeTextTarget.classList.remove("textCursor");
      nodeTextTarget.blur();
      nodeTextTarget.removeAttribute("contentEditable");
      setNodeTextTarget(null);
      setNodeTarget(null);
    }
  };

  const putCursorAtTheEnd = (target) => {
    if (typeof window.getSelection !== "undefined"
    && typeof document.createRange !== "undefined") {
      const range = document.createRange();
      range.selectNodeContents(target);
      range.collapse(false);
      const sel = window.getSelection() as Selection;
      sel.removeAllRanges();
      sel.addRange(range);
      // @ts-ignore
    } else if (typeof document.body.createTextRange !== "undefined") {
      // @ts-ignore
      const textRange = document.body.createTextRange();
      textRange.moveToElementText(target);
      textRange.collapse(false);
      textRange.select();
    }
  };

  const onNodeDoubleClick = (event: React.MouseEvent<Element, globalThis.MouseEvent>, node: Node<any>) => {
    const target = event.target as HTMLElement;
    const ifDivtarget = target.querySelector("#nodeLabel");
    if (node.id !== nodeTarget?.id) {
      removeNodeTextTarget();


      if (target.nodeName === "H6" || ifDivtarget?.nodeName === "H6") {
        const actualTarget = target.nodeName === "H6" ? target : ifDivtarget as HTMLElement;
        setNodeTextTarget(actualTarget);
        setNodeTarget(node);
        actualTarget.setAttribute("contentEditable", "true");
        actualTarget.classList.add("nodrag");
        actualTarget.classList.add("textCursor");
        actualTarget.focus();
        putCursorAtTheEnd(actualTarget);
      }
    }
  };

  return { nodeTextTarget,
    addNodeTextTarget,
    removeNodeTextTarget,
    onNodeDoubleClick
  };
};

export default useDoubbleClick;
