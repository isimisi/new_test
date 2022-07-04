import React from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import FileUpload from "../FileUpload/FileUpload";
import {
  titleChange,
  descriptionChange,
  imageChange,
} from "@pages/Groups/reducers/groupActions";

const styles = () => ({
  root: {
    flexGrow: 1,
    padding: 30,
  },
  field: {
    width: "100%",
    marginBottom: 10,
  },
});

function GroupForm(props) {
  const { classes, title, description, image, handleSubmit } = props;
  const dispatch = useDispatch();

  const handleTitleChange = (e) => {
    dispatch(titleChange(e.target.value));
  };

  const handleDescriptionChange = (e) => {
    dispatch(descriptionChange(e.target.value));
  };

  const handleChangeImage = (files) => {
    dispatch(imageChange(files));
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <Grid
        container
        spacing={3}
        alignItems="flex-start"
        direction="row"
        justifyContent="center"
      >
        <Grid item xs={12} md={12}>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              Create a Group
            </Typography>
            <div>
              <TextField
                name="title"
                placeholder="Title"
                label="Title"
                className={classes.field}
                onChange={handleTitleChange}
                value={title}
              />
            </div>
            <div className={classes.field}>
              <TextField
                name="description"
                className={classes.field}
                placeholder="Description"
                label="Description"
                multiline
                rows={2}
                onChange={handleDescriptionChange}
                value={description}
              />
            </div>
            <FileUpload
              height={200}
              onlyImage
              files={image}
              handleChangeFile={(files) => handleChangeImage(files)}
            />
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              onClick={handleSubmit}
            >
              Create
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

GroupForm.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(GroupForm);
