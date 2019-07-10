import React from 'react';

class RowComponent extends React.Component{
    render(){
        return (
            <div>
                    <tr key={index} onClick={this.showDetails(row.id)} >
                      <td scope="row">{row.id}</td>
                      <td>{row.first_name}</td>
                      <td>{row.last_name}</td>
                      <td>{row.age}</td>
                      <td>{row.company_name}</td>
                      <td>{row.web}</td>
                      <td>{row.city}</td>
                      <td>{row.state}</td>
                      <td>{row.zip}</td>
                  </tr>
            </div>
        )
    }
}
export default RowComponent;