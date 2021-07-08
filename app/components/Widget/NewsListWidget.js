/* eslint-disable react/prop-types */
import React from 'react';
import newsData from '@api/dummy/newsData';

import HorizontalNewsCard from '../CardPaper/HorizontalNewsCard';

function NewsListWidget(props) {
  const { handleOpenGuide } = props;
  return (
    <div>
      {
        newsData.map((item, index) => (
          <div key={index.toString()}>
            <HorizontalNewsCard handleOpenGuide={handleOpenGuide} title={item.title} desc={item.desc} thumbnail={item.thumb} />
          </div>
        ))
      }
    </div>
  );
}

export default NewsListWidget;
