import React, {useState} from 'react';
import {Checkbox, Space} from 'antd';

const MultipleChoiceQuestion = ({question, onSubmit}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (checkedValues) => {
        setSelectedOptions(checkedValues);
    };

    const handleSubmit = () => {
        onSubmit(question.id, selectedOptions.map(item=> item.split('.')[0]).join(''), question.answer);
    };

    return (
        <div>
            <h3>【{question.pageNo}】{question.question}</h3>
            <Checkbox.Group
                disabled={!onSubmit}
                options={question.options.map(item=> ({value: item, label: item}))}
                value={selectedOptions}
                onChange={handleChange}
            />
            {
                onSubmit ? <button className="submit" onClick={handleSubmit}>提交</button> : null
            }
        </div>
    );
};

export default MultipleChoiceQuestion;
