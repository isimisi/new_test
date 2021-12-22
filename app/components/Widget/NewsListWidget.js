/* eslint-disable react/prop-types */
import React from 'react';
import newsData from '@api/dummy/newsData';
import { useTranslation } from 'react-i18next';

import HorizontalNewsCard from '../CardPaper/HorizontalNewsCard';

function NewsListWidget(props) {
  const { handleOpenGuide } = props;
  const { t } = useTranslation();
  return (
    <div>
      {
        newsData.map((item, index) => (
          <div key={index.toString()}>
            <HorizontalNewsCard
              handleOpenGuide={handleOpenGuide}
              title={t('personal-dashboard.HorizontalNewsCard.title')}
              desc={t('personal-dashboard.HorizontalNewsCard.desc')}
              thumbnail={item.thumb}
            />
          </div>
        ))
      }
    </div>
  );
}

export default NewsListWidget;
