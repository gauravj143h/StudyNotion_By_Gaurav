import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className='text-white'>
      We are passionate about revolutionzing the way we learn our innovative platform
      <HighlightText text={"combines technology"} />
      <span className='text-yellow-300'>
        {" "}
        expertise
      </span>
      , and community to create an'<span>
        unparalleled education experience
      </span>
    </div>
  )
}

export default Quote
