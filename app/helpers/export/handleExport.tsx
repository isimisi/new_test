/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */

/* eslint-disable new-cap */
/* eslint-disable import/prefer-default-export */

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { createFileName } from "use-react-screenshot";

export const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length); // convert s to arrayBuffer
  const view = new Uint8Array(buf); // create uint8array as viewer
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; // convert to octet
  return buf;
};

const download = (
  _image: string,
  type: "image" | "pdf",
  label: string | null,
  stopLoading?: () => void
) => {
  if (!label) {
    label = "download";
  }

  if (type === "image") {
    const a = document.createElement("a");
    a.href = _image;

    a.download = createFileName("jpg", label);
    a.click();
  } else {
    const doc = new jsPDF({ orientation: "l" });

    const imgProps = doc.getImageProperties(_image);

    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    doc.addImage(_image, "JPEG", 0, 0, pdfWidth, pdfHeight);
    doc.save(`${label}.pdf`);
  }
  stopLoading && stopLoading();
};

export const handleExport = (
  type: "image" | "pdf",
  target: React.MutableRefObject<any>,
  label: string | null,
  stopLoading?: () => void
) => {
  const currTarget: HTMLElement = target?.current;
  if (currTarget) {
    html2canvas(currTarget).then((canvas) => {
      const base64Image = canvas.toDataURL("image/jpeg", 1.0);
      download(base64Image, type, label, stopLoading);
    });
  }
};
