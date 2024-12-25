import React, {useState} from 'react';
import {View, Text} from '@tarojs/components'
import {Button, Radio} from '@nutui/nutui-react-taro'


const SingleChoiceQuestion = ({question, onSubmit}) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSubmit = () => {
        onSubmit(question.id, selectedOption.split('.')[0], question.answer);
    };

    return (
        <View>
            <View>【{question.pageNo}】{question.question}</View>
            <Radio.Group
                disabled={!onSubmit}
                onChange={(e) => {
                    setSelectedOption(e.toString())
                }}
                value={selectedOption}
            >
                {question.options.map((option) => (
                    <Radio value={option}>{option}</Radio>
                ))}
            </Radio.Group>
            {
                onSubmit ? <Button className="submit" onClick={handleSubmit}>提交</Button> : null
            }
        </View>
    );
};

export default SingleChoiceQuestion;
