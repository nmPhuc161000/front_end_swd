import React from 'react'
import "./LayoutService.css";
import { PetServices } from '../../../../servicesData';
import { CardHome } from '../../../../custom/cardItem/CardItem';
import { Link } from 'react-router-dom';

export default function LayoutServices() {
    return (
        <div className='layout-service'>
            <div className='title-service'><h2>Danh Mục Các Dịch Vụ</h2></div>
            <div className='items-service'>
                {PetServices.map((item, index) => (
                    <Link to={`/detail/${item.id}`}>
                        <CardHome key={index} item={item} />
                    </Link>
                ))}
            </div> 
        </div>
    )
}
