import React, { memo } from 'react';
import './style.css';
import ItemComment from '../item-comment';
import PropTypes from 'prop-types';

function RootComments({ activeCommentId, comments, userId, currentId, existsSession, openAnswerForm, onHideAnswerForm, formName, onSignIn, onComment, t }) {

  const lastIndex = comments.findLastIndex((comment) => comment?.parent?._id === activeCommentId);
  const lastChildId = lastIndex === -1 ? activeCommentId : comments[lastIndex]?._id;

  return (
    <ul className={'RootComments'}>
      {comments.map((item) => {
        return (
          <ItemComment
            key={item._id}
            commentInfo={item}
            activeCommentId={activeCommentId}
            lastChildId={lastChildId}
            existsSession={existsSession}
            onHideAnswerForm={onHideAnswerForm}
            openAnswerForm={openAnswerForm}
            formName={formName}
            currentId={currentId}
            onComment={onComment}
            userId={userId}
            onSignIn={onSignIn}
            t={t}
          />
        )
      })}
    </ul>
  )
};

RootComments.propTypes = {
  openAnswerForm: PropTypes.func,
  formName: PropTypes.string,
  existsSession: PropTypes.bool,
  onSignIn: PropTypes.func,
  onHideAnswerForm: PropTypes.func,
  onComment: PropTypes.func,
  currentId: PropTypes.string,
  activeCommentId: PropTypes.string,
  userId: PropTypes.string,
  comments: PropTypes.array,
  t: PropTypes.func
};

export default memo(RootComments);
