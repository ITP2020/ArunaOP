import React, { Component } from 'react';
import axios from 'axios';

import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';

export default class CreateUser extends Component {

    constructor(props){

        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            username :'',
        }
    }


    onChangeUsername(e){

        this.setState({
            username:e.target.value
        });
    }

    onSubmit(e){

            e.preventDefault();
    
            const user = {
    
                username : this.state.username,
                
            }
    
            console.log(user);

            axios.post('http://localhost:5000/users/add',user)
            .then(res => console.log(res.data));
            
            
            
    
           this.setState({

                username:''
            })
    }

    
    render() {
        return (
            <div>
                <Card className = "addcard" >
            
            <div className = "formdiv">
            <CardContent >
                 <h2 className = "billheading"><b>Add new supervisor</b></h2>
                 <h5><i>You can add new supervisor from here</i></h5>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Add Supervisor" className="btn-bill" />
          </div>
        </form>
        </CardContent>
        </div>
        </Card>
            </div>
        )
    }
}