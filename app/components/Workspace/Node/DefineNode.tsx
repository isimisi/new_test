import React from "react";

import Loader from "@components/Loading/LongLoader";
import WorkspaceNodeForm from "./WorkspaceNodeForm";
import FloatingPanel from "../../Panel/FloatingPanel";
import { RGBA, SelectChoice, SelectOptions } from "@customTypes/data";
import { ColorResult } from "react-color";
import { FlowElement } from "react-flow-renderer";
import { List } from "immutable";
import { AttributeDropdown } from "@customTypes/reducers/attribute";
interface Props {
  open: boolean;
  close: () => void;
  nodes: any;
  nodeLabel: string;
  handleChangeLabel: (label: SelectChoice) => void;
  attributes: any;
  handleChangeAttributes: (attr: any, newRow: any, isNew: boolean) => void;
  nodeColor: RGBA;
  handleChangeColor: (color: ColorResult) => void;
  nodeBorderColor: RGBA;
  handleBorderColorChange: (color: ColorResult) => void;
  handleNodeSave: () => void;
  nodeDisplayName: string;
  handleDisplayNameChange: (event: any) => void;
  isUpdatingElement: boolean;
  elementToUpdate: FlowElement | null;
  handleDeleteNode: () => void;
  loading: boolean;
  attributesDropDownOptions: List<AttributeDropdown>;
  handleRemoveAttributes: (id: any, index: number) => void;
  nodeFigur: string | null;
  handleNodeFigurChange: (figur: SelectOptions) => void;
  nodeLabelColor: RGBA;
  handleLabelColorChange: (color: ColorResult) => void;
}

function DefineNode(props: Props) {
  const {
    open,
    close,
    nodes,
    nodeLabel,
    handleChangeLabel,
    attributes,
    handleChangeAttributes,
    nodeColor,
    handleChangeColor,
    nodeBorderColor,
    handleBorderColorChange,
    handleNodeSave,
    nodeDisplayName,
    handleDisplayNameChange,
    isUpdatingElement,
    elementToUpdate,
    handleDeleteNode,
    loading,
    attributesDropDownOptions,
    handleRemoveAttributes,
    nodeFigur,
    handleNodeFigurChange,
    nodeLabelColor,
    handleLabelColorChange
  } = props;

  return (
    <div>
      <FloatingPanel
        expanded
        openForm={open}
        closeForm={close}
        title={isUpdatingElement ? "Ændre dit element" : "Definer dit element"}
      >
        {loading ? (
          <Loader />
        ) : (
          <WorkspaceNodeForm
            nodes={nodes}
            close={close}
            nodeLabel={nodeLabel}
            handleChangeLabel={handleChangeLabel}
            attributes={attributes}
            handleChangeAttributes={handleChangeAttributes}
            nodeColor={nodeColor}
            handleChangeColor={handleChangeColor}
            nodeBorderColor={nodeBorderColor}
            handleBorderColorChange={handleBorderColorChange}
            handleNodeSave={handleNodeSave}
            nodeDisplayName={nodeDisplayName}
            isUpdatingElement={isUpdatingElement}
            elementToUpdate={elementToUpdate}
            handleDisplayNameChange={handleDisplayNameChange}
            handleDeleteNode={handleDeleteNode}
            attributesDropDownOptions={attributesDropDownOptions}
            handleRemoveAttributes={handleRemoveAttributes}
            nodeFigur={nodeFigur}
            handleNodeFigurChange={handleNodeFigurChange}
            nodeLabelColor={nodeLabelColor}
            handleLabelColorChange={handleLabelColorChange}
          />
        )}
      </FloatingPanel>
    </div>
  );
}

export default DefineNode;
