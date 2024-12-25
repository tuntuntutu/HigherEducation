import React, {useState} from 'react';
import {View, Text} from '@tarojs/components'
import {Button, Radio} from '@nutui/nutui-react-taro'


const TrueFalseQuestion = ({question, onSubmit}) => {
    const [answer, setAnswer] = useState(null);

    const handleSubmit = () => {
        onSubmit(question.id, answer, question.answer);
    };

    return (
        <View>
            <View>【{question.pageNo}】{question.question}</View>
            <Radio.Group
                disabled={!onSubmit}
                onChange={(e) => {
                    setAnswer(e)
                }} value={answer}>
                <Radio value="T">True</Radio>
                <Radio value="F">False</Radio>
            </Radio.Group>
            {
                onSubmit ? <Button className="submit" onClick={handleSubmit}>提交</Button> : null
            }
        </View>
    );
};

export default TrueFalseQuestion;
