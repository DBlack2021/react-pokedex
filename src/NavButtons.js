import React from 'react'

//code from https://github.com/WebDevSimplified/React-Pokemon-Pagination

export default function NavButtons({ id, gotoPrevPage, gotoNextPage }) {
    return (
      <div>
          {(id - 1) ? <button onClick={gotoPrevPage}>Previous</button> : ""}
          {(id < 805) && <button onClick={gotoNextPage}>Next</button>}
      </div>
    )    
}
