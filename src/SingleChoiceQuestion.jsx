import React, {useState} from 'react';
import {Space, Radio} from 'antd'

const SingleChoiceQuestion = ({question, onSubmit}) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSubmit = () => {
        onSubmit(question.id, selectedOption.split('.')[0], question.answer);
    };

    return (
        <div>
            <h3>【{question.pageNo}】{question.question}</h3>
            <Radio.Group
                disabled={!onSubmit}
                onChange={(e) => {
                    setSelectedOption(e.target.value)
                }} value={selectedOption}>
                <Space direction="vertical">
                    {question.options.map((option, index) => (
                        <Radio value={option}>{option}</Radio>
                    ))}
                </Space>
            </Radio.Group>
            {
                onSubmit ? <button className="submit" onClick={handleSubmit}>提交</button> : null
            }

        </div>
    );
};

export default SingleChoiceQuestion;
