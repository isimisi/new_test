import React, { useState } from "react";
import { Node, Edge } from "react-flow-renderer";
import { List } from "immutable";
import CreatableSelect from "react-select/creatable";
import { selectStyles } from "@api/ui/helper";

import ReactDOM from "react-dom";
import { WorkspaceRelationship } from "@customTypes/reducers/workspace";


const useDoubbleClick = (
  saveNode: (name: string) => void,
  saveEdge: (name: string, edgeTextTarget: HTMLElement, edgeTextActualTarget: SVGElement) => void,
  relationships: List<WorkspaceRelationship>,
  handleHideEdgePopper: (stopReffrence?: boolean) => void,
  handleHideNodePopper: (stopReffrence?: boolean) => void,
) => {
  const [nodeTextTarget, setNodeTextTarget] = useState<HTMLElement | null>(null);
  const [nodeTarget, setNodeTarget] = useState<Node | null>(null);

  const [edgeTextTarget, setEdgeTextTarget] = useState<HTMLElement | null>(null);
  const [edgeTextActualTarget, setEdgeTextActualTarget] = useState<SVGElement | null>(null);
  const [edgeTarget, setEdgeTarget] = useState<Edge | null>(null);

  const addNodeTextTarget = (target: HTMLElement) => {
    setNodeTextTarget(target);
  };

  const addEdgeTextTarget = (target: HTMLElement) => {
    setEdgeTextTarget(target);
  };

  const removeEdgeTextTarget = () => {
    if (edgeTextTarget && edgeTextActualTarget) {
      saveEdge(edgeTextTarget.innerText, edgeTextTarget, edgeTextActualTarget);

      setEdgeTextTarget(null);
      setEdgeTarget(null);
    }
  };


  const removeNodeTextTarget = () => {
    if (nodeTextTarget) {
      saveNode(nodeTextTarget.innerText);
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
    handleHideNodePopper();
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

  const onEdgeDoubleClick = (event: React.MouseEvent<Element, globalThis.MouseEvent>, edge: Edge<any>) => {
    handleHideEdgePopper(true);
    setEdgeTarget(edge);

    const target = event.target as SVGElement;
    const actualTarget = target.nextElementSibling as SVGElement;
    // @ts-ignore
    const targetParent = target.parentElement as SVGElement;

    const relationship = relationships.toJS().find(r => r.label === edge.data.label);

    if (actualTarget.tagName === "text") {
      const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', "foreignObject");
      foreignObject.classList.add("react-flow__edge-textwrapper", "nodrag");
      foreignObject.style.overflow = "visible";

      foreignObject.style.display = "flex";

      foreignObject.style.width = "150px";

      if (relationship.use_suggestions === 0) {
        const input = document.createElement("div");
        input.setAttribute("contentEditable", "true");
        input.classList.add("nodrag");
        input.classList.add("textCursor");
        input.innerHTML = actualTarget.textContent || "";
        input.style.backgroundColor = "white";
        input.style.fontSize = "10px";
        input.style.display = "inline-table";
        input.style.textAlign = "center";
        foreignObject.appendChild(input);
        setEdgeTextTarget(input);
        setEdgeTextActualTarget(actualTarget);
        targetParent.appendChild(foreignObject);
        actualTarget.style.display = "none";
        input.focus();
        putCursorAtTheEnd(input);
      } else {
        const select = React.createElement(CreatableSelect, {
          options: relationship.values.map((r) => ({ value: r, label: r })),
          value: { value: actualTarget.textContent, label: actualTarget.textContent },
          isClearable: true,
          className: "nodrag",

          styles: { ...selectStyles(),
            singleValue: (provided) => ({
              ...provided,
              fontSize: 10,

            }),
            indicatorsContainer: (provided) => ({
              ...provided,
              padding: 0,
              "> div": {
                padding: 2,
                "> svg": {
                  height: 10,
                  width: 10
                }
              }
            }),
            control: (provided) => ({
              ...provided,
              minHeight: 20
            }),
            valueContainer: (provided) => ({
              ...provided,
              padding: "0px 8px"
            }),
            input: (provided) => ({
              ...provided,
              padding: "0px",
              fontSize: "10px"
            }),
            option: (provided) => ({
              ...provided,
              fontSize: "10px",
              padding: "2px 12px"
            })
          },
        });


        const divContainer = document.createElement("div");
        divContainer.style.width = "100px";
        console.log(divContainer);
        // eslint-disable-next-line react/no-render-return-value
        ReactDOM.render(select, divContainer);

        foreignObject.style.transform = "translate(-33px, 0px)";
        foreignObject.appendChild(divContainer);

        targetParent.appendChild(foreignObject);
        actualTarget.style.display = "none";
      }
    }
  };


  return { nodeTextTarget,
    addNodeTextTarget,
    removeNodeTextTarget,
    onNodeDoubleClick,
    onEdgeDoubleClick,
    edgeTarget,
    addEdgeTextTarget,
    removeEdgeTextTarget
  };
};

export default useDoubbleClick;
