import React, { Component } from 'react'
import Button from './button'
import './style.css'

 class App extends Component {
constructor(props){
  super(props)
  this.state = {
    current: '',
    previous: [],
    Reset : false,
  }
}

reset = () => {
  this.setState({current: '0', previous:[]});
}

addToCurrent =(symbol) => {
  if (['*','/','-','+'].indexOf(symbol)> -1){
    let {previous} = this.state;
    previous.push(this.state.current + symbol);
    this.setState({previous, Reset : true});
  }else{
    if((this.state.current === "0" && symbol !== ".") || (this.state.Reset)){
      this.setState({current: symbol, Reset:false})
    }else{
      this.setState({current:this.state.current + symbol});
      
    }
  }
}
calculate = (symbol) => {
  let {current, previous, Reset} = this.state;
 if (previous.length > 0){

   current = eval(String(previous[previous.length -1] + current));
   this.setState({current, previous:[], Reset: true}); 
 }

}


render() {

const buttons = [
    {symbol: 'C', cols: 3, action:this.reset },
    {symbol: '/', cols:1, action: this.addToCurrent},
    {symbol: '7', cols:1, action: this.addToCurrent},
    {symbol: '8', cols:1, action: this.addToCurrent},
    {symbol: '9', cols:1, action: this.addToCurrent},
    {symbol: '*', cols:1, action: this.addToCurrent},
    {symbol: '4', cols:1, action: this.addToCurrent},
    {symbol: '5', cols:1, action: this.addToCurrent},
    {symbol: '6', cols:1, action: this.addToCurrent},
    {symbol: '-', cols:1, action: this.addToCurrent},
    {symbol: '1', cols:1, action: this.addToCurrent},
    {symbol: '2', cols:1, action: this.addToCurrent},
    {symbol: '3', cols:1, action: this.addToCurrent},
    {symbol: '+', cols:1, action: this.addToCurrent},
    {symbol: '0', cols:2, action: this.addToCurrent},
    {symbol: '.', cols:1, action: this.addToCurrent},
    {symbol: '=', cols:1, action: this.calculate},
];


    return (
      <div className='container'>
        {this.state.previous.length > 0 ?
        <div className="last">{this.state.previous[this.state.previous.length -1]}</div>  
      :null  
      }



        <input type="text" className='result' 
        value={this.state.current}/>


        {buttons.map((btn,index)=>{
          return <Button key={index} symbol={btn.symbol} 
          cols={btn.cols} action={(symbol)=> btn.action(symbol)} />
        })}

      </div>
    )
  }
}

export default App
