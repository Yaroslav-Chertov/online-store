import React, { memo } from 'react';
import './style.css';
import ItemComment from '../item-comment';
import treeToList from '../../utils/tree-to-list';
import AnswerForm from '../answer-form';
import PropTypes from 'prop-types';

function RootComments({ userAnswer, root, rootId, currentId, existsSession, openAnswerForm, onHideAnswerForm, formName, onSignIn, onComment, t }) {

  const commentsList = treeToList(root.children, (item, level) => ({ ...item, level }));

  return (
    <>
      <div className={'RootComments'}>
        <ItemComment rootId={root._id} commentInfo={root} openAnswerForm={openAnswerForm} t={t} />
        {commentsList.length > 0 && commentsList.map(item =>
          <ItemComment
            t={t}
            rootId={root._id}
            key={item._id}
            commentInfo={item}
            openAnswerForm={openAnswerForm}
          />
        )}
      </div>

      {formName === 'answer' && rootId === root._id && (
        <AnswerForm
          userAnswer={userAnswer}
          onSignIn={onSignIn}
          onHideAnswerForm={onHideAnswerForm}
          existsSession={existsSession}
          onComment={onComment}
          currentId={currentId}
          t={t}
        />
      )}
    </>
  )
};

RootComments.propTypes = {
  root: PropTypes.object,
  rootId: PropTypes.string,
  openAnswerForm: PropTypes.func,
  formName: PropTypes.string,
  userAnswer: PropTypes.string,
  existsSession: PropTypes.bool,
  onSignIn: PropTypes.func,
  onHideAnswerForm: PropTypes.func,
  onComment: PropTypes.func,
  currentId: PropTypes.string,
  t: PropTypes.func
};

export default memo(RootComments);
