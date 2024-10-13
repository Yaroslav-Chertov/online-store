import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from 'shallowequal';
import useTranslate from '../../hooks/use-translate';
import CommentsLayout from '../../components/comments-layout';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import useSelector from '../../hooks/use-selector';
import CommentForm from '../../components/comment-form';
import formsActions from '../../store-redux/forms/actions';
import commentsActions from '../../store-redux/comments/actions';
import RootComments from '../../components/root-comments';
import { useLocation, useNavigate } from 'react-router-dom';


function Comments() {
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCommentId, setActiveCommentId] = useState('');

  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.comments,
    count: state.comments.count,
    articleId: state.article.data._id,
    activeRootId: state.comments.activeIdComment,
    form: state.forms.name,
  }), shallowequal);

  const select = useSelector(state => ({
    exists: state.session.exists,
    userId: state.session.user._id,
  }));

  const commentsRoots = listToTree([{ _id: selectRedux.articleId, parent: null }, ...selectRedux.comments]);
  const commentList = treeToList(commentsRoots, (item, level) => ({ ...item, level }));
  commentList.shift();
  console.log('Comments commentList', commentList);

  const callbacks = {
    openAnswerForm: useCallback((name, activeId) => {
      setActiveCommentId(activeId)
      dispatch(formsActions.open(name))
    }, []),

    onHideAnswerForm: useCallback(() => {
      dispatch(formsActions.open('comment'))
    }, []),

    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),

    onComment: useCallback((text, id = null) => {
      const body = {
        text,
        parent: {
          _id: id || selectRedux.articleId,
          _type: id ? 'comment' : 'article',
        }
      }
      dispatch(commentsActions.send(body))
    }, []),
  };

  return (
    <CommentsLayout t={t} countComments={selectRedux.count}>
      <RootComments
        comments={commentList}
        activeCommentId={activeCommentId}
        currentId={activeCommentId}
        userId={select.userId}
        existsSession={select.exists}
        openAnswerForm={callbacks.openAnswerForm}
        onHideAnswerForm={callbacks.onHideAnswerForm}
        formName={selectRedux.form}
        onSignIn={callbacks.onSignIn}
        onComment={callbacks.onComment}
        t={t}
      />
      {selectRedux.form === 'comment' &&
        <CommentForm
          existsSession={select.exists}
          onSignIn={callbacks.onSignIn}
          onComment={callbacks.onComment}
          t={t}
        />
      }
    </CommentsLayout>
  )
};

export default memo(Comments);
