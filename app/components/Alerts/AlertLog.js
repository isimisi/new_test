import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from '@styles/Form.scss';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';
import { encryptId } from '@api/constants';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import FlashOffIcon from '@material-ui/icons/FlashOff';
import FloatingPanel from '../Panel/FloatingPanel';

function AlertLog(props) {
  const {
    open,
    close,
    alerts,
    history,
    seeAlert,
    highlightAlertItems,
    removeHighlightAlert
  } = props;

  const [flashOn, setFlashOn] = useState(false);

  const alertMargin = {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  };

  const leave = () => {
    const location = window.location.href.replace(
      history.location.pathname,
      `/app/red%20flags/${encryptId(alerts[0]?.alert?.id)}`
    );
    const win = window.open(location, '_blank');
    win.focus();
  };

  return (
    <div>
      <FloatingPanel
        openForm={open}
        closeForm={close}
        title="Dine tidligere red flags"
      >
        <div className={css.bodyForm}>
          {alerts.map((alert, index) => (
            <div key={alert?.alert?.id} style={alertMargin}>
              <div style={{
                backgroundColor: '#fafafa', padding: 5, paddingLeft: 10, borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
              }}
              >
                <Typography>
                  {alert?.alert?.label}
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Tooltip title={flashOn ? 'Stop highlight' : 'Highlight'}>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        if (flashOn) {
                          removeHighlightAlert();
                        } else {
                          highlightAlertItems(alert, true);
                        }

                        setFlashOn(prevVal => !prevVal);
                      }}
                    >
                      {flashOn ? <FlashOffIcon /> : <FlashOnIcon />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Vis red flag">
                    <IconButton color="primary" onClick={() => seeAlert(index)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Gå til red flag">
                    <IconButton color="primary" onClick={leave} disabled={alert?.alert?.organization_id === 11}>
                      <ExitToAppIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
          )
          )}
        </div>
      </FloatingPanel>
    </div>
  );
}

AlertLog.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
  history: PropTypes.any.isRequired,
  seeAlert: PropTypes.func.isRequired,
  highlightAlertItems: PropTypes.func.isRequired,
  removeHighlightAlert: PropTypes.func.isRequired,
};

export default AlertLog;
