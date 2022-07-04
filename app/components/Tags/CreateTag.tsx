
import React, {
  useState, useEffect, Dispatch, SetStateAction
} from 'react';
import Picker, { SKIN_TONE_MEDIUM_DARK, IEmojiData } from 'emoji-picker-react';
import Button from '@mui/material/Button';
import css from '@styles/Form.scss';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next';
import FloatingPanel from '../Panel/FloatingPanel';
import useStyles from './tag.jss';

interface Props {
    open: boolean;
    close: () => void;
    emojiName?: string;
    emoji?: string;
    initialName?: string;
    openId: number | null;
    handlePostTag: (emoji: string | undefined, emoji_name: string | undefined, name: string) => void;
    handleUpdate?: (id: number, emoji: string | undefined, emoji_name: string | undefined, name: string) => void;
    setOpenId: Dispatch<SetStateAction<null>>;
}

const CreateTag = (props: Props) => {
  const classes = useStyles();
  const {
    open,
    close,
    emojiName: initialEmojiName,
    emoji: initialEmoji,
    initialName,
    handlePostTag,
    handleUpdate,
    openId,
    setOpenId
  } = props;

  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [name, setName] = useState(initialName || '');
  const [emoji, setEmoji] = useState(initialEmoji);
  const [emojiName, setEmojiName] = useState(initialEmojiName);
  const { t } = useTranslation();


  useEffect(() => {
    if (initialName) {
      setName(initialName);
    }
    if (initialEmoji) {
      setEmoji(initialEmoji);
    }
    if (initialEmojiName) {
      setEmojiName(initialEmojiName);
    }
  }, [initialName, initialEmoji, initialEmojiName]);

  const handleShowEmoji = () => setShowEmoji((prevVal: boolean) => !prevVal);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    handleShowEmoji();
  };

  const handleChangeName = (e) => setName(e.target.value);

  const handleClose = () => {
    close();
    setName('');
    setShowEmoji(false);
    setChosenEmoji(null);
    setEmoji(undefined);
    setEmojiName(undefined);
  };

  const handleSave = () => {
    let readyEmoji = emoji;
    let readyEmojiName = emojiName;
    if (chosenEmoji) {
      readyEmoji = chosenEmoji.emoji;
      readyEmojiName = chosenEmoji.names[0];
    }

    if (openId && handleUpdate) {
      handleUpdate(openId, readyEmoji, readyEmojiName, name);
      setOpenId(null);
    } else {
      handlePostTag(readyEmoji, readyEmojiName, name);
    }


    handleClose();
  };


  return (
    <div>
      <FloatingPanel
        openForm={open}
        closeForm={handleClose}
        title={openId ? t('workspaces.create-tag.chg_tag') : t('workspaces.create-tag.create_a_new_tag')}
        expanded
      >
        <section className={css.bodyForm}>
          <div className={classes.fieldContainer}>
            <IconButton
              color="primary"
              onClick={handleShowEmoji}
              className={classes.iconButton}
              size="large">
              {showEmoji
                ? <CancelIcon />
                : emoji || chosenEmoji
                  ? (
                    <span role="img" aria-label={chosenEmoji?.names[0] || emojiName}>{chosenEmoji?.emoji || emoji}</span>
                  )
                  : <EmojiEmotionsIcon style={{ color: 'grey' }} />
              }
            </IconButton>
            <TextField
              name="name"
              placeholder={t('workspaces.create-tag.name')}
              label={t('workspaces.create-tag.name')}
              className={classes.field}
              value={name}
              onChange={handleChangeName}
            />
          </div>
          {showEmoji && (
            <Picker
              onEmojiClick={onEmojiClick}
              disableAutoFocus
              skinTone={SKIN_TONE_MEDIUM_DARK}
              groupNames={{ smileys_people: 'PEOPLE' }}
              native
            />
          )}
        </section>
        <div className={css.buttonArea}>
          <Button type="button" onClick={handleClose}>
            {t('workspaces.create-tag.cancel')}
          </Button>

          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={handleSave}
          >
            {t('workspaces.create-tag.save')}
          </Button>
        </div>
      </FloatingPanel>
    </div>
  );
};
export default CreateTag;
