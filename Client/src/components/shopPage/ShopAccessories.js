import React from 'react'
import './ShopAccessories.scss'
import men from '../../Assets/images/men.avif'
import women from '../../Assets/images/women.avif'
import kids from '../../Assets/images/kids.avif'
import { ApparelButton } from '../Styled';

export default function ShopAccessories() {
  return (
    <>
      <div className="apparel">
        <div className="accessories-container">
          <img src={men} alt="men's clothing" />
          <div className="apparel-text">
            <h1>Trang phục nam</h1>
            <ApparelButton>MUA NGAY</ApparelButton>
          </div>
        </div>
        <div className="accessories-container">
          <img src={women} alt="women's clothing" />
          <div className="apparel-text">
            <h1>Trang phục nữ</h1>
            <ApparelButton>MUA NGAY</ApparelButton>
          </div>
        </div>
        <div className="accessories-container">
          <img src={kids} alt="kids' clothing" />
          <div className="apparel-text">
            <h1>Trang phục trẻ em</h1>
            <ApparelButton>MUA NGAY</ApparelButton>
          </div>
        </div>
      </div>
    </>

  )
}
