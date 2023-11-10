import React, { FC } from 'react';

import closeIcon from '../../../public/close-icon.svg';
import styles from '../details/Details.module.css';

interface DetailCardProps {
  details: {
    title: string;
    description: string;
    data: string;
    culture: string;
  };
  clickCloseButton: () => void;
}

const DetailCard: FC<DetailCardProps> = ({ clickCloseButton, details }) => {
  return (
    <div>
      <img
        className={styles.closeIcon}
        src={closeIcon}
        alt={'close'}
        onClick={clickCloseButton}
      />
      <h2>{details.title}</h2>
      <h3>Year: {details.data}</h3>
      <h4>Culture: {details.culture}</h4>
      {React.createElement('div', {
        dangerouslySetInnerHTML: { __html: details.description },
      })}
    </div>
  );
};

export default DetailCard;
