import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';
//import './home.css'

export default class FinanceManagement extends Component {

    
    
    render() {
        return (
        <div >
            <Card className = "addcard" >
                <div >
                <CardContent >
            
            <button className = "btn-finance"><Link to = {"/electricity" }>Electricity Expenses</Link></button>
            <button className = "btn-finance"><Link to = {"/water" }>Water Expenses</Link></button>
            <button className = "btn-finance"><Link to = {"/transaction" }>Money Transactions</Link></button>

            </CardContent>
            </div>
            </Card>
                

    </div>

             
)
}
}
