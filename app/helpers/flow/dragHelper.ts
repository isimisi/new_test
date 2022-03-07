export const onDragStartNode = (event, zoom) => {
  const drag_icon = document.createElement("div");

  drag_icon.style.position = "absolute";
  drag_icon.style.top = "-300px";
  drag_icon.style.right = "0px";
  drag_icon.style.width = `${25 * zoom}px`;
  drag_icon.style.height = `${40 * zoom}px`;
  // drag_icon.style.backgroundColor = "white";
  drag_icon.style.borderRadius = "8px";
  drag_icon.style.border = "1px solid #73B1FF";
  drag_icon.style.opacity = "0.99999";

  document.body.appendChild(drag_icon);

  const dt = event.dataTransfer;

  dt.setDragImage(drag_icon, 0, 0);

  dt.setData("application/reactflow", "custom");
  dt.effectAllowed = "move";
};

export const onDragStartNote = (event, zoom) => {
  const drag_icon = document.createElement("div");
  const header = document.createElement("div");
  const body = document.createElement("div");
  drag_icon.appendChild(header);
  drag_icon.appendChild(body);

  header.style.backgroundColor = "#f1f1f1";
  header.style.width = "100%";
  header.style.height = `${20 * zoom}px`;
  header.style.borderTopLeftRadius = `${5 * zoom}px`;
  header.style.borderTopRightRadius = `${5 * zoom}px`;
  header.style.opacity = "0.99999";

  body.style.backgroundColor = "#fdfdfd";
  body.style.width = "100%";
  body.style.height = "100%";
  body.style.borderBottomLeftRadius = `${5 * zoom}px`;
  body.style.borderBottomRightRadius = `${5 * zoom}px`;
  body.style.opacity = "0.99999";

  drag_icon.style.position = "absolute";
  drag_icon.style.top = "-300px";
  drag_icon.style.right = "0px";
  drag_icon.style.width = `${100 * zoom}px`;
  drag_icon.style.height = `${45 * zoom}px`;
  drag_icon.style.borderRadius = `${5 * zoom}px`;
  drag_icon.style.border = "2px solid #f1f1f1";
  drag_icon.style.opacity = "0.99999";

  document.body.appendChild(drag_icon);

  const dt = event.dataTransfer;

  dt.setDragImage(drag_icon, 0, 0);

  dt.setData("application/reactflow", "sticky");
  dt.effectAllowed = "move";
};

export const onDragStartStep = (event, zoom) => {
  const drag_icon = document.createElement("div");
  const number = document.createElement("p");

  drag_icon.appendChild(number);

  number.innerHTML = "1";
  number.style.fontSize = `${10 * zoom}px`;
  number.style.textAlign = "center";
  number.style.marginTop = `${5 * zoom}px`;

  drag_icon.style.position = "absolute";
  drag_icon.style.top = "-300px";
  drag_icon.style.right = "0px";
  drag_icon.style.width = `${20 * zoom}px`;
  drag_icon.style.height = `${20 * zoom}px`;
  drag_icon.style.borderRadius = `100%`;
  drag_icon.style.backgroundColor = "#fdfdfd";
  drag_icon.style.border = "1px solid #f1f1f1";
  drag_icon.style.opacity = "0.99999";
  drag_icon.style.display = "flex";
  drag_icon.style.justifyContent = "center";
  drag_icon.style.alignItems = "center";

  document.body.appendChild(drag_icon);

  const dt = event.dataTransfer;

  dt.setDragImage(drag_icon, 0, 0);

  dt.setData("application/reactflow", "input");
  dt.effectAllowed = "move";
};
