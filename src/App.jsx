import React, {} from 'react';
import Questions from './Questions.jsx';
import sessions from './sessions'
import './App.css';

const getRandomItemFromListByCount = (list, count) => {
    const randomList = [];
    for(let i = 0; i < count; i++){
        const randomIndex = Math.floor(Math.random()*list.length);
        randomList.push(list[randomIndex]);
        list.splice(randomIndex, 1);
    }
    return randomList;
}
const App = () => {
    const [questions, setQuestions] = React.useState([]);
    const [sessionTitle, setSessionTitle] = React.useState(null);
    const goToSessionQuestion = (session) => () => {
        setSessionTitle(session.type)
        setQuestions(session.questions.single_choice.concat(session.questions.multiple_choice, session.questions.true_false));
    }
    const goToRandomQuestion = ()=>{
        const single_choice_list = sessions.reduce((ret, item)=>{
            return ret.concat(item.questions.single_choice)
        }, [])
        const multiple_choice_list = sessions.reduce((ret, item)=>{
            return ret.concat(item.questions.multiple_choice)
        }, [])
        const true_false_list = sessions.reduce((ret, item)=>{
            return ret.concat(item.questions.true_false)
        }, [])
        const single_choice = getRandomItemFromListByCount(single_choice_list, 40)
        const multiple_choice = getRandomItemFromListByCount(multiple_choice_list, 40)
        const true_false = getRandomItemFromListByCount(true_false_list, 20)
        setQuestions([...single_choice, ...multiple_choice, ...true_false])
        setSessionTitle('随机出题')
    }
    const selectSession = () => {
        setQuestions([]);
    }

    return (
        <div>

            {
                questions.length > 0 ? <>
                        <div className="select-session" onClick={selectSession}> ◀️ 选择课题
                        <h2>{sessionTitle}</h2>
                        </div>
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
                                        onClick={goToSessionQuestion(session)}>{session.type}</h2>
                                );
                            })
                        }
                        <h2 className="session" key="random"
                            onClick={goToRandomQuestion}>随机出题</h2>
                    </div>
            }
        </div>
    );
};

export default App;
