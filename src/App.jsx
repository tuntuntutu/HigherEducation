import React, {} from 'react';
import Questions from './Questions.jsx';
import sessions from './sessions.json'
import './App.css';

const App = () => {
    const [questions, setQuestions] = React.useState([]);
    const goToSessionQuestion = (list) => () => {
        setQuestions(list.single_choice.concat(list.multiple_choice, list.true_false));
    }
    const selectSession = () => {
        setQuestions([]);
    }

    return (
        <div>

            {
                questions.length > 0 ? <>
                        <div className="select-session" onClick={selectSession}> ◀️ 选择课题</div>
                        <Questions questions={questions}/>
                    </> :
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '10px',
                        justifyContent: 'center'
                    }
                    }>
                        {
                            sessions.map((session) => {
                                return (
                                    <h2 className="session" key={session.type}
                                        onClick={goToSessionQuestion(session.questions)}>{session.type}</h2>
                                );
                            })
                        }
                    </div>
            }
        </div>
    );
};

export default App;
