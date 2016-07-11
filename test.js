import ReactDom from 'react-dom';
import Switch from './index';
import React from 'react';
import './test.css';

const Wrapper = (props) => {
  return (
    <div className="wrapper">
      {props.children}
    </div>
  );
}

const App = (props) => {
  return (
    <div>
      <Wrapper className="wrapper">
        <Switch/>
      </Wrapper>
      <Wrapper className="wrapper">
        <Switch size="small"/>
      </Wrapper>
    </div>
  );
}

ReactDom.render(<App/>,document.getElementById('app'))
