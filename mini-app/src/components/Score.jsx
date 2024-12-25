import React from 'react';
import { View, Text } from '@tarojs/components'
import { Tag, Sticky } from '@nutui/nutui-react-taro'


const Score = ({questions, userAnswers, wrongQuestions, setShowErrorModal}) => {
    const correctAnswersCount = questions.reduce((score, question) => {
        const correctAnswer = question.answer;
        const userAnswer = userAnswers[question.id];
        return JSON.stringify(userAnswer) === JSON.stringify(correctAnswer) ? score + 1 : score;
    }, 0);
    const showErrorModal = () => {
        setShowErrorModal(true);
    }

    return (
        <Sticky threshold={0}>
            <View className="score">
                <View>得分：{correctAnswersCount} / {questions.length}</View>
                <Tag type="info" onClick={showErrorModal}>答题记录</Tag>
            </View>
        </Sticky>
    );
};

export default Score;
