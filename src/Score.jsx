import React from 'react';

const Score = ({questions, userAnswers, wrongQuestions, setShowErrorModal}) => {
    const wrongQuestionList = questions.filter(q => wrongQuestions.includes(q.id));

    const correctAnswersCount = questions.reduce((score, question) => {
        const correctAnswer = question.answer;
        const userAnswer = userAnswers[question.id];
        return JSON.stringify(userAnswer) === JSON.stringify(correctAnswer) ? score + 1 : score;
    }, 0);
    const showErrorModal = () => {
        setShowErrorModal(true);
    }

    return (
        <div className="score">
            <h4>得分：{correctAnswersCount} / {questions.length}</h4>
            <h4>错题：
                {wrongQuestionList.length === 0 ? (
                    <a style={{color: 'grey'}}>暂无错题</a>
                ) : (
                    <>{wrongQuestionList.length} / {questions.length}<a onClick={showErrorModal}>查看</a></>
                )}
            </h4>
        </div>
    );
};

export default Score;
