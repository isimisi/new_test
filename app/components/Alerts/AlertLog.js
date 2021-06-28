import React from 'react';
import PropTypes from 'prop-types';
import css from '@styles/Form.scss';
import FloatingPanel from '../Panel/FloatingPanel';
import AlertDemo from './AlertDemo';

function AlertLog(props) {
  const {
    open,
    close,
    alerts,
    history
  } = props;

  const alertMargin = {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  };
  console.log(alerts);
  return (
    <div>
      <FloatingPanel
        openForm={open}
        closeForm={close}
        title="Dine tidligere red flags"
      >
        <div className={css.bodyForm}>
          {alerts.map(a => (
            <div key={a.id} style={alertMargin}>
              <AlertDemo
                title={a.label}
                description={a.description}
                handleSeeCondition={() => {
                  const location = window.location.href.replace(
                    history.location.pathname,
                    `/app/red%20flags/${a.id}`
                  );
                  const win = window.open(location, '_blank');
                  win.focus();
                }}
                border
                disabled
              />
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
  history: PropTypes.any.isRequired
};

export default AlertLog;
