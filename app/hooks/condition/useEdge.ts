import { User } from "@auth0/auth0-react";
import { TCustomEdge } from "@customTypes/reducers/conditions";
import { nonValueArray } from "@pages/Conditions/constants";
import {
  addRelationshipToList,
  postEdge,
  putEdge,
} from "@pages/Conditions/reducers/conditionActions";
import { AppDispatch } from "@redux/configureStore";
import { useCallback, useState } from "react";
import { Connection } from "react-flow-renderer";

const useEdge = (dispatch: AppDispatch, user: User, relationships: any, id: string) => {
  const [isUpdatingEdge, setIsUpdatingEdge] = useState(false);
  const [edgeToUpdate, setEdgeToUpdate] = useState<TCustomEdge | null>(null);

  const [defineEdgeOpen, setDefineEdgeOpen] = useState(false);
  const [currentConnectionData, setCurrentConnectionData] = useState<Connection>({
    source: "",
    target: "",
    sourceHandle: "",
    targetHandle: "",
  });
  const [relationshipLabel, setRelationshipLabel] = useState("");
  const [relationshipType, setRelationshipType] = useState("custom");
  const [comparisonType, setComparisonType] = useState("exists");
  const [comparisonValue, setComparisonValue] = useState("");

  const closeEdge = useCallback(() => {
    setDefineEdgeOpen(false);
    setIsUpdatingEdge(false);
    setRelationshipLabel("");
    setRelationshipType("custom");
    setComparisonType("exists");
    setComparisonValue("");
  }, []);

  const handleRelationshipSave = () => {
    const choosenRelationship = relationships.find((r) => r.label === relationshipLabel);

    if (isUpdatingEdge && edgeToUpdate) {
      dispatch(
        putEdge(
          user,
          edgeToUpdate.id,
          choosenRelationship.id,
          choosenRelationship.label,
          comparisonType,
          comparisonValue,
          relationshipType,
          closeEdge
        )
      );
    } else {
      const edge = {
        relationship_id: choosenRelationship.id,
        relationshipLabel: choosenRelationship.label,
        relationshipType,
        comparisonType,
        comparisonValue,
        ...currentConnectionData,
      };

      dispatch(postEdge(user, id, edge, closeEdge));
    }
  };

  const onEdgeClick = (event, element) => {
    setIsUpdatingEdge(true);
    setEdgeToUpdate(element);

    setRelationshipLabel(element.data.label);
    setRelationshipType(element.type);
    setComparisonType(element.data.comparison_type);
    setComparisonValue(element.data.comparison_value);
    setDefineEdgeOpen(true);
  };

  const handleChangeLabelEdge = (_label) => {
    if (_label.__isNew__) {
      dispatch(
        addRelationshipToList({
          id: null,
          label: _label.value,
          description: null,
          values: [],
          style: '{"color": {"a": 1, "b": 0, "g": 0, "r": 0}',
        })
      );
    }
    setRelationshipLabel(_label.value);
  };

  const handleTypeChange = (_type) => setRelationshipType(_type.value);

  const handleComparisonTypeChange = (v) => {
    if (nonValueArray.includes(v)) {
      setComparisonValue("");
    }
    setComparisonType(v);
  };

  const handleComparisonValueChange = (v) => setComparisonValue(v);

  const onConnect = (data) => {
    if (data.source !== data.target) {
      setCurrentConnectionData(data);
      setDefineEdgeOpen(true);
    }
  };

  return {
    onEdgeClick,
    handleRelationshipSave,
    defineEdgeOpen,
    closeEdge,
    relationshipLabel,
    handleChangeLabelEdge,
    relationshipType,
    handleTypeChange,
    comparisonType,
    handleComparisonTypeChange,
    comparisonValue,
    handleComparisonValueChange,
    isUpdatingEdge,
    onConnect,
    setDefineEdgeOpen,
    edgeToUpdate,
  };
};

export default useEdge;
