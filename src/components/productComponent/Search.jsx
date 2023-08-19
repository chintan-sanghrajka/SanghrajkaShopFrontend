import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Search = () => {
    const [userSearch, setUserSearch] = useState('')
    const navigate = useNavigate()

    const onCHangeHandler = (event) => {
        setUserSearch(event.target.value)
    }
    const onSubmitHandler = async () => {
        navigate(`products/${userSearch}`)
        setUserSearch("")
    }
    return (
        <>
            <div className='w-100'>
                <div className='search_div'>
                    <input type="text" className='search_box' onChange={onCHangeHandler} value={userSearch} placeholder='Search Sanghrajka Shop' />
                    <button className='search_button' onClick={onSubmitHandler}><i className="bi bi-search"></i></button>
                </div>
            </div>
        </>
    );
}

export default Search;