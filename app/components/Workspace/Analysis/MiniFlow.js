/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/prop-types */
import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import ReactFlow, {
  ConnectionMode,
  ReactFlowProvider,
  Controls,
  ControlButton,
} from "react-flow-renderer";
import { CustomNode, CustomEdge } from "@components";
import { useScreenshot, createFileName } from "use-react-screenshot";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

const nodeTypes = { custom: CustomNode };

const MiniFlow = forwardRef((props, ref) => {
  const { elements, html } = props;

  const reactFlowContainer = useRef(null);
  const [rfInstance, setRfInstance] = useState(null);

  const [hover, setHover] = useState(false);
  const [image, takeScreenShot] = useScreenshot();
  const [dontDownload, setDontDownload] = useState(false);

  const onLoad = (_reactFlowInstance) => {
    setRfInstance(_reactFlowInstance);
    _reactFlowInstance.fitView();
  };

  useEffect(() => {
    if (rfInstance) {
      rfInstance.fitView();
    }
  }, [elements, rfInstance]);

  useEffect(() => {
    if (image && !dontDownload) {
      const a = document.createElement("a");
      a.href = image;

      a.download = createFileName("jpg", "4");
      a.click();
    }
  }, [image, dontDownload]);

  useImperativeHandle(ref, () => ({ handleImage, image, html }), [image]);

  const handleImage = () => {
    setDontDownload(true);
    takeScreenShot(reactFlowContainer?.current);
  };

  return (
    <ReactFlowProvider>
      <ReactFlow
        ref={reactFlowContainer}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        elements={elements}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        panOnScroll={false}
        zoomOnDoubleClick={false}
        selectNodesOnDrag={false}
        paneMoveable={false}
        minZoom={0.3}
        maxZoom={2}
        nodeTypes={nodeTypes}
        onLoad={onLoad}
        edgeTypes={{ custom: CustomEdge }}
        connectionMode={ConnectionMode.Loose}
      >
        {hover && (
          <Controls showZoom={false}>
            <ControlButton
              onClick={() => {
                takeScreenShot(reactFlowContainer?.current);
              }}
            >
              <PhotoCameraIcon />
            </ControlButton>
          </Controls>
        )}
      </ReactFlow>
    </ReactFlowProvider>
  );
});

export default MiniFlow;
