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

const App = (props) => {
  return (
    <div>
     <SwitchLabel/>
     <SwitchLabel isOpen={true} color="blue" size="small"/>
     <SwitchLabel isOpen={false} color="blue"/>
    </div>
  );
}

ReactDom.render(<App/>,document.getElementById('app'))
