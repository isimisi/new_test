import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import Typography from "@material-ui/core/Typography";
import { IDocument } from "@customTypes/reducers/document";
import AttachFileIcon from "@material-ui/icons/AttachFile";

interface Props {
  document: IDocument;
  handleEdit: () => void;
  download: () => void;
}

const DocumentTable = (props: Props) => {
  const { document, handleEdit, download } = props;

  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        {document.get("title")}
      </Typography>

      <Card style={{ width: "100%" }}>
        <CardHeader
          action={
            <>
              <IconButton
                aria-label="settings"
                onClick={download}
                disabled={!document.get("link")}
              >
                <AttachFileIcon />
              </IconButton>
              <IconButton aria-label="settings" onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            </>
          }
          subheader={document.get("description")}
          subheaderTypographyProps={{
            // @ts-ignore
            color: "black"
          }}
        />
      </Card>
    </>
  );
};

export default DocumentTable;
