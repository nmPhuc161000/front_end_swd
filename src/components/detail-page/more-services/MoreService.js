import React from 'react'
import "./MoreService.css"
import { CardHome } from '../../../custom/cardItem/CardItem'
import { Link } from 'react-router-dom'
import { fakeData } from '../../../fakeData'

export default function MoreService() {
  return (
    
    <>
        {fakeData.map((item, index) => (
          <Link to={`/detail/${item.id}`}>
            <CardHome key={index} item={item} />
          </Link>
        ))}
    </>
  )
}
