import ReactDom from 'react-dom';
import Switch from './index';
import React from 'react';
import './test.css';

class SwitchLabel extends React.Component {
  constructor(props) {
    super(props);
    this.onValueChanged = this.onValueChanged.bind(this);
    this.state = {
      isOpen: true
    };
  }

  onValueChanged(isOpen) {
    this.setState({
      isOpen
    });
    console.log(isOpen);
  }

  componentDidMount() {
    let {
      isOpen
    } = this.props;
    if(isOpen === false) {
      this.setState({
        isOpen
      });
    }
  }

  render() {
    let {
      isOpen
    } = this.state;
    return (
      <div className="wrapper">
        <label>{isOpen ? '开' : '关'}</label>
        <Switch {...this.props} onValueChanged={this.onValueChanged}/>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
    this.state = {
      isOpen: false
    }
    this.onValueChanged = this.onValueChanged.bind(this);
  }

  onBtnClick() {
    this.isOpen = !this.isOpen;
    this.setState({
      isOpen: this.isOpen
    });
  }

  onValueChanged(isOpen) {
    this.isOpen = isOpen;
  }

  render() {return (
      <div>
        <SwitchLabel/>
        <SwitchLabel isOpen={true} color="blue" size="small"/>
        <SwitchLabel isOpen={this.state.isOpen} onValueChanged={this.onValueChanged} color="blue"/>
        <button onClick={this.onBtnClick}> Toggle </button>
      </div>
    );
  }
}

ReactDom.render(<App/>,document.getElementById('app'))
