/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React, {
  memo, useMemo, useCallback, useEffect
} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Handle, Position } from 'react-flow-renderer';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import square from './square.svg';
import triangle from './triangle.svg';

import circle from './circle.svg';
import person from './person.svg';

const CustomNode = ({ data }) => {
  const theme = useTheme();
  const history = useHistory();
  let handleVisability = useSelector(state => state.workspace.get('handleVisability'));

  useEffect(() => {
    if (history.location.pathname.includes('analysis')) {
      handleVisability = false;
    }
  }, [history]);


  const getSVG = useCallback((figur) => {
    switch (figur) {
      case 'triangle':
        return triangle;
      case 'square':
        return square;
      case 'circle':
        return circle;
      case 'person':
        return person;
      default:
        return square;
    }
  }, []);

  const nodeStyle = {
    border: '1px solid',
    borderRadius: theme.rounded.small,
    display: 'flex',
    padding: 10,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
    backgroundColor: data.backgroundColor ? data.backgroundColor : '#ffffff',
    borderColor: data.borderColor ? data.borderColor : '#000000'
  };

  const inlineWrap = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  };

  const iconStyle = {
    height: 10,
    marginRight: 7,
  };

  const handleStyle = useMemo(() => ({
    height: handleVisability ? 8 : 0,
    width: handleVisability ? 8 : 0,
    backgroundClip: 'padding-box',
  }), [handleVisability]);

  const handleStyleSideBottom = useMemo(() => ({
    height: handleVisability ? 8 : 0,
    width: handleVisability ? 8 : 0,
    top: '70%',
  }), [handleVisability]);

  const handleStyleSideTop = useMemo(() => ({
    height: handleVisability ? 8 : 0,
    width: handleVisability ? 8 : 0,
    top: '30%',
  }), [handleVisability]);

  const header = useMemo(() => ({
    fontSize: 10
  }), []);

  const attr = useMemo(() => ({
    fontSize: 6
  }), []);

  return (
    <div style={nodeStyle}>
      <Handle
        style={handleStyle}
        type="source"
        id="top"
        position={Position.Top}
      />
      <Handle
        style={handleStyleSideTop}
        type="source"
        id="leftTop"
        position={Position.Left}
      />
      <Handle
        style={handleStyleSideBottom}
        type="source"
        id="leftBottom"
        position={Position.Left}
      />
      <Handle
        style={handleStyleSideBottom}
        type="source"
        id="rightBottom"
        position={Position.Right}
      />
      <Handle
        style={handleStyleSideTop}
        type="source"
        id="rightTop"
        position={Position.Right}
      />
      <Handle
        style={handleStyle}
        type="source"
        id="bottom"
        position={Position.Bottom}
      />
      <div style={inlineWrap}>
        {data.figur && (
          <img
            src={getSVG(data.figur)}
            alt={data.figur}
            style={iconStyle}
          />
        )}
        <Typography variant="subtitle1" style={header}>{data.displayName || data.label}</Typography>
      </div>
      {data.conditionValues && data.conditionValues.map(cv => (
        <Typography variant="body2" style={attr} key={cv.attribut.label}>
          {cv.attribut.label}
          {' '}
          {cv.comparison_type}
          {' '}
          {cv.comparison_value}
        </Typography>
      ))}
      {data.attributes && data.attributes.filter(cv => cv.show).map(cv => (
        <Typography variant="body2" style={attr} key={cv.label}>
          {cv.label}
          {': '}
          {cv.value}
        </Typography>
      ))}
    </div>
  );
};

export default memo(CustomNode);
