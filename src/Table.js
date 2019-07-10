import React from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import './App.css';

class Table extends React.Component{
    constructor(prop){
        super(prop);
        this.state = {
            employee:[],
            from:'',
            per_page:'',
            last_page:'',
            currentPage:1,
            data_page:10,
            direction:{
              dir:'asc'
            },
            searchQuery:'',
            upperPageBound: 3,
            lowerPageBound: 0,
            isPrevBtnActive: 'disabled',
            pageBound: 3
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleUserInput(searchQuery) {
        this.setState({searchQuery: searchQuery});
      };

      setPrevAndNextBtnClass(listid) {
        let totalPage = Math.ceil(this.state.employee.length / this.state.data_page);
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

      btnIncrementClick = () =>{
        this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
        this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
        let listid = this.state.upperPageBound + 1;
        this.setState({ currentPage: listid});
        this.setPrevAndNextBtnClass(listid);
      }

        btnDecrementClick = ()=> {
          this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
          this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
          let listid = this.state.upperPageBound - this.state.pageBound;
          this.setState({ currentPage: listid});
          this.setPrevAndNextBtnClass(listid);
      }


        btnPrevClick = ()=> {
          if((this.state.currentPage -1)%this.state.pageBound === 0 ){
              this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
              this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
          }
          let listid = this.state.currentPage - 1;
          this.setState({ currentPage : listid});
          this.setPrevAndNextBtnClass(listid);
        }

        btnNextClick=()=> {
          if((this.state.currentPage +1) > this.state.upperPageBound ){
              this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
              this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
          }
          let listid = this.state.currentPage + 1;
          this.setState({ currentPage : listid});
          this.setPrevAndNextBtnClass(listid);
        }

        handleClick(event) {
          let listid = Number(event.target.id);
          this.setState({
            currentPage: listid
          });
          this.setPrevAndNextBtnClass(listid);
        }

        sortBy = (key)=>{
            const employee = this.state.employee;
            // const data = this.state.employee.sort((a,b)=> {a[key] < b[key]})
            employee.sort((a,b)=> (this.state.direction.dir == 'asc'?
            a[key].toString().localeCompare(b[key]):b[key].toString().localeCompare(a[key])
            ))
            this.setState({employee})
        }

    componentDidMount(){
        let url = 'https://demo9197058.mockable.io/users'
        this.getData(url);
    }
    getData(url){
        axios.get(url).then(res =>{
                console.log(res)
                this.setState({
                    employee:res.data
                })
        }).catch(err =>{
            console.log(err)
        })
    }

    showDetails = (id)=>{
      localStorage.setItem('id',id);
      var val = 800
      if(id !== val){
        console.log(true)
      // window.location.href = '/details';
      }
    }
    onSearch = (e)=>{
      this.setState({
        searchQuery:e.target.value
      })
    }

    renderTable = (row,index)=>{        
          return <tr key={index} onClick={this.showDetails(row.id)} >
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

    render(){
      const { currentPage, data_page,upperPageBound,lowerPageBound,isPrevBtnActive,isNextBtnActive } = this.state;
      const indexOfLastPage = currentPage * data_page;
      const indexOfFirstPage = indexOfLastPage - data_page;
      const current = this.state.employee.slice(indexOfFirstPage, indexOfLastPage);
      // const { searchQuery } = this.state;
      const filteredEmployee = current.filter(employee => {
        console.log("sdkjs",this.state.searchQuery)
        return employee.last_name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1;
      });

      const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.employee.length / this.state.data_page); i++) {
          pageNumbers.push(i);
      }
      const renderPageNumbers = pageNumbers.map(number => {
        if(number === 1 && currentPage === 1){
            return(
                <li key={number} className={`${(number === 1 && currentPage === 1) ? "active":"inactive"}`} ><a onClick={this.handleClick}>{number}</a></li>
            )
        }
        else if((number < upperPageBound + 1) && number > lowerPageBound){
            return(
                <li key={number} className={`${(number < upperPageBound + 1) && number > lowerPageBound ? "active":"inactive"}`} id={number}><a id={number} onClick={this.handleClick}>{number}</a></li>
            )
        }
    });

    let pageIncrementBtn = null;
    if(pageNumbers.length > upperPageBound){
        pageIncrementBtn = <li className=''><a href='#' onClick={this.btnIncrementClick}> &hellip; </a></li>
    }
    let pageDecrementBtn = null;
    if(lowerPageBound >= 1){
        pageDecrementBtn = <li className=''><a href='#' onClick={this.btnDecrementClick}> &hellip; </a></li>
    }

    let renderPrevBtn = null;
    if(isPrevBtnActive === 'disabled') {
        renderPrevBtn = <li className={isPrevBtnActive}><span id="btnPrev"> Prev </span></li>
    }
    else{
        renderPrevBtn = <li className={isPrevBtnActive}><a href='#' id="btnPrev" onClick={this.btnPrevClick}> Prev </a></li>
    }


    let renderNextBtn = null;
    if(isNextBtnActive === 'disabled') {
        renderNextBtn = <li className={isNextBtnActive}><span id="btnNext"> Next </span></li>
    }
    else{
        renderNextBtn = <li className={isNextBtnActive}><a href='#' id="btnNext" onClick={this.btnNextClick}> Next </a></li>
    }

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
            <div className="row">
               <table  className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" >ID</th>
                            <th scope="col" ><button onClick={()=>this.sortBy('first_name')}>FIRST NAME</button></th>
                            <th scope="col" ><button onClick={()=>this.sortBy('last_name')}>LAST NAME</button></th>
                            <th scope="col" ><button onClick={()=>this.sortBy('age')}>AGE</button></th>
                            <th scope="col" ><button onClick={()=>this.sortBy('company_name')}>COMPANY NAME</button></th>
                            <th scope="col" ><button onClick={()=>this.sortBy('city')}>CITY</button></th>
                            <th scope="col" ><button onClick={()=>this.sortBy('state')}>STATE</button></th>
                            <th scope="col" ><button onClick={()=>this.sortBy('zip')}>ZIP</button></th>
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