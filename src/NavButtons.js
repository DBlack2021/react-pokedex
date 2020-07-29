import React from 'react'
import { Button } from '@material-ui/core'

//code from https://github.com/WebDevSimplified/React-Pokemon-Pagination

export default function NavButtons({ id, gotoPrevPage, gotoNextPage }) {
    return (
      <div>
          {(id - 1) ? <Button onClick={gotoPrevPage}>Previous</Button> : ""}
          {(id < 805) && <Button onClick={gotoNextPage}>Next</Button>}
      </div>
    )    
}
