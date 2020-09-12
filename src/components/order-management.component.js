import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';
//import './home.css'

export default class OrderManagement extends Component {

    
    
    render() {
        return (
        <div >
            <Card className = "addcard" >
                <div >
                <CardContent >
            
            <button className = "btn-finance"><Link to = {"/order" }>Order Details</Link></button>
            

            </CardContent>
            </div>
            </Card>
                

    </div>

             
)
}
}
