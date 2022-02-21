import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import CancelIcon from '@material-ui/icons/Cancel';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState,
  convertToRaw,
} from 'draft-js';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Picker, { SKIN_TONE_MEDIUM_DARK, IEmojiData } from 'emoji-picker-react';
import TextField from "@material-ui/core/TextField/TextField";
import ButtonBase from '@material-ui/core/ButtonBase';
import Checkbox from '@material-ui/core/Checkbox';
import draftToHtml from 'draftjs-to-html';
import Typography from '@material-ui/core/Typography';
import { useAuth0, User } from "@auth0/auth0-react";
import { useAppDispatch } from '@hooks/redux';
import {
  postNotifications,
} from '../../containers/Pages/Dashboard/reducers/dashboardActions';

interface Props {
  handleClose: () => void;
  open: boolean;
}

export default function NotificationDialog({ handleClose, open }: Props) {
  const dispatch = useAppDispatch();
  const user = useAuth0().user as User;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (_editorState) => {
    setEditorState(_editorState);
  };

  const [headerNotif, setHeaderNotif] = useState("");
  const handleHeaderNotifChange = (e: React.ChangeEvent<HTMLInputElement>) => setHeaderNotif(e.target.value);

  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [emoji, setEmoji] = useState("");


  const handleShowEmoji = () => setShowEmoji((prevVal: boolean) => !prevVal);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    handleShowEmoji();
  };

  const [intrusive, setIntrusive] = useState(false);
  const handleIntrusive = () => setIntrusive(prevVal => !prevVal);


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Use Google location service?
      </DialogTitle>
      <DialogContent>
        <div>
          <IconButton color="primary" onClick={handleShowEmoji}>
            {showEmoji
              ? <CancelIcon />
              : emoji || chosenEmoji
                ? (
                  <span role="img">{chosenEmoji?.emoji || emoji}</span>
                )
                : <EmojiEmotionsIcon style={{ color: 'grey' }} />
            }
          </IconButton>
          <TextField
            label="Header til notifikation"
            margin="normal"
            onChange={handleHeaderNotifChange}
            value={headerNotif}
          />
          <ButtonBase
            style={{ marginTop: 10 }}
            onClick={handleIntrusive}
          >
            <Checkbox
              checked={intrusive}
              name="show label"
              color="primary"
            />
            <Typography variant="subtitle2">
                Vær aggresiv med din notifikation
            </Typography>
          </ButtonBase>
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
          />
          {showEmoji && (
            <Picker
              onEmojiClick={onEmojiClick}
              disableAutoFocus
              skinTone={SKIN_TONE_MEDIUM_DARK}
              groupNames={{ smileys_people: 'PEOPLE' }}
              native
            />
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            const rawContentState = convertToRaw(editorState.getCurrentContent());
            const markup = draftToHtml(rawContentState);

            dispatch(postNotifications(user, headerNotif, markup, chosenEmoji?.emoji || emoji, intrusive));
          }}
          color="primary"
          autoFocus
        >
          Send Notifikation
        </Button>
      </DialogActions>
    </Dialog>
  );
}
