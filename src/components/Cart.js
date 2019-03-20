import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import {Redirect} from 'react-router-dom'

import CheckOut from './CheckOut'

const cookie = new Cookies()

class Cart extends React.Component {
    state = {
        cart: [],
        show: false,
    }

    componentDidMount() {
        this.getCart()
    }

    getCart = () => {
        let username = cookie.get('masihLogin')
        axios.get('http://localhost:1996/carts', {
            params : {
                username
            }
        }).then(res => {
            
            this.setState({cart: res.data})
        })
    }

    onDeleteProduct = (id) => {
        axios.delete(`http://localhost:1996/carts/${id}`).then(res => {
            this.getCart()
        })
    }

    renderList = () => {
        return this.state.cart.map (item => {
            return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.productName}</td>
                        <td>{item.productDesc}</td>
                        <td>Rp {item.productPrice.toLocaleString('In')}</td>
                        <td><img src={item.productSource} alt={item.productDesc}/></td>
                        <td>{item.productqty}</td>
                        <button className='btn btn-danger mt-1' onClick={() => {this.onDeleteProduct(item.id)}}>Delete</button>
                    </tr>
            )
        })
    }

    checkOut = () => {
        this.setState({show: !this.state.show})
    }

    render() {
        if (cookie.get('masihLogin') !== undefined) {
            if (this.state.cart.length > 0) {
                return (
                    <div className="container">
    
                        <h1 className="display-4 text-center">Cart</h1>
                        <table className="table table-hover mb-5">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">DESC</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">PICTURE</th>
                                    <th scope="col">QUANTITY</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderList()}
                            </tbody>
                        </table>
                        
                        <div className='text-center'>
                            <button onClick={this.checkOut} className='btn btn-primary'>Check Out</button>
                        </div>
    
                        <div className='mt-5'>
                            {this.state.show == true ? <CheckOut cart={this.state.cart}/>: null}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className='container text-center mt-3'>
                        <h1>Silahkan Pilih Product Terlebih Dahulu</h1>
                    </div>
                )
            }
        } else {
            return (
                <Redirect to='/' />
            )
        }
    
    }
}

export default Cart