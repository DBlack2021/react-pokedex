import React from 'react'

//code from https://github.com/WebDevSimplified/React-Pokemon-Pagination

export default function NavButtons({ gotoPrevPage, gotoNextPage }) {
    return (
      <div>
          {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
          {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
      </div>
    )    
}
