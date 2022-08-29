import React from "react";
import './Search.css'
import {FaSearch} from "react-icons/fa";
const Search = (props) => {
    const enteredTrainValueHandler = (event) => {

        props.onSearchValue(event.target.value)
    }
return(
    <>
        <div className='general__form'>
            <form action="" className="search__train">
                <FaSearch className='search__icon'/>
                <input type="text" placeholder='Поиск по названию...' className='search__input'  onChange={enteredTrainValueHandler} value={props.searchCopy}/>
            </form>
        </div>
    </>
)
}

export default Search