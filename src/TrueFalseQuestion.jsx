import React, {useState} from 'react';
import {Radio, Space} from "antd";

const TrueFalseQuestion = ({question, onSubmit}) => {
    const [answer, setAnswer] = useState(null);

    const handleSubmit = () => {
        onSubmit(question.id, answer, question.answer);
    };

    return (
        <div>
            <h3>【{question.pageNo}】{question.question}</h3>
            <Radio.Group
                disabled={!onSubmit}
                onChange={(e) => {
                    setAnswer(e.target.value)
                }} value={answer}>
                <Space direction="vertical">
                        <Radio value="T">True</Radio>
                        <Radio value="F">False</Radio>
                </Space>
            </Radio.Group>
            {
                onSubmit ? <button className="submit" onClick={handleSubmit}>提交</button> : null
            }
        </div>
    );
};

export default TrueFalseQuestion;
