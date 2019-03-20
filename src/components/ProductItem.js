import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'


class ProductItem extends Component {
    state = {
        view : false
    }

    addTocart = (id, qty) => {

        if (this.props.username !== '') {
            axios.get(`http://localhost:1996/products`, {
            params : {
                id: id
            }
            }).then(res => {
                axios.get('http://localhost:1996/carts', {
                    params : {
                        productId : id,
                        username : this.props.username
                    }
                }).then (cartRes => {
                    if (cartRes.data.length > 0) {
                        var total = cartRes.data[0].productqty
                        axios.put(`http://localhost:1996/carts/${cartRes.data[0].productId}` ,{
                            username: this.props.username,
                                productId: cartRes.data[0].productId,
                                productName: cartRes.data[0].productName,
                                productDesc: cartRes.data[0].productDesc,
                                productPrice: cartRes.data[0].productPrice,
                                productSource: cartRes.data[0].productSource,
                                productqty: total + qty
                        })
                    } else {
                        axios.post('http://localhost:1996/carts' ,{
                                username: this.props.username,
                                productId: res.data[0].id,
                                productName: res.data[0].name,
                                productDesc: res.data[0].desc,
                                productPrice: res.data[0].price,
                                productSource: res.data[0].src,
                                productqty: qty
                            })
                    }
                })
            })
        } else {
            this.setState({view: !this.state.view})
        }
    }


    render () {
        const {item} = this.props
        return (
            <div className="card col-3 m-3" style={{ width: "18rem" }} key={item.id}>
                <img src={item.src} className="card-img-top" alt={item.name} />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.desc}</p>
                    <p className="card-text">Rp {item.price.toLocaleString('In')}</p>
                    <input ref={(input) => {this.qty = input}}className="form-control" type="number" defaultValue={1}/>
                    <Link to={"/detailproduct/" + item.id}><button className="btn btn-secondary btn-block btn-sm my-2">Detail</button></Link>
                    <button onClick={() => this.addTocart(item.id, parseInt(this.qty.value))} className="btn btn-primary btn-block btn-sm my-2">Add to Cart</button>

                    {this.state.view ? <Redirect to='/login'></Redirect>: null}
                </div>
            </div>
        )
    }
}

const mapsStateToProps = (state) => {
    return {
        username: state.auth.username
    }
}

export default connect(mapsStateToProps) (ProductItem)