import React from "react";
import './Cart.css'
import Button from "../Button/Button";

function Cart(props){
    let cartAddTrainHandler = () => {
        props.setPage((currPage)=> currPage - 1)
    }
    let cartData = props.totalData;

    const trainType = localStorage.getItem('trainType')

    if(!cartData.hasOwnProperty(trainType)) {
        cartData[trainType] = []
    }

    let cartResult = cartData[trainType].map((item,i)=>{
        return <div className='cart__result--line' key={i++}>
            {`${i+1}. ${[item.type]} : ${[item.weight]} кг.,  ${item.reps} ${item.reps.length===0 ? '':'раз,'} ${item.time} ${item.time.length===0 ? '':'сек.'};`}
        </div>

    })
    let buttonResult = (cartData[trainType].length !== 0 ? (<Button title={'Записать'} type={'add'} onClick={cartAddTrainHandler}/>) : '')

    return(
        <>
            <div className={`cart__result ${cartData.length === 0 ? 'empty' : ''}`}>
                {trainType}
                {cartResult}
                {buttonResult}
            </div>
        </>
    )
}

export default Cart