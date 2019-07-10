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
            paginationLimit: 3
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
            currentPage: listid
          });
          this.setPrevAndNextBtn(listid);
        }
        //ENDS
    render(){
      //FILTER DATA PER PAGE
      const { currentPage, dataPerPage,upperLimit,lowerLimit,isPrevBtnActive,isNextBtnActive } = this.state;
      const indexOfLastPage = currentPage * dataPerPage;
      const indexOfFirstPage = indexOfLastPage - dataPerPage;
      const current = this.state.employee.slice(indexOfFirstPage, indexOfLastPage);
      const filteredEmployee = current.filter(employee => {
        return employee.last_name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1;
      });
      //ENDS
      //DISPLAYING PAGE NUMBER
      const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.employee.length / this.state.dataPerPage); i++) {
          pageNumbers.push(i);
      }
      const renderPageNumbers = pageNumbers.map(number => {
        if(number === 1 && currentPage === 1){
            return(
                <li key={number} className={`${(number === 1 && currentPage === 1) ? "active":"inactive"}`} ><a onClick={this.handleClick}>{number}</a></li>
            )
        }
        else if((number < upperLimit + 1) && number > lowerLimit){
            return(
                <li key={number} className={`${(number < upperLimit + 1) && number > lowerLimit ? "active":"inactive"}`} id={number}><a id={number} onClick={this.handleClick}>{number}</a></li>
            )
        }
    });
    //ENDS
    //DISPLAY PAGE INCREMENT
    let pageIncrementBtn = null;
    if(pageNumbers.length > upperLimit){
        pageIncrementBtn = <li className=''><a  onClick={this.btnIncrementClick}> &hellip; </a></li>
    }
    //ENDS
    //DISPLAY PAGE DECREMENT 
    let pageDecrementBtn = null;
    if(lowerLimit >= 1){
        pageDecrementBtn = <li className=''><a  onClick={this.btnDecrementClick}> &hellip; </a></li>
    }
    //ENDS
    //PREV BUTTON DISPLAY
    let renderPrevBtn = null;
    if(isPrevBtnActive === 'disabled') {
        renderPrevBtn = <li className={isPrevBtnActive}><span id="btnPrev"> Prev </span></li>
    }
    else{
        renderPrevBtn = <li className={isPrevBtnActive}><a href='#' id="btnPrev" onClick={this.btnPrevClick}> Prev </a></li>
    }
    //ENDS
    //NEXT BUTTON DISPLAY
    let renderNextBtn = null;
    if(isNextBtnActive === 'disabled') {
        renderNextBtn = <li className={isNextBtnActive}><span id="btnNext"> Next </span></li>
    }
    else{
        renderNextBtn = <li className={isNextBtnActive}><a href='#' id="btnNext" onClick={this.btnNextClick}> Next </a></li>
    }
    //ENDS
        return(
            <div className="container">
            {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                  <div className="navbar-collapse collapse">
                  <ul className="nav nav-justified">
                    <li><a href="#" className="navbar-brand" style={{marginLeft:"40%"}}>Brand</a></li>
                  </ul>
                </div>
                </div>
              </div>
            </nav> */}

            <div className="row" style={{marginTop:"5%"}}>
            <div className="col-sm-6">
            <input type="text" className="form-control" value={this.state.searchQuery} onChange={this.onSearch}  placeholder="Search for names.."/>
            </div>
            </div><br/>
            <div className="row table-responsive">
               <table  className="table table-hover">
                    <thead>
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
                    {filteredEmployee.map(employee => {
                       return this.renderTable(employee);
                    })}
                    </tbody>
                </table>
                </div>
                <div className="row">
                <ul className="pagination" id="page-numbers">  
                  {renderPrevBtn}
                  {pageDecrementBtn}
                  {renderPageNumbers}
                  {pageIncrementBtn}
                  {renderNextBtn}
                </ul>

            </div>
             </div>   
        )
    }
}

export default Table;