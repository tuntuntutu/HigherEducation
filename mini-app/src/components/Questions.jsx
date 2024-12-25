import React, {useEffect, useMemo, useState} from 'react';
import {View, Text} from '@tarojs/components'
import Taro from '@tarojs/taro'
import {Dialog, Pagination, Toast} from '@nutui/nutui-react-taro'
import SingleChoiceQuestion from './SingleChoiceQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import TrueFalseQuestion from './TrueFalseQuestion';
import Score from './Score';


function mergeAndRemoveDuplicates(...arrays) {
    // 使用 Set 去重，并将结果转换回数组
    return [...new Set(arrays.flat())];
}

const ErrorQuestion = ({q}) => {
    let questionDom = null;
    switch (q.type) {
        case 'single_choice':
            questionDom = (
                <SingleChoiceQuestion
                    key={q.id}
                    question={q}
                />
            );
            break
        case 'multiple_choice':
            questionDom = (
                <MultipleChoiceQuestion
                    key={q.id}
                    question={q}
                />
            );
            break
        case 'true_false':
            questionDom = (
                <TrueFalseQuestion
                    key={q.id}
                    question={q}
                />
            );
            break
        default:

    }
    return <View>
        {questionDom}
        <View>你的答案：{q.userAnswer} 正确答案：{q.answer}</View>
    </View>
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
    const [pageNo, setPageNo] = useState(1);
    const [questionsPerPage, setQuestionsPerPage] = useState(10);
    const [showErrorModal, setShowErrorModal] = React.useState(false);
    const [currentWQuestion, setCurrentWQuestion] = useState(null);
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const handlePageChange = (newPageNo) => {
        Taro.pageScrollTo({
            scrollTop: 0,  // 设置滚动到顶部
            duration: 300  // 滚动动画的持续时间，单位为毫秒
        });
        setPageNo(newPageNo);
    }

    const currentQuestions = useMemo(() => {
        return questions.slice((pageNo - 1) * questionsPerPage, pageNo * questionsPerPage);
    }, [questions, questionsPerPage, pageNo])

    const handleAnswerSubmit = (id, userAnswer, correctAnswer) => {
        if (!userAnswer) {
            Toast.show('请选择答案', {
                type: 'fail',
            })
            return
        }
        setUserAnswers({...userAnswers, [id]: userAnswer});

        // 判断答案是否正确
        const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);
        if (!isCorrect) {
            Toast.show('答题错误，正确答案是' + correctAnswer, {
                type: 'fail',
            })
        } else {
            Toast.show('恭喜你回答正确', {
                type: 'success'
            })
        }
        questions.forEach(item => {
            if (item.id === id) {
                item.userAnswer = userAnswer;
                item.hasSubmit = true;
                item.isCorrect = isCorrect;
            }
        })
    };
    const wrongQuestions = questions.filter(item => {
        return item.hasSubmit && !item.isCorrect
    })

    const reset = () => {
        setPageNo(1);
        setUserAnswers({});
        questions.forEach(item => {
            item.hasSubmit = false;
            item.userAnswer = null;
            item.isCorrect = null;
        })
    }

    return (
        <View className="question-box">
            <Score questions={questions} userAnswers={userAnswers} wrongQuestions={wrongQuestions}
                   setShowErrorModal={setShowErrorModal}/>
            {currentQuestions.map((q, index) => {
                q.pageNo = (pageNo - 1) * 10 + index + 1;
                return <View
                    className={`question ${q.hasSubmit && q.isCorrect ? 'right' : ''} ${q.hasSubmit && !q.isCorrect ? 'wrong' : ''}`}>
                    <Question key={q.id} q={q} handleAnswerSubmit={handleAnswerSubmit}></Question>
                    {q.hasSubmit && !q.isCorrect ?
                        <View style={{fontSize: '14px'}}><Text style={{color: 'red'}}>回答错误</Text> {q.answer &&
                            <Text>正确答案：{q.answer}</Text>}</View>
                        : null}
                    {q.hasSubmit && q.isCorrect ?
                        <Text style={{color: 'green', fontSize: '14px'}}>回答正确</Text>
                        : null}
                </View>
            })}
            <View className="page">
                <Pagination mode="simple" pageSize={questionsPerPage} value={pageNo} total={questions.length - 1}
                            onChange={handlePageChange}/>
                {/*<button onClick={reset}>重做</button>*/}
            </View>
            <Dialog
                visible={showQuestionModal}
                title="错误题目"
                footer={null}
                onCancel={() => setShowQuestionModal(false)}
            >
                <ErrorQuestion q={currentWQuestion}></ErrorQuestion>
            </Dialog>
            <Dialog
                className="error-modal"
                visible={showErrorModal}
                title="答题情况"
                footer={null}
                onCancel={() => setShowErrorModal(false)}
            >
                {
                    questions.map((item, index) => {
                        let text = null
                        if (item.hasSubmit && item.pageNo) {
                            if (!item.isCorrect) {
                                text = <Text className="q-box error">{item.pageNo}</Text>
                            } else {
                                text = <Text className="q-box right">{item.pageNo}</Text>
                            }
                        }
                        return <Text onClick={() => {
                            setShowErrorModal(false)
                            setShowQuestionModal(true);
                            setCurrentWQuestion(item);
                        }}>
                            {text}{index % 10 === 0 ? <View></View> : null}
                        </Text>
                    })
                }

            </Dialog>
        </View>
    );
};

export default Questions;
