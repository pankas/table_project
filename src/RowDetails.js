import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const id = localStorage.getItem('id');

class RowDetails extends React.Component{
        constructor(prop){
            super(prop);
            this.state={
                full_name:'',
                employee:[{
                    // full_name:'',
                    company:'',
                    city:'',
                    state:'',
                    zip:'',
                    email:'',
                    web:'',
                    age:null
                }],
                details:['Company','City',]
            }
        }
   
            
    componentDidMount(){
        let url = 'https://demo9197058.mockable.io/users'
        this.getData(url);
    }
    getData(url){
        axios.get(url).then(res =>{
            const data = res.data;
            let newarr = []
            data.map(val =>{
                if(val.id == id){
                    for(var i in val){
                        newarr.push(val[i])
                    }
                    console.log(newarr)
                    // this.setState({
                    //     employee:val
                    // })
                }
                this.setState({
                    full_name:  `${newarr[1]} ${newarr[2]}`,
                        employee:[{
                            // full_name:`${newarr[1]} ${newarr[2]}`,
                            Company: newarr[3],
                            City:newarr[4],
                            State:newarr[5],
                            Pin:newarr[6],
                            Email:newarr[7],
                            Web:newarr[8],
                            Age:newarr[9]
                        }]
                })
            })
            // if(res.data.id == id)
            //     console.log(res)
                
                console.log(this.state.employee)
                console.log(this.state.employee[0].full_name)
        }).catch(err =>{
            console.log(err)
        })
    }

    back = ()=>{
            localStorage.clear();
            window.location = '/'
            // this.history.push("/");
    }
        

    componentWillUnmount(){
        localStorage.clear();
    }

    render(){
        
        // const name = this.state.employee.first_name + this.state.employee.last_name
        return(
            <div className="container" style={{marginTop:"2%"}}>
                 <h2 className="disp">   {this.state.full_name}</h2>
                 <div className="table-responsive">
                    <table  className="table table-hover">
                    <tbody>
                        {Object.entries(this.state.employee[0]).map(([key,value]) =>{
                            return(
                        <tr>
                            <td>{key}</td>
                            <td>{value}</td>
                            </tr>)}
                        )} 
                    {/* {filteredEmployee.map(employee => {
                       return this.renderTable(employee);
                    })} */}
                    </tbody>
                </table>
                </div>
                <br/>
                <Link to='/'><button to="/" type="button" class="btn btn-info disp" >Back</button></Link>
            </div>
        )
    }
}

export default RowDetails;