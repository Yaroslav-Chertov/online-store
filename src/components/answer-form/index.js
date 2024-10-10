import React, { useEffect, useRef, useState, memo } from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';

function AnswerForm({ userAnswer, existsSession, onSignIn, onHideAnswerForm, onComment, currentId, t }) {
  const cn = bem('AnswerForm');
  const [text, setText] = useState('')
  const answerRef = useRef();

  const handelChange = (value) => {
    setText(value)
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    onComment(text, currentId)
  };

  useEffect(() => {
    if (answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [answerRef])

  return (
    <>
      {existsSession
        ? (
          <form ref={answerRef} className={cn()} onSubmit={handelSubmit}>
            <h3 className={cn('title')}>{t('comments.newAnswer')}</h3>
            <textarea
              className={cn('textarea')}
              placeholder={`Мой ответ для ${userAnswer}`}
              value={text}
              onChange={(e) => handelChange(e.target.value)}
            />
            <div className={cn('actions')}>
              <button className={cn('btn')} disabled={!text?.trim()}>{t('comments.send')}</button>
              <button className={cn('btn')} onClick={onHideAnswerForm}>{t('comments.close')}</button>
            </div>
          </form>
        )
        : (
          <div ref={answerRef} className={cn('login')}>
            <button className={cn('link')} onClick={onSignIn}>{t('comments.login')}</button>
            <span>,&nbsp;{t('comments.toAnswer')}. </span>
            <button className={cn('cancel')} onClick={onHideAnswerForm}>{t('comments.close')}</button>
          </div>
        )
      }
    </>

  )
};

AnswerForm.propTypes = {
  userAnswer: PropTypes.string,
  existsSession: PropTypes.bool,
  onSignIn: PropTypes.func,
  onHideAnswerForm: PropTypes.func,
  onComment: PropTypes.func,
  currentId: PropTypes.string,
  t: PropTypes.func
};

export default memo(AnswerForm)
