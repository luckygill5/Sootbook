import React, { useState } from 'react';
import locales from "../../Constants/en.json";
import AddNewProduct from './AddNewProduct/AddNewProduct';
import { ReactComponent as UserPlus } from "../../assets/images/user-plus.svg";
import { ReactComponent as Download } from "../../assets/images/download.svg";
import { ReactComponent as Setting } from "../../assets/images/settings.svg";
import { ReactComponent as List } from "../../assets/images/list.svg";
import { ReactComponent as UserSquare } from "../../assets/images/user-square-2.svg";
import './ProductMaster.scss'


function ProductMaster() {

    const [addProduct, setAddProduct] = useState(false)

    const handleAddNewProduct = () => {
        setAddProduct(true)
    }


    return (
        <div className='productMaster_container'>
            {addProduct ? <AddNewProduct /> :
                <div className='productMaster_content'>
                    <div className='headerFlexbox'>
                        <h5 className='title'>Product Master</h5>
                        <button className='addnewProduct' onClick={() => handleAddNewProduct()}>
                            <span className='icon'>
                                <UserPlus />
                            </span>
                            Add new product
                        </button>
                    </div>
                    <div className='contentSection'>
                        <div className='head-flexbox'>
                            <input type='text' className='searchBox' placeholder='Search Product'></input>
                            <div className='actionFlexBox'>
                                <button className='importBtn commonBtn' type='button'>
                                    <span className='icon'>
                                        <Download />
                                    </span>
                                    Import Product from Database
                                </button>
                                <button className='manageBtn commonBtn' type='button'>
                                    <span className='icon'>
                                        <Setting />
                                    </span>
                                    Manage
                                </button>
                                <button className='toggleView' type='button'>
                                    <List />
                                </button>
                                <button className='toggleView' type='button'>
                                    <UserSquare />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductMaster;