import React from 'react';
import newsData from '@api/dummy/newsData';

import HorizontalNewsCard from '../CardPaper/HorizontalNewsCard';

function NewsListWidget() {
  return (
    <div>
      {
        newsData.map((item, index) => (
          <div key={index.toString()}>
            <HorizontalNewsCard title={item.title} desc={item.desc} thumbnail={item.thumb} />
          </div>
        ))
      }
    </div>
  );
}

export default NewsListWidget;
