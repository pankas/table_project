import React from 'react';
import axios from 'axios';

const id = localStorage.getItem('id');

class RowDetails extends React.Component{
        constructor(prop){
            super(prop);
            this.state={
                employee:[{
                    full_name:'',
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
                        employee:[{
                            full_name:`${newarr[1]} ${newarr[2]}`,
                            company: newarr[3],
                            city:newarr[4],
                            state:newarr[5],
                            pin:newarr[6],
                            email:newarr[7],
                            web:newarr[8],
                            age:newarr[9]
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
        


    render(){
        
        // const name = this.state.employee.first_name + this.state.employee.last_name
        return(
            <div>
                    {this.state.employee[0].full_name}

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
        )
    }
}

export default RowDetails;