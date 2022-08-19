import React, {useRef, useState} from "react";
import './Card.css'
import Button from "../Button/Button";
import {FaCheck} from "react-icons/fa";

let total = {}; //объекьт

function Card(props){

const {title, Image} = props.food

const enteredKG = useRef();
const enteredRep = useRef();
const enteredSec = useRef();

const trainType = localStorage.getItem('trainType')
if(!total.hasOwnProperty(trainType)) {
    total[trainType] = []
}

const [trainAdded, setTrainAdded] = useState(false)

const addTrainHandler = (event) => {
    event.preventDefault()
    const kg = enteredKG.current.value;
    const rep = enteredRep.current.value;
    const sec = enteredSec.current.value;
    total[trainType].push({ type: title, weight: kg, reps: rep, time: sec });
    console.log(total);
    props.onSetCartItems(total);
    event.target.blur();
    setTrainAdded(true);
    enteredKG.current.value = '';
    enteredRep.current.value = '';
    enteredSec.current.value = '';

    }
// npm i react-icons
const buttonBlock = trainAdded === false ? (<Button title={'Добавить'} type={'add'} onClick={addTrainHandler} />) : (<Button title={<FaCheck />} type={'checkout'}  onClick={addTrainHandler}/>)
    return(
        <div className={'card'}>
            <div className="image__container">
                <img src={Image} alt={title}/>
            </div>
            <div className='yellow__tag'>
                <h4 className="card__title">
                    {title}
                </h4>
                <form action="" className="card__inputs">

                    <div className="card__weight"><input className="card__weight--color" type="text" placeholder='кг' inputMode={"decimal"} ref={enteredKG}/></div>
                    <div className="card__reps"><input className="card__reps--color" type="text" placeholder='кол-во' inputMode={"decimal"} ref={enteredRep}/></div>
                    <div className="card__time"><input className="card__time--color" type="text" placeholder='сек' inputMode={"decimal"} ref={enteredSec}/></div>
                    <div className="btn__container">
                        {buttonBlock}
                    </div>
                </form>
            </div>
            {/*<div className="btn__container">*/}
            {/*    <Button title={'+'} type={'add'} onClick={handleIncrement} />*/}
            {/*    {count !==0 ? (<Button title={'-'} type={'remove'} onClick={handleDecrement} />) : ('')}*/}
            {/*</div>*/}

        </div>
    )
}

export default Card

