import React from 'react'

export default function TableFilter( {filter,setFilter}) {
    return (
        <span>
          SEARCH {''}
          <input className="searchbar" value={filter} onChange={e=>setFilter(e.target.value)}/>  
        </span>
    )
}
