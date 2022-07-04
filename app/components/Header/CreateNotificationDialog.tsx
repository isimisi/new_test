import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CancelIcon from '@mui/icons-material/Cancel';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState,
  convertToRaw,
} from 'draft-js';
import IconButton from '@mui/material/IconButton/IconButton';
import Picker, { SKIN_TONE_MEDIUM_DARK, IEmojiData } from 'emoji-picker-react';
import TextField from "@mui/material/TextField/TextField";
import ButtonBase from '@mui/material/ButtonBase';
import Checkbox from '@mui/material/Checkbox';
import draftToHtml from 'draftjs-to-html';
import Typography from '@mui/material/Typography';
import { useAuth0, User } from "@auth0/auth0-react";
import { useAppDispatch } from '@hooks/redux';
import {
  postNotifications,
} from '@pages/Dashboard/reducers/dashboardActions';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          <IconButton color="primary" onClick={handleShowEmoji} size="large">
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
