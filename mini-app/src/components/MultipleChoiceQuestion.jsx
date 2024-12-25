import React, {useState} from 'react';
import { View, Text } from '@tarojs/components'
import {Button, Checkbox} from '@nutui/nutui-react-taro'

const MultipleChoiceQuestion = ({question, onSubmit}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (checkedValues) => {
        setSelectedOptions(checkedValues);
    };

    const handleSubmit = () => {
        onSubmit(question.id, selectedOptions.map(item=> item.split('.')[0]).join(''), question.answer);
    };

    return (
        <View>
            <Text>【{question.pageNo}】{question.question}</Text>
            <Checkbox.Group
                disabled={!onSubmit}
                options={question.options.map(item=> ({value: item, label: item}))}
                value={selectedOptions}
                onChange={handleChange}
            />
            {
                onSubmit ? <Button className="submit" onClick={handleSubmit}>提交</Button> : null
            }
        </View>
    );
};

export default MultipleChoiceQuestion;
