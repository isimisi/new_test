
/* eslint-disable no-loop-func */
import { NodeData, TCustomEdge, TCustomNode } from "@customTypes/reducers/workspace";
import { useCallback, useState } from "react";
import * as XLSX from "xlsx";
import { getIncomers, getOutgoers, Node } from "react-flow-renderer";
import { useTranslation } from 'react-i18next';

import { saveAs } from "file-saver";
import { s2ab } from "@helpers/export/handleExport";


const getSheetName = node => {
  const regex = /[^A-Za-z0-9]/g;
  return node.data.displayName
    ? node.data.displayName.substring(0, 30).replace(regex, "")
    : node.data.label.substring(0, 30).replace(regex, "");
};


const useExcelExport = (nodes: TCustomNode[], edges: TCustomEdge[], label: string) => {
  const [loadingExcel, setLoadingExcel] = useState(false);
  const stopLoadingExcel = () => setLoadingExcel(false);
  const startLoadingExcel = () => setLoadingExcel(true);
  const { t } = useTranslation();

  const handleExcel = useCallback(
    () => {
      startLoadingExcel();

      const wb = XLSX.utils.book_new();
      const _nodes = nodes.filter((e): e is Node<NodeData> => "label" in e.data).filter((e) => {
        const checkIfNodeHasText = e.data.label && e.data.label.length > 0 && e.data.displayName && e.data.displayName.length > 0;
        return checkIfNodeHasText;
      });

      const names = _nodes.map(n => getSheetName(n));

      wb.SheetNames = names.filter((c, index) => names.indexOf(c) === index);

      const header = [
        t("workspace.meta.excel.headers.element"),
        t("workspace.meta.excel.headers.relation"),
        t("workspace.meta.excel.headers.value"),
        t("workspace.meta.excel.headers.type")
      ];

      for (let index = 0; index < _nodes.length; index++) {
        const node = _nodes[index];

        // @ts-ignore
        const outgoers = getOutgoers(node, nodes, edges);
        // @ts-ignore
        const incommers = getIncomers(node, nodes, edges);

        const outData = outgoers.map(o => {
          const ot = o as Node<NodeData>;
          const relation = edges.find(x => x.source === node.id && x.target === ot.id);

          return (
            {
              [header[0]]: ot.data.displayName,
              [header[1]]: relation ? (relation.data?.label || '') : "",
              [header[2]]: relation ? (relation.data?.value || '') : "",
              [header[3]]: t("workspace.meta.excel.headers.outgoer")
            });
        });

        const inData = incommers.map(o => {
          const ot = o as Node<NodeData>;
          const relation = edges.find(x => x.source === ot.id && x.target === node.id);

          return (
            {
              [header[0]]: ot.data.displayName,
              [header[1]]: relation ? (relation.data?.label || '') : "",
              [header[2]]: relation ? (relation.data?.value || '') : "",
              [header[3]]: t("workspace.meta.excel.headers.incommer")
            });
        });

        const wsData = [...outData, ...inData];

        const ws = XLSX.utils.json_to_sheet(wsData, { header });

        wb.Sheets[getSheetName(node)] = ws;
      }
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
      saveAs(
        new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
        `${label}.xlsx`
      );
      setTimeout(() => {
        stopLoadingExcel();
      }, 500);
    },
    [nodes.length, edges.length]
  );

  return { handleExcel, loadingExcel };
};

export default useExcelExport;
