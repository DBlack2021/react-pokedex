import React from 'react'
import { Button } from '@material-ui/core'

//code from https://github.com/WebDevSimplified/React-Pokemon-Pagination

export default function NavButtons({ id, gotoPrevPage, gotoNextPage }) {
    return (
      <div>
          <Button disabled={!(id - 1)} onClick={gotoPrevPage}>Previous</Button>
          <Button disabled={!(id < 805)} onClick={gotoNextPage}>Next</Button>
      </div>
    )    
}
