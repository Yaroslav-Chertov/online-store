import React, { memo } from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { formatDate } from '../../utils/date-format';
import PropTypes from 'prop-types';

function ItemComment({ commentInfo, rootId, openAnswerForm, t }) {

  const cn = bem('ItemComment');
  const gap = (commentInfo.level + 1) * 30;

  return (
    <>
      <div className={cn()}
        style={{ marginLeft: `${gap}px` }}
      >
        <div className={cn('info')}>
          <span className={cn('userName')}>{commentInfo?.author?.profile?.name}</span>
          <span className={cn('userDate')}>{formatDate(commentInfo?.dateCreate)}</span>
        </div>
        <div className={cn('text')}>{commentInfo?.text}</div>
        <div className={cn('answer')}>
          <button className={cn('btn')}
            onClick={() => openAnswerForm('answer', rootId, commentInfo._id, commentInfo?.author?.profile?.name)}
          >
            {t('comments.answer')}
          </button>
        </div>
      </div>
    </>
  )
};

ItemComment.propTypes = {
  commentInfo: PropTypes.shape({
    author: PropTypes.shape({ profile: PropTypes.shape({ name: PropTypes.string }) }),
    dateCreate: PropTypes.string,
    text: PropTypes.string,
    _id: PropTypes.string,
  }),
  rootId: PropTypes.string,
  openAnswerForm: PropTypes.func,
  t: PropTypes.func
};

export default memo(ItemComment);
