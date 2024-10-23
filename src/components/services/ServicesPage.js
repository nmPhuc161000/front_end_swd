import React from 'react';
import './ServicePage.css';
import { PetServices } from '../../servicesData';
import { Link } from 'react-router-dom';
import { CardHome } from '../../custom/cardItem/CardItem';

export default function ServicesPage() {
    return (
        <div className="service-page">
            <h1 className="title">Our Services</h1>
            <div className="service-list">
                {PetServices.map((item, index) => (
                    <Link to={`/detail/${item.id}`}>
                        <CardHome key={index} item={item} />
                    </Link>
                ))}
            </div>  
        </div>
    );
}
