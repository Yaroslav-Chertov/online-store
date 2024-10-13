import React, { memo } from 'react';
import './style.css';
import PropTypes from 'prop-types';

function CommentsLayout({ children, countComments, t }) {
  return (
    <div className={'CommentsLayout'}>
      <span>{`${t('comment.comments')} (${countComments})`}</span>
      {children}
    </div>
  )
};

CommentsLayout.propTypes = {
  children: PropTypes.node,
  countComments: PropTypes.number,
  t: PropTypes.func
};

export default memo(CommentsLayout);
