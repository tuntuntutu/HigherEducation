import React, {useEffect, useMemo, useState} from 'react';
import {message, Modal, Pagination} from 'antd'
import SingleChoiceQuestion from './SingleChoiceQuestion.jsx';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import TrueFalseQuestion from './TrueFalseQuestion';
import Score from './Score';


function mergeAndRemoveDuplicates(...arrays) {
    // 使用 Set 去重，并将结果转换回数组
    return [...new Set(arrays.flat())];
}

const Question = ({q, handleAnswerSubmit}) => {
    switch (q.type) {
        case 'single_choice':
            return (
                <SingleChoiceQuestion
                    key={q.id}
                    question={q}
                    onSubmit={handleAnswerSubmit}
                />
            );
        case 'multiple_choice':
            return (
                <MultipleChoiceQuestion
                    key={q.id}
                    question={q}
                    onSubmit={handleAnswerSubmit}
                />
            );
        case 'true_false':
            return (
                <TrueFalseQuestion
                    key={q.id}
                    question={q}
                    onSubmit={handleAnswerSubmit}
                />
            );
        default:
            return null;
    }
}
const Questions = ({
                       questions
                   }) => {
    const [userAnswers, setUserAnswers] = useState({});
    const [wrongQuestions, setWrongQuestions] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const questionsPerPage = 10;
    const totalPages = Math.ceil(questions.length / questionsPerPage);
    const [showErrorModal, setShowErrorModal] = React.useState(false);

    const handlePageChange = (newPageNo) => {
        setPageNo(newPageNo);
    }

    const currentQuestions = useMemo(() => {
        return questions.slice(pageNo * questionsPerPage, (pageNo + 1) * questionsPerPage);
    }, [questions])

    const handleAnswerSubmit = (id, userAnswer, correctAnswer) => {
        if (!userAnswer) {
            message.error('请先选择答案')
            return
        }
        setUserAnswers({...userAnswers, [id]: userAnswer});

        // 判断答案是否正确
        const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);
        if (!isCorrect) {
            message.error('答题错误，正确答案是' + correctAnswer)
            setWrongQuestions(prev => mergeAndRemoveDuplicates(prev, [id]));
        } else {
            message.success('恭喜你回答正确')
            setWrongQuestions(prev => prev.filter(item => item !== id));
        }
        questions.forEach(item => {
            if (item.id === id) {
                item.userAnswer = userAnswer;
                item.hasSubmit = true;
                item.isCorrect = isCorrect;
            }
        })
    };
    const wrongQuestionAll = useMemo(() => {
        return wrongQuestions.map(item => {
            return questions.find(q => q.id === item)
        })
    }, [wrongQuestions])
    const reset = () => {
        setPageNo(0);
        setWrongQuestions([]);
        setUserAnswers({});
        questions.forEach(item => {
            item.hasSubmit = false;
            item.userAnswer = null;
            item.isCorrect = null;
        })
    }

    useEffect(() => {
        const localWrongQuestions = localStorage.getItem('wrongQuestions') || '';

        localStorage.setItem('wrongQuestions', mergeAndRemoveDuplicates(localWrongQuestions.split(','), wrongQuestions).join(','))
    }, [wrongQuestions])


    return (
        <div className="question-box">
            {currentQuestions.map((q, index) => {
                q.pageNo = pageNo * 10 + index + 1;
                return <div className="question">
                    <Question key={q.id} q={q} handleAnswerSubmit={handleAnswerSubmit}></Question>
                    {q.hasSubmit && !q.isCorrect ? <div>
                        {/*{q.userAnswer && <div>你的答案：{q.userAnswer}</div>}*/}
                        {q.answer && <div>正确答案：{q.answer}</div>}
                    </div> : null}
                </div>
            })}
            <div className="page">
                <Pagination align="center" current={pageNo} total={questions.length - 1} onChange={handlePageChange}/>
                {pageNo === totalPages - 1 && <button onClick={reset}>重做</button>}
            </div>
            <Score questions={questions} userAnswers={userAnswers} wrongQuestions={wrongQuestions}
                   setShowErrorModal={setShowErrorModal}/>
            <Modal
                open={showErrorModal}
                title="错题集"
                footer={null}
                onCancel={() => setShowErrorModal(false)}
            >
                {
                    wrongQuestionAll.map(q => {
                        switch (q.type) {
                            case 'single_choice':
                                return (
                                    <SingleChoiceQuestion
                                        key={q.id}
                                        question={q}
                                    />
                                );
                            case 'multiple_choice':
                                return (
                                    <MultipleChoiceQuestion
                                        key={q.id}
                                        question={q}
                                    />
                                );
                            case 'true_false':
                                return (
                                    <TrueFalseQuestion
                                        key={q.id}
                                        question={q}
                                    />
                                );
                            default:
                                return null;
                        }
                    })
                }
            </Modal>

        </div>
    );
};

export default Questions;
