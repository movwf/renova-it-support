import React from 'react';
import styles from './QuestionTitle.module.css';

interface IQuestionTitle {
  title: string;
  description?: string;
}

function QuestionTitle({ title, description }: IQuestionTitle) {
  return (
    <div className={styles.QuestionTitle} data-testid="question-title">
      <span className={styles.Title}>{title}</span>
      <span className={styles.Description}>{description}</span>
    </div>
  );
}

export default React.memo(QuestionTitle);
