import React from 'react'

class CheckOut extends React.Component {
    renderCheckOut = () => {
        return this.props.cart.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.productName}</td>
                    <td>{item.productqty}</td>
                    <td>Rp {item.productPrice.toLocaleString('In')}</td>
                    <td>Rp {(item.productPrice * item.productqty).toLocaleString('In')}</td>
                </tr>
            )
        })
    }
    
    totalShopping = () => {
        let total = 0

        for (let i = 0; i < this.props.cart.length; i++) {

            total = total + (this.props.cart[i].productPrice * this.props.cart[i].productqty)

        }
        return total.toLocaleString('In')
    }

    render() {
        return (
            <div>
                <h1 className="display-4 text-center">Check Out</h1>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">QUANTITY</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCheckOut()}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><b>TOTAL PURCHASE :</b></td>
                            <td>Rp {this.totalShopping()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CheckOut