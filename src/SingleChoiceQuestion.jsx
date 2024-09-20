import React, {useState} from 'react';

const SingleChoiceQuestion = ({question, onSubmit}) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSubmit = () => {
        onSubmit(question.id, selectedOption.split('.')[0], question.answer);
    };

    return (
        <div>
            <h3>【{question.pageNo}】{question.question}</h3>
            {question.options.map((option, index) => (
                <div key={index}>
                    {
                        onSubmit ? <>
                            <input
                                id={question.id + option}
                                type="radio"
                                value={option}
                                checked={selectedOption === option}
                                onChange={() => setSelectedOption(option)}
                            />
                            <label htmlFor={question.id + option}>
                                {option}
                            </label>
                        </>: option
                    }
                </div>
            ))}
            {
                onSubmit ? <button className="submit" onClick={handleSubmit}>提交</button> : null
            }

        </div>
    );
};

export default SingleChoiceQuestion;
