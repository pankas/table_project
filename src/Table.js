import React from 'react'
import axios from 'axios';
import './App.css';

class Table extends React.Component{
    constructor(prop){
        super(prop);
        this.state = {
            employee:[],
            currentPage:1,
            dataPerPage:10,
            searchQuery:'',
            upperLimit: 3,
            lowerLimit: 0,
            isPrevBtnActive: 'disabled',
            isNextBtnActive:'',
            isPrevBtnActive:'',
            paginationLimit: 3,
            active:'page-item active'
        }
        this.handleClick = this.handleClick.bind(this);
    }
    //INPUT FIELDS
    onSearch = (e)=>{
      this.setState({
        searchQuery:e.target.value
      })
    }
    //ENDS
    //LOADING TABLE DATA
    componentDidMount(){
      let url = 'https://demo9197058.mockable.io/users'
      axios.get(url).then(res =>{
        console.log(res)
        this.setState({
            employee:res.data
        })
      }).catch(err =>{
          console.log(err)
      });
    }
    //ENDS
    //POPULATING ROW
    renderTable = (row,index)=>{        
      return <tr key={index} onClick={this.showDetails.bind(this,row.id)} >
      <td scope="row">{row.id}</td>
      <td>{row.first_name}</td>
      <td>{row.last_name}</td>
      <td>{row.age}</td>
      <td>{row.company_name}</td>
      <td>{row.web}</td>
      <td>{row.city}</td>
      <td>{row.state}</td>
      <td>{row.zip}</td>
       </tr>;
      }
    //ENDS
    //SORTING TABLE DATRA
    onSort = (key)=>{
      const employee = this.state.employee;
      console.log(employee)
      // const data = this.state.employee.sort((a,b)=> {a[key] < b[key]})
      employee.sort((a,b)=> (
      a[key].toString().localeCompare(b[key]))
      )
      this.setState({employee})
    }
    //ENDS
    //DISPLAY DETAILS
    showDetails = (id)=>{
      localStorage.setItem('id',id);
      window.location = '/details';
    }
    //ENDS
    //PAGNATION BUTTON
      setPrevAndNextBtn(listid) {
        let totalPage = Math.ceil(this.state.employee.length / this.state.dataPerPage);
        this.setState({isNextBtnActive: 'disabled'});
        this.setState({isPrevBtnActive: 'disabled'});
        if(totalPage === listid && totalPage > 1){
            this.setState({isPrevBtnActive: ''});
        }
        else if(listid === 1 && totalPage > 1){
            this.setState({isNextBtnActive: ''});
        }
        else if(totalPage > 1){
            this.setState({isNextBtnActive: ''});
            this.setState({isPrevBtnActive: ''});
        }
    }
    //JUMP UPTO UPPER LIMITE
      btnIncrementClick = () =>{
        this.setState({upperLimit: this.state.upperLimit + this.state.paginationLimit});
        this.setState({lowerLimit: this.state.lowerLimit + this.state.paginationLimit});
        let listid = this.state.upperLimit + 1;
        this.setState({ currentPage: listid});
        this.setPrevAndNextBtn(listid);
      }
    //ENDS
    //JUMP UPTO LOWER LIMIT
        btnDecrementClick = ()=> {
          this.setState({upperLimit: this.state.upperLimit - this.state.paginationLimit});
          this.setState({lowerLimit: this.state.lowerLimit - this.state.paginationLimit});
          let listid = this.state.upperLimit - this.state.paginationLimit;
          this.setState({ currentPage: listid});
          this.setPrevAndNextBtn(listid);
      }
    //ENDS
    //PREVIOUS BUTTON
        btnPrevClick = ()=> {
          if((this.state.currentPage -1)%this.state.paginationLimit === 0 ){
              this.setState({upperLimit: this.state.upperLimit - this.state.paginationLimit});
              this.setState({lowerLimit: this.state.lowerLimit - this.state.paginationLimit});
          }
          let listid = this.state.currentPage - 1;
          this.setState({ currentPage : listid});
          this.setPrevAndNextBtn(listid);
        }
    //ENDS
    //NEXT BUTTON
        btnNextClick=()=> {
          if((this.state.currentPage +1) > this.state.upperLimit ){
              this.setState({upperLimit: this.state.upperLimit + this.state.paginationLimit});
              this.setState({lowerLimit: this.state.lowerLimit + this.state.paginationLimit});
          }
          let listid = this.state.currentPage + 1;
          this.setState({ currentPage : listid});
          this.setPrevAndNextBtn(listid);
        }
    //ENDS
    //CLICK ON THE PAGINATION BUTTON
        handleClick(event) {
          let listid = Number(event.target.id);
          this.setState({
            currentPage: listid,
            active:"active"
          });
          this.setPrevAndNextBtn(listid);
        }
        //ENDS
    render(){
      //FILTER DATA PER PAGE
      const { currentPage, dataPerPage,upperLimit,lowerLimit,isPrevBtnActive,isNextBtnActive } = this.state;
      const indexOfLastPage = currentPage * dataPerPage;
      const indexOfFirstPage = indexOfLastPage - dataPerPage;

      // 
      const filteredEmployee = this.state.employee.filter(employee => {
        return employee.last_name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1;
      });
      const current = filteredEmployee.slice(indexOfFirstPage, indexOfLastPage);
      //ENDS
      //DISPLAYING PAGE NUMBER
      const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.employee.length / this.state.dataPerPage); i++) {
          pageNumbers.push(i);
      }
    //   const renderPageNumbers = pageNumbers.map(number => {
    //     if(number === 1 && currentPage === 1){
    //         return(
    //             <li key={number} className={`${(number === 1 && currentPage === 1) ? "page-item active":""}`} ><a className="page-link"  onClick={this.handleClick}>{number}</a></li>
    //         )
    //     }
    //     else if((number < upperLimit + 1) && number > lowerLimit){
    //         return(
    //             <li key={number} className={`${(number < upperLimit + 1) && number > lowerLimit ? "page-item active":""}`}><a className="page-link" onClick={this.handleClick}>{number}</a></li>
    //         )
    //     }
    // });
    const renderPageNumbers = pageNumbers.map(number => {
      if(number === 1 && currentPage === 1){
          return(
              <li key={number} className={`${this.state.active}`} id={number}><a href='#' className="page-link" id={number} onClick={this.handleClick}>{number}</a></li>
          )
      }
      else if((number < upperLimit + 1) && number > lowerLimit){
          return(
              <li key={number} id={number}><a href='#' id={number} className="page-link" onClick={this.handleClick}>{number}</a></li>
          )
      }
  });
    //ENDS
    //DISPLAY PAGE INCREMENT
    let pageIncrementBtn = null;
    if(pageNumbers.length > upperLimit){
        pageIncrementBtn = <li className="page-item"><a className="page-link"  onClick={this.btnIncrementClick}> &hellip; </a></li>
    }
    //ENDS
    //DISPLAY PAGE DECREMENT 
    let pageDecrementBtn = null;
    if(lowerLimit >= 1){
        pageDecrementBtn = <li className="page-item"><a className="page-link" onClick={this.btnDecrementClick}> &hellip; </a></li>
    }
    //ENDS
    //PREV BUTTON DISPLAY
    let renderPrevBtn = null;
    if(isPrevBtnActive === 'disabled') {
        renderPrevBtn = <li className="page-item"><span> Prev </span></li>
    }
    else{
        renderPrevBtn = <li className="page-item"><a className="page-link" onClick={this.btnPrevClick}> Prev </a></li>
    }
    //ENDS
    //NEXT BUTTON DISPLAY
    let renderNextBtn = null;
    if(isNextBtnActive === 'disabled') {
        renderNextBtn = <li className="page-item"><span > Next </span></li>
    }
    else{
        renderNextBtn = <li className="page-item"><a className="page-link" onClick={this.btnNextClick}> Next </a></li>
    }
    //ENDS
        return(
            <div className="container-fluid" style={{padding:"5%"}} >
            <div className="row" >
            <div className="col-sm-6">
            <input type="text" className="form-control" value={this.state.searchQuery} onChange={this.onSearch}  placeholder="Search for names.."/>
            </div>
            </div><br/>
            <div className="row table-responsive">
               <table  className="table table-hover" style={{marginLeft:"2%"}}>
                    <thead style={{fontSize:"0.77rem"}}>
                        <tr>
                            <th scope="col" >ID</th>
                            <th scope="col" ><i class="fa fa-fw fa-sort" onClick={()=>this.onSort('first_name')} ></i>FIRST NAME  </th>
                            <th scope="col" ><i class="fa fa-fw fa-sort" onClick={()=>this.onSort('last_name')} ></i> LAST NAME   </th>
                            <th scope="col" ><i class="fa fa-fw fa-sort" onClick={()=>this.onSort('age')} ></i>AGE</th>
                            <th scope="col" ><i class="fa fa-fw fa-sort" onClick={()=>this.onSort('company_name')} ></i>COMPANY NAME</th>
                            <th scope="col" ><i class="fa fa-fw fa-sort" onClick={()=>this.onSort('city')} ></i> CITY </th>
                            <th scope="col" ><i class="fa fa-fw fa-sort" onClick={()=>this.onSort('state')} ></i>STATE</th>
                            <th scope="col" ><i class="fa fa-fw fa-sort" onClick={()=>this.onSort('zip')} ></i>  ZIP  </th>
                        </tr>
                    </thead>
                    <tbody>
                    {current.map(employee => {
                       return this.renderTable(employee);
                    })}
                    </tbody>
                </table>
                </div>
               <br/>
                <nav ariaLabel="Page navigation example">
                <ul className="pagination" id="page-numbers">  
                  {renderPrevBtn}
                  {pageDecrementBtn}
                  {renderPageNumbers}
                  {pageIncrementBtn}
                  {renderNextBtn}
                </ul>
</nav>
                
             </div>   
        )
    }
}

export default Table;