import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import CreatableSelect from "react-select/creatable";
import { selectStyles } from "@api/ui/helper";

const MapTypesForErst = (props) => {
  const {
    handleClose,
    open,
    onConfirm,
    initErstTypes,
    nodes,
    relationships,
    handleNodeChange,
    handleRelationshipChange,
  } = props;

  const [erstTypes, setErstTypes] = useState(initErstTypes);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">
        Hov, vi mangler lidt info, før vi kan trække fra CVR
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">Elementer</Typography>
        {Object.keys(initErstTypes.nodes).map((node) => (
          <Grid
            style={{ marginTop: 5 }}
            key={node}
            container
            alignItems="flex-start"
            direction="row"
            justify="space-between"
          >
            <Grid item md={6}>
              <Typography display="inline">
                Hvilken type element skal{" "}
                <Typography display="inline" color="secondary">
                  {node}
                </Typography>{" "}
                være:
              </Typography>
            </Grid>
            <Grid item md={6}>
              <CreatableSelect
                styles={selectStyles()}
                placeholder={"Vælg type for " + node}
                options={nodes.map((n) => ({ value: n.label, label: n.label }))}
                value={
                  erstTypes.nodes[node] &&
                  nodes.map((n) => n.label).includes(erstTypes.nodes[node]) && {
                    label: erstTypes.nodes[node],
                    value: erstTypes.nodes[node],
                  }
                }
                onChange={(value) => {
                  const newErst = { ...erstTypes };
                  newErst.nodes[node] = value.value;
                  setErstTypes(newErst);
                  handleNodeChange(value);
                }}
              />
            </Grid>
          </Grid>
        ))}

        <Typography variant="h6" style={{ marginTop: 10 }}>
          Relationer
        </Typography>

        {Object.keys(initErstTypes.edges).map((edge, index) => (
          <Grid
            style={{ marginTop: 5 }}
            key={edge}
            container
            alignItems="flex-start"
            direction="row"
            justify="space-between"
          >
            <Grid item md={6}>
              <Typography display="inline">
                Hvilken type relation skal{" "}
                <Typography display="inline" color="secondary">
                  {edge}
                </Typography>{" "}
                være:
              </Typography>
            </Grid>
            <Grid item md={6}>
              <CreatableSelect
                styles={selectStyles(
                  initErstTypes.edges.length - 1 === index ? "relative" : "absolute"
                )}
                placeholder={"Vælg type for " + edge}
                options={relationships
                  .toJS()
                  .map((n) => ({ value: n.label, label: n.label }))}
                value={
                  erstTypes.edges[edge] &&
                  relationships
                    .toJS()
                    .map((n) => n.label)
                    .includes(erstTypes.edges[edge]) && {
                    label: erstTypes.edges[edge],
                    value: erstTypes.edges[edge],
                  }
                }
                onChange={(value) => {
                  const newErst = { ...erstTypes };
                  newErst.edges[edge] = value.value;
                  setErstTypes(newErst);
                  handleRelationshipChange(value);
                }}
              />
            </Grid>
          </Grid>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Afbryd
        </Button>
        <Button onClick={() => onConfirm(erstTypes)} color="primary">
          Videre
        </Button>
      </DialogActions>
    </Dialog>
  );
};

MapTypesForErst.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  initErstTypes: PropTypes.object.isRequired,
  nodes: PropTypes.array.isRequired,
  relationships: PropTypes.array.isRequired,
  handleNodeChange: PropTypes.func.isRequired,
  handleRelationshipChange: PropTypes.func.isRequired,
};

export default MapTypesForErst;
