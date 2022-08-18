import './App.css';
import Cart from "./Components/Cart/Cart";
import Card from "./Components/Card/Card";
import {useState,useEffect} from "react";
import System from "./Components/System/System";

const { getData } = require('./db/db')
const foods = getData()

const tele = window.Telegram.WebApp;


function App() {

    let [page, setPage] = useState(0)

    let [test, setTest] = useState({})
    useEffect(()=> {
        tele.ready()
        tele.enableClosingConfirmation()

    })
    const totalDataHandler = (enteredTotal) => {
        // let totalData = [
        //     ...enteredTotal
        // ]
        // console.log(totalData)
        // setTest(totalData)
        let totalData = JSON.parse(JSON.stringify(enteredTotal));
        setTest(totalData)
        console.log(test)
    }
    const onAddingTrain = (event)=>{
        event.preventDefault()
        let showDate = new Date()

        // let queryData = `📅  ${showDate.getDate()}.${('0' + (showDate.getMonth()+1)).slice(-2)} \n\n ${test.map(i=>`${(i.type).bold()}\n ⚖️ ${i.weight} кг\n ${i.reps.length===0 ? '⏱ '+ i.time + ' сек' : '🔁 ' + i.reps + ' раз'}\n`).join('\n')}`
        let queryData = `⠀⠀⠀⠀⠀📅  ${showDate.getDate()}.${('0' + (showDate.getMonth() + 1)).slice(-2)}  📅`
        for (let trainType in test) {
            // queryData += `${trainType} \n ${test[trainType].map(i=>`${(i.type).bold()}\n ⚖️ ${i.weight} кг\n ${i.reps.length===0 ? '⏱ '+ i.time + ' сек' : '🔁 ' + i.reps + ' раз'}\n`).join('\n')}`
            queryData += `\n\n-- ${trainType} -- \n ${test[trainType].map(i=>`\n${(i.type).bold()} ${i.weight.length===0 ? '' : '\n⚖️ ' + i.weight + 'кг.'} ${i.reps.length===0 ? '' : '\n🔁 ' + i.reps + ' повт.'} ${i.time.length===0 ? '' : '\n⏱ '+ i.time + ' сек'}`).join('\n')}`
        }

        console.log(queryData)

        tele.MainButton.text = 'Записать тренировку'
        tele.MainButton.show()
        tele.onEvent('mainButtonClicked', function (){

            // tele.sendData(test)
            fetch(`https://api.telegram.org/bot5350443972:AAEOz3c1HrD27cmt90Wlrd6f2nc5X4PTBRo/answerWebAppQuery`, {
                method: 'POST',
                body: JSON.stringify({
                    web_app_query_id: tele.initDataUnsafe.query_id,
                    result: {
                        type: 'article',
                        id: 1,
                        title: 'test string',
                        input_message_content: {
                            message_text: queryData,
                            parse_mode: 'HTML'
                        }
                    }
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        })
    }


  return (<>
      {
      page === 0 ? <System setPage={setPage} onAddingTrain={onAddingTrain} dataForClass={test}/> : <div>
          <Cart totalData={test} onAddingTrain={onAddingTrain} setPage={setPage} />
          <div className="cards__container">
              {foods.map(food=>{
                  return <Card food={food} key={food.id} onSetCartItems={totalDataHandler}/>
              })}
          </div>
      </div>
      }

      </>
  );
}

export default App;
