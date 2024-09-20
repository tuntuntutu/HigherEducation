import React, {useState} from 'react';

const MultipleChoiceQuestion = ({question, onSubmit}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (option) => {
        setSelectedOptions((prev) =>
            prev.includes(option)
                ? prev.filter((o) => o !== option)
                : [...prev, option]
        );
    };

    const handleSubmit = () => {
        onSubmit(question.id, selectedOptions, question.answer);
    };

    return (
        <div>
            <h3>{question.question}</h3>
            {question.options.map((option, index) => (
                <div key={index}>
                    {
                        onSubmit ? <>
                            <input
                                id={question.id + option}
                                type="checkbox"
                                value={option}
                                checked={selectedOptions.includes(option)}
                                onChange={() => handleChange(option)}
                            />
                            <label htmlFor={question.id + option}>
                                {option}
                            </label>
                        </> : option
                    }
                </div>
            ))}
            {
                onSubmit ? <button className="submit" onClick={handleSubmit}>提交</button> : null
            }
        </div>
    );
};

export default MultipleChoiceQuestion;
