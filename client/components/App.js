import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
export default class App extends React.Component {
constructor() {
    super();
    this.state = {selectedMonth:'All', selectedYear:2019, data: []};
    this.getData = this.getData.bind(this);
  }
getData(ev, year){
    axios.get('/getAll?month=All&year='+year)
      .then(function(response) {
        let details = [];
        for (var key in response.data) {
            details.push({key: response.data[key]})
        }
        ev.setState({data: details})
        ev.setState({selectedYear: parseInt(year)})
      });
  }
componentDidMount() {
    this.getData(this, '2019');
  }
componentWillReceiveProps(nextProps) {
    this.getData(this, '2019');
  }

render() {
    return (
      <div>
        <Add selectedMonth={this.state.selectedMonth} selectedYear={this.state.selectedYear} />
        <table key ='table'>
          <thead key ='thead'>
            <tr key='table-title'><th></th>
            <th className='desc-col'>Description</th>
            <th className='button-col'>Amount</th>
            <th className='button-col'>Month</th>
            <th className='button-col'>Year</th>
            <th className='button-col'>Update</th>
            <th className='button-col'>Delete</th></tr>
          </thead>
          <tbody key='tbody'>
            {
              this.state.data.map(function(exp, index){
                return  <tr key={index}><td key="counterCell" className='counterCell'></td>
                <td key='exp.description' className='desc-col'>{exp.description}</td>
                <td key='exp.amount'className='button-col'>{exp.amount}</td>
                <td key='exp.month' className='button-col'>{exp.month}</td>
                <td key='exp.year' className='button-col'>{exp.year}</td>
                <td key='this.exp' className='button-col'><Update expense={exp} /></td>
                <td key='exp._id' className='button-col'><Delete id={exp._id} expense={exp} /></td></tr>
              })
            }
            </tbody>
        </table>
      </div>
    );
  }
}