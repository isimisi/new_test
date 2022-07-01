export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const getElementBounds = (el: HTMLElement): BoundingBox => {
  const rect = el.getBoundingClientRect();
  return {
    x: window.pageXOffset + rect.left,
    y: window.pageYOffset + rect.top,
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
};

export const getSplitElement = (text: any, otherColor = "#73B1FF", auto = false) => {
  const splitElContainer = document.createElement("div");
  splitElContainer.style.height = "8px";
  splitElContainer.style.width = "82%";
  splitElContainer.style.display = "flex";
  splitElContainer.style.position = "relative";
  splitElContainer.style.alignItems = "center";
  splitElContainer.className = auto ? "auto_splitting_element" : "splitting_element";
  splitElContainer.style.borderTop = "4px dashed " + otherColor;

  const splitTextContainer = document.createElement("div");
  splitTextContainer.style.position = "absolute";
  splitTextContainer.style.right = "1px";
  splitTextContainer.style.top = "1px";
  splitTextContainer.style.padding = "5px";
  splitTextContainer.style.position = "absolute";
  splitTextContainer.style.right = "-110px";
  splitTextContainer.style.top = "-14px";
  splitTextContainer.style.backgroundColor = otherColor;
  splitTextContainer.style.borderRadius = "6px";
  splitTextContainer.className = "splitting_element_innerDiv";

  const splitText = document.createElement("p");
  splitText.innerText = text;
  splitText.style.width = "100%";
  splitText.style.color = "white";
  splitText.style.margin = "auto";
  splitText.style.fontSize = "10px";
  splitText.className = "splitting_element_innerText";

  splitTextContainer.appendChild(splitText);

  splitElContainer.appendChild(splitTextContainer);
  return splitElContainer;
};

export const traverseParentsUntilUniqueSplit = (el, currEmail) => {
  const splitTest = currEmail?.split(el.outerHTML);

  if (splitTest?.length === 2) {
    return el.outerHTML;
  }
  return traverseParentsUntilUniqueSplit(el.parentElement, currEmail);
};

export const elementFilter = el => {
  let childOfHtmlDiv = false;
  for (let p = el && el.parentElement; p; p = p.parentElement) {
    if (p.id === "elementPickerContainer") {
      childOfHtmlDiv = true;
    }
  }

  return childOfHtmlDiv;
};
