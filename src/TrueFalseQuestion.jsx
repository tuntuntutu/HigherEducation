import React, {useState} from 'react';

const TrueFalseQuestion = ({question, onSubmit}) => {
    const [answer, setAnswer] = useState(null);

    const handleSubmit = () => {
        onSubmit(question.id, answer, question.answer);
    };

    return (
        <div>
            <h3>{question.question}</h3>
            {
                onSubmit ? <>
                    <div>
                        <input
                            type="radio"
                            value="true"
                            checked={answer === true}
                            onChange={() => setAnswer(true)}
                        />
                        True
                    </div>
                    <div>
                        <input
                            type="radio"
                            value="false"
                            checked={answer === false}
                            onChange={() => setAnswer(false)}
                        />
                        False
                    </div>
                </> : <>
                    <div>True</div>
                    <div>False</div>
                </>
            }
            {
                onSubmit ? <button className="submit" onClick={handleSubmit}>提交</button> : null
            }
        </div>
    );
};

export default TrueFalseQuestion;
