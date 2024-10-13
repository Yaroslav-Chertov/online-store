import React, { memo } from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { formatDate } from '../../utils/date-format';
import PropTypes from 'prop-types';
import AnswerForm from '../answer-form';

function ItemComment({ existsSession, onHideAnswerForm, onComment, onSignIn, lastChildId, commentInfo, formName, openAnswerForm, currentId, userId, t }) {

  const cn = bem('ItemComment');
  const MAX_LEVEL = 5;
  const GAP = 30;

  return (
    <>
      <li className={cn()}
        style={{ marginLeft: `${(commentInfo.level <= MAX_LEVEL ? commentInfo.level : MAX_LEVEL) * GAP}px` }}
      >
        <div className={cn('info')}>
          <span className={cn('userName', { 'auth': userId === commentInfo.author._id })}>{commentInfo?.author?.profile?.name}</span>
          <span className={cn('userDate')}>{formatDate(commentInfo?.dateCreate)}</span>
        </div>
        <div className={cn('text')}>{commentInfo?.text}</div>
        <div className={cn('answer')}>
          <button className={cn('btn')}
            onClick={() => openAnswerForm('answer', commentInfo._id)}
          >
            {t('comments.answer')}
          </button>
        </div>
        {
          formName === 'answer' && lastChildId === commentInfo._id &&
          <AnswerForm
            existsSession={existsSession}
            onSignIn={onSignIn}
            onHideAnswerForm={onHideAnswerForm}
            onComment={onComment}
            currentId={currentId}
            t={t}
          />
        }
      </li>
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
  existsSession: PropTypes.bool,
  onHideAnswerForm: PropTypes.func,
  onComment: PropTypes.func,
  onSignIn: PropTypes.func,
  lastChildId: PropTypes.string,
  formName: PropTypes.string,
  currentId: PropTypes.string,
  userId: PropTypes.string,
  openAnswerForm: PropTypes.func,
  t: PropTypes.func
};

export default memo(ItemComment);
