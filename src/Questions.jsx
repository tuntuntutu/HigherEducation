import React, {useEffect, useMemo, useState} from 'react';
import Modal from 'react-modal'
import SingleChoiceQuestion from './SingleChoiceQuestion.jsx';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import TrueFalseQuestion from './TrueFalseQuestion';
import Score from './Score';

Modal.defaultStyles.overlay.backgroundColor = 'cornsilk';

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
    const currentQuestions = questions.slice(pageNo * questionsPerPage, (pageNo + 1) * questionsPerPage);
    const [showErrorModal, setShowErrorModal] = React.useState(false);

    const handlePageChange = (newPageNo) => {
        setPageNo(newPageNo);
    }


    const handleAnswerSubmit = (id, userAnswer, correctAnswer) => {
        console.log(userAnswer, correctAnswer)
        setUserAnswers({...userAnswers, [id]: userAnswer});

        // 判断答案是否正确
        const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);
        if (!isCorrect) {
            setWrongQuestions(prev => mergeAndRemoveDuplicates(prev, [id]));
        } else {
            setWrongQuestions(prev => prev.filter(item => item !== id));
        }
    };
    const wrongQuestionAll = useMemo(() => {
        return wrongQuestions.map(item => {
            return questions.find(q => q.id === item)
        })
    }, [wrongQuestions])

    useEffect(() => {
        const localWrongQuestions = localStorage.getItem('wrongQuestions') || '';

        localStorage.setItem('wrongQuestions', mergeAndRemoveDuplicates(localWrongQuestions.split(','), wrongQuestions).join(','))
    }, [wrongQuestions])


    return (
        <div>
            {currentQuestions.map((q, index) => {
                q.pageNo = pageNo * 10 + index + 1;
                return <div className="question"><Question key={q.id} q={q} handleAnswerSubmit={handleAnswerSubmit}></Question></div>
            })}
            <div className="page">
                {pageNo > 0 && <button onClick={() => handlePageChange(pageNo - 1)}>上一页</button>}
                {pageNo < totalPages - 1 && <button onClick={() => handlePageChange(pageNo + 1)}>下一页</button>}
                {pageNo === totalPages - 1 && <button onClick={() => handlePageChange(0)}>重做</button>}
            </div>
            <Score questions={questions} userAnswers={userAnswers} wrongQuestions={wrongQuestions}
                   setShowErrorModal={setShowErrorModal}/>
            <Modal
                isOpen={showErrorModal}
                style={{
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    height: '80%',
                    width: '80%',
                    overflow: 'auto'
                }}
                contentLabel="Example Modal"
                onRequestClose={() => setShowErrorModal(false)}
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
