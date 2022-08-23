import React, {useRef} from "react";
import './System.css'
import Button from "../Button/Button";


const System = (props) => {

    const minutesEM = useRef()
    const minutesAM = useRef()
    const minutesOT = useRef()
    const test = useRef()

    let onSelectTrainType = (event) => {
        let id = event.target.id
        localStorage.setItem('trainType', `${id === '1' && ('EMOM ' + minutesEM.current.value) || id === '2' && ('AMRAP ' + minutesAM.current.value) || id === '3' && ('OTHER ' + minutesOT.current.value)}`);
        props.setPage((currPage) => currPage + 1)
    }
    console.log(props.dataForClass)

return(
    <>
        <div className='trainTypes'>
            <form action="" className="types__input">

                <div className={`emom ${Object.keys(props.dataForClass).some(i=> i.includes('EMOM')) && 'active'}`}>
                    <p className='types__tittle' ref={(c)=>(test.textContent = 'EMOM')}>EMOM</p>
                    <input className='input__traintype' type="text" placeholder='мин.' inputMode={"decimal"} ref={minutesEM}/>
                    <Button title={'Добавить'} type={'add'} onClick={onSelectTrainType} id={'1'}/>
                </div>

                <div className={`amrap ${Object.keys(props.dataForClass).some(i=> i.includes('AMRAP')) && 'active'}`}>
                    <p className='types__tittle' ref={(d)=>(test.textContent = 'AMRAP')}>AMRAP</p>
                    <input className='input__traintype' type="text" placeholder='мин.' inputMode={"decimal"} ref={minutesAM}/>
                    <Button title={'Добавить'} type={'add'} onClick={onSelectTrainType} id={'2'}/>
                </div>

                <div className={`other ${Object.keys(props.dataForClass).some(i=> i.includes('OTHER')) && 'active'}`}>
                    <p className='types__tittle' ref={(d)=>(test.textContent = 'OTHER')}>OTHER</p>
                    <input className='input__traintype' type="text" placeholder='мин.' inputMode={"decimal"} ref={minutesOT}/>
                    <Button title={'Добавить'} type={'add'} onClick={onSelectTrainType} id={'3'}/>
                </div>
                {Object.keys(props.dataForClass).length === 0 ?'':<Button title={'Записать тренировку'} type={'add'} onClick={props.onAddingTrain}/>}



        </form>
        </div>

    </>
)
}

export default System
