import React from 'react'
import './LinkWithicon.css'
function LinkWithicon({title,link, emogi,sidebar}) {
  return (
    <a href={link} className={sidebar?'align_center sidebar_links':'align_center'}>{title} <img src={emogi} alt="" className='link_emogi' /></a>
  )
}

export default LinkWithicon
