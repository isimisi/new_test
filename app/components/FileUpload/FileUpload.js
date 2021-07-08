import React, { useState, useEffect } from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import { useDropzone } from 'react-dropzone';
import Typography from '@material-ui/core/Typography';
import { useSpring, animated } from 'react-spring';
import NoteAdd from '@material-ui/icons/NoteAdd';
import PropTypes from 'prop-types';

const AnimatedNoteAdd = animated(NoteAdd);

const styles = theme => ({
  dropzone: {
    display: 'flex',
    width: '100%',
    backgroundColor: theme.palette.type === 'dark' ? '#303030' : '#F7F8FA',
    borderRadius: theme.rounded.small,
    border: theme.palette.type === 'dark' ? '1px solid #606060' : '1px solid #F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  addCircle: {
    width: '30%',
    height: '30%',
  },
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  },
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%'
  }
});

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1];
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;


const FileUpload = props => {
  const theme = useTheme();
  const {
    classes,
    height,
    onlyImage,
    files,
    handleChangeFile,
    minimal
  } = props;
  const [useSpringProps, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }));
  const [hover, setHover] = useState(false);

  const callback = {
    onDrop: acceptedFiles => {
      handleChangeFile(acceptedFiles.map(_file => Object.assign(_file, {
        preview: URL.createObjectURL(_file)
      })));
    }
  };

  callback.accept = onlyImage ? 'image/*' : '.docx, .pdf';

  const { getRootProps, getInputProps } = useDropzone(callback);

  const thumbs = files.map(_file => (
    <div className={classes.thumb} key={_file.name}>
      <div className={classes.thumbInner}>
        <img
          alt="preview"
          src={_file.preview}
          className={classes.img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    files.forEach(_file => URL.revokeObjectURL(_file.preview));
  }, [files]);

  return (
    <>
      <div
        {...getRootProps({ className: classes.dropzone })}
        style={{ height, width: minimal && 100 }}
        onMouseMove={({ clientX: x, clientY: y }) => {
          set({ xys: calc(x, y) });
          setHover(true);
        }}
        onMouseLeave={() => {
          set({ xys: [0, 0, 1] });
          setHover(false);
        }}
      >
        <input {...getInputProps()} />
        <AnimatedNoteAdd
          className={classes.addCircle}
          style={{
            opacity: hover ? 1 : 0.5,
            color: hover ? theme.palette.primary.main : 'black',
            transform: useSpringProps.xys.interpolate(trans)
          }}
        />
        {!minimal && <Typography variant="h5">Upload dit indhold</Typography>}
      </div>
      <aside className={classes.thumbsContainer}>
        {onlyImage && thumbs}
      </aside>
    </>
  );
};

FileUpload.propTypes = {
  classes: PropTypes.object.isRequired,
  height: PropTypes.number,
  onlyImage: PropTypes.bool,
  files: PropTypes.object,
  handleChangeFile: PropTypes.func.isRequired,
  minimal: PropTypes.bool.isRequired,
};

FileUpload.defaultProps = {
  height: null,
  onlyImage: false,
  files: []
};

export default withStyles(styles)(FileUpload);
