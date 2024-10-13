import React, { useState, memo } from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import PropTypes from "prop-types";

function CommentForm({ existsSession, onSignIn, onComment, t }) {
  const cn = bem('CommentForm');
  const [text, setText] = useState('');

  const handelChange = (value) => {
    setText(value)
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    onComment(text)
  };

  return (
    <>
      {existsSession
        ? (
          <form className={cn()} onSubmit={handelSubmit}>
            <h3 className={cn('title')}>{t('comments.newComment')}</h3>
            <textarea
              className={cn('textarea')}
              rows="5"
              value={text}
              onChange={(e) => handelChange(e.target.value)}
            />
            <button className={cn('btn')} disabled={!text?.trim()}> {t('comments.send')} </button>
          </form>
        )
        : (
          <div className={cn('login')}>
            <button className={cn('link')} onClick={onSignIn}>{t('comments.login')}</button>
            <span>, {t('comments.toComment')}</span>
          </div>
        )
      }
    </>

  )
};

CommentForm.propTypes = {
  existsSession: PropTypes.bool,
  onSignIn: PropTypes.func,
  onComment: PropTypes.func,
  t: PropTypes.func
};

export default memo(CommentForm);
