import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { Button, Sticky } from '@nutui/nutui-react-taro'
import './index.css'
import Questions from "../../../components/Questions";
import sessions from "./sessions";
import '@nutui/nutui-react-taro/dist/style.css'
import './index.css'

const getRandomItemFromListByCount = (list, count) => {
  const randomList = [];
  for(let i = 0; i < count; i++){
    const randomIndex = Math.floor(Math.random()*list.length);
    randomList.push(list[randomIndex]);
    list.splice(randomIndex, 1);
  }
  return randomList;
}
const sessionObj = {
    'single_choice': '单选题',
    'multiple_choice': '多选题',
    'true_false': '判断题'
}
const flatSession = (sessions)=>{
  return sessions.reduce((ret, item)=>{
    Object.keys(item.questions).forEach((key) => {
      if (item.questions[key].length > 0) {
        ret.push({
          title: item.type + "(" + sessionObj[key] + ")",
          type: item.type,
          questions: item.questions[key],
        })
      }
    })

    return ret;
  }, [])
}

function Index() {
  const [questions, setQuestions] = React.useState([]);
  const [sessionTitle, setSessionTitle] = React.useState(null);
  const goToSessionQuestion = (session) => () => {
    setSessionTitle(session.title)
    setQuestions(session.questions);
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
      <View>
        {
          questions.length > 0 ? <>
                <Sticky threshold={10} zIndex={3000}> <Button color="black" onClick={selectSession}>返回</Button></Sticky>
                <Questions questions={questions}/>
              </> :
              <View style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
                justifyContent: 'center'
              }
              }>
                {
                  flatSession(sessions).map((session) => {
                    return (
                        <h2 className="session" key={session.type}
                            onClick={goToSessionQuestion(session)}>{session.title}</h2>
                    );
                  })
                }
                <h2 className="session" key="random"
                    onClick={goToRandomQuestion}>随机出题</h2>
              </View>
        }
      </View>
  )
}

export default Index
