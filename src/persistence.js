import React from 'react'
import Customer from './data/customer.json'

function Persistence(){
    return (
        <div>
            {Customer.map((customer, index) => {
                return <h1> {customer.name} </h1>
                for(var key in customer){
                    customer[key];
                }
            })
        }
        </div>
    )
}

export default Persistence;