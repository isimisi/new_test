import React, { useState, useEffect } from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import Typography from "@material-ui/core/Typography";
import { useSpring, animated } from "react-spring";
import NoteAdd from "@material-ui/icons/NoteAdd";

import { useTranslation } from "react-i18next";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { ButtonBase } from "@material-ui/core";
import { MyTheme } from "@customTypes/styling";

const useStyles = makeStyles((theme: MyTheme) => ({
  dropzone: {
    display: "flex",

    backgroundColor: theme.palette.type === "dark" ? "#303030" : "#F7F8FA",
    borderRadius: theme.rounded.small,
    border:
      theme.palette.type === "dark" ? "1px solid #606060" : "1px solid #F1F1F1",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  addCircle: {
    width: "30%",
    height: "30%"
  },
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  thumb: {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box"
  },
  thumbInner: {
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
  },
  img: {
    display: "block",
    width: "auto",
    height: "100%"
  }
}));

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

interface Props {
  height?: number;
  onlyImage?: boolean;
  files?: any;
  handleChangeFile: (files: any) => void;
  minimal?: boolean;
  uploaded?: boolean;
  download?: () => void;
  acceptedTypes?: string;
}

const FileUpload = (props: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const {
    height,
    onlyImage,
    files = [],
    handleChangeFile,
    minimal,
    uploaded,
    download,
    acceptedTypes
  } = props;
  const [useSpringProps, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 }
  }));
  const [hover, setHover] = useState(false);

  const AnimatedNoteAdd = animated(uploaded ? InsertDriveFileIcon : NoteAdd);

  const callback: DropzoneOptions = {
    onDrop: acceptedFiles => {
      handleChangeFile(
        acceptedFiles.map(_file =>
          Object.assign(_file, {
            preview: URL.createObjectURL(_file)
          })
        )
      );
    }
  };

  callback.accept = acceptedTypes || (onlyImage ? "image/*" : ".docx, .pdf");

  const { getRootProps, getInputProps } = useDropzone(callback);
  const { t } = useTranslation();

  const thumbs = files.map(_file => (
    <div className={classes.thumb} key={_file.name}>
      <div className={classes.thumbInner}>
        <img alt="preview" src={_file.preview} className={classes.img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach(_file => URL.revokeObjectURL(_file.preview));
    },
    [files]
  );

  return (
    <>
      <div
        {...getRootProps({ className: classes.dropzone })}
        style={{ height, width: minimal ? 100 : "100%", position: "relative" }}
        onMouseMove={({ clientX: x, clientY: y }) => {
          // @ts-ignore
          set({ xys: calc(x, y) });
          setHover(true);
        }}
        onMouseLeave={() => {
          // @ts-ignore
          set({ xys: [0, 0, 1] });
          setHover(false);
        }}
      >
        {uploaded ? (
          <ButtonBase
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: 9999
            }}
            onClick={download}
          />
        ) : (
          <input {...getInputProps()} />
        )}
        <AnimatedNoteAdd
          className={classes.addCircle}
          style={{
            opacity: hover ? 1 : 0.5,
            color: hover ? theme.palette.primary.main : "black",
            // @ts-ignore
            transform: useSpringProps.xys.interpolate(trans)
          }}
        />
        {!minimal && (
          <Typography variant="h5">
            {uploaded
              ? t("output.FileUpload.uploaded_content")
              : t("output.FileUpload.upload_content")}
          </Typography>
        )}
      </div>
      <aside
        className={classes.thumbsContainer}
        style={{ marginTop: onlyImage ? 16 : 0 }}
      >
        {onlyImage && thumbs}
      </aside>
    </>
  );
};

export default FileUpload;
