import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../css/transaction.css'
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';



const Transaction = props => (
    <tr>
        <td>{props.transactionExpenses.year}</td>
        <td>{props.transactionExpenses.month}</td>
        <td>{props.transactionExpenses.day}</td>
        <td>{props.transactionExpenses.reason}</td>
        <td>{props.transactionExpenses.amount}</td>
        <td>{props.transactionExpenses.issuedPerson}</td>
        <td>
            <button className = 'edit'><Link to = {"/edittransaction/"+props.transactionExpenses._id } className="link">Edit</Link></button> | <button className = 'delete' onClick ={() => {props.deleteTransaction(props.transactionExpenses._id)}}>Delete</button>
        </td>
    </tr>
)


export default class TransactionExpensesList extends Component {

    constructor(props){
        super(props);

        this.deleteTransaction = this.deleteTransaction.bind(this);

        this.state = {transactionExpenses : []};
    }


    componentDidMount() {
        axios.get('http://localhost:5000/transactionExpenses/')
        .then(response => {
            this.setState({ transactionExpenses : response.data })
        })
        .catch((error) => {
            console.log(error);
        })
        }

        deleteTransaction(id){
            axios.delete('http://localhost:5000/transactionExpenses/' +id)
            .then(res => console.log(res.data));
            this.setState({
                transactionExpenses : this.state.transactionExpenses.filter(el => el._id !== id)
            })
        }

        transactionList(){
            return this.state.transactionExpenses.map(currenttransaction => {
                return <Transaction transactionExpenses = {currenttransaction} deleteTransaction = {this.deleteTransaction} key = {currenttransaction._id}/>;
            })
        }

    render() {
        return (
            <div >
            
            
            <Card className = "list">
            <table className = "topic">
                    <tr>
                        <th><h3>Transactions</h3></th>
                        <td><button className = "add" ><Link to = {"/createtransaction" } className = "linkaddE">Add New Transaction</Link></button></td>
                    </tr>
                </table>
            
            
            
                <CardContent>
                <table className = "tbtransaction">
                
                    <tr>
                        <th className = "tbhead" >Year</th>
                        <th className = "tbhead">Month</th>
                        <th className = "tbhead">Date</th>
                        <th className = "tbhead">Reason</th>
                        <th className = "tbhead">Amount</th>
                        <th className = "tbhead">Issued Person</th>
                        <th className = "tbhead">Actions</th>
                    </tr>
                
                <tbody>
                    { this.transactionList() }
                </tbody>
            </table>
            </CardContent>
            </Card>
        </div>
        )
    }
}