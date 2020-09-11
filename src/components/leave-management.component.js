import React, {Component} from 'react';
import axios from 'axios';
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
            
            <button className = "btn-finance"><Link to = {"/leaves" }>Leave Details</Link></button>
            <button className = "btn-finance"><Link to = {"/salary" }>Salary Details</Link></button>
            

            </CardContent>
            </div>
            </Card>
                

    </div>

             
)
}
}