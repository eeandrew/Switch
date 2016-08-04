import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import Gestures from './Gestures';
import classNames from 'classnames';
import './index.css';

export default class Switch extends Component {
  constructor(props) {
    super(props);
    this.onMove = this.onMove.bind(this);
    this.onToggerTouchStart = this.onToggerTouchStart.bind(this);
    this.onToggerTouchCancel = this.onToggerTouchCancel.bind(this);
    this.setToggerTranslateX = this.setToggerTranslateX.bind(this);
    this.enableTransition = this.enableTransition.bind(this);
    this.onXTranslateEnd = this.onXTranslateEnd.bind(this);
    this.getWrapperStyle = this.getWrapperStyle.bind(this);
    this.onMoving = this.onMoving.bind(this);
    this.onTap = this.onTap.bind(this);
    this.movingEnable = false;
    this.xBoundary = 0;
    this.translateX = 0;
    this.state = {
      translateX:0,
      transition: null,
      background: '#FFF',
      border:'#DDD',
    };
  }

  componentDidMount() {
   this.xBoundary = ReactDOM.findDOMNode(this.refs.wrapper).clientWidth - ReactDOM.findDOMNode(this.refs.togger).offsetWidth;
   this.toggerDOM = ReactDOM.findDOMNode(this.refs.togger);
   this.toggerDOM.translateX = 0;
   this.toggerDOM.addEventListener('transitionend',this.onXTranslateEnd);
   if(this.props.isOpen) {
     this.setToggerTranslateX(this.xBoundary);
   }
  }

  onMove(e) {
     if(this.props.disabled) return;
     if(!this.movingEnable)return;
     this.setToggerTranslateX(e.deltaX);
  }

  onTap(e) {
    if(this.props.disabled) return;
    this.enableTransition(true);
    if(this.translateX === 0) {
      this.setToggerTranslateX(this.xBoundary);
    }else if(this.translateX === this.xBoundary) {
      this.setToggerTranslateX(this.xBoundary * -1);
    }
  }

  onXTranslateEnd() {
    this.setState({
       transition:null
     });
  }

 setToggerTranslateX(deltaX) {
   if(!this.toggerDOM) return;
   this.translateX += deltaX;
   if(this.translateX >= this.xBoundary) this.translateX = this.xBoundary;
   this.translateX = this.translateX <=1 ? 0 : this.translateX;
   this.setState({
     translateX: this.translateX
   });
   this.onMoving();
 }

  onToggerTouchStart(e) {
    if(this.props.disabled) return;
    if(this.movingEnable) return;
    this.movingEnable = true;
    this.enableTransition(false);
  }

  onToggerTouchCancel(e) {
    if(this.props.disabled) return;
    this.movingEnable = false;
    this.enableTransition(true);
    if(this.translateX < this.xBoundary /2) {
      this.translateX = 0;
    }else {
      this.translateX = this.xBoundary;
    }
    this.setState({
      translateX: this.translateX,
    });
    this.onMoving();
  }


  onMoving() {
    let background = '#FFF';
    let border = '#DDD';
    let {
      color,
      onValueChanged
    } = this.props;
    if(this.translateX > this.xBoundary /2) {
      background = this.getWrapperStyle(color);
      border = background;
    }
    this.setState({
      background,
      border
    });
    if(this.translateX === 0) {
      onValueChanged.call(this,false);
    }else if(this.translateX == this.xBoundary) {
      onValueChanged.call(this,true);
    }
  }

  enableTransition(isEnable) {
    if(isEnable) {
      this.setState({
        transition: 'transform 0.1s linear'
      });
    }else {
      this.setState({
        transition: null
      });
    }
  }

  getWrapperStyle(style) {
    switch(style.toLowerCase()) {
      case 'primary':
        return '#4cd964';
      case 'blue':
        return '#007aff';
      default:
        return '#fff';
    }
  }


  render() {
    let {
      translateX,
      transition,
      background,
      border
    } = this.state;
    let toggleStyle = {
      transform: `translate(${translateX}px,0px) translateZ(0)`,
      WebkitTransform: `translate(${translateX}px,0px) translateZ(0)`,
      transition,
      WebkitTranssition: transition
    }
    let wrapperStyle = {
      background,
      border:`2px solid ${border}`,
    };
    if(this.props.disabled) {
      wrapperStyle.opacity = 0.5;
    }
    let {
      size
    } = this.props;
    return(
      <Gestures onMove={this.onMove} onTap={this.onTap}>
        <div className={classNames("switch-wrapper",size)}  ref="wrapper" style={wrapperStyle}>
          <div className="switch-togger"  
            onTouchStart={this.onToggerTouchStart} 
            onTouchCancel={this.onToggerTouchCancel}
            onTouchEnd={this.onToggerTouchCancel}
            ref="togger" style={toggleStyle}></div>
        </div>
      </Gestures>
    );
  }
}

Switch.propTypes = {
  disabled: PropTypes.bool, //是否禁用
  isOpen: PropTypes.bool,   //初始状态
  onValueChanged:PropTypes.func, //回调函数 
  color: PropTypes.string, //颜色 primary,blue
  size: PropTypes.string,//大小 normal,small
};

Switch.defaultProps = {
  disabled: false,
  isOpen: true,
  color: 'primary',
  size: 'normal',
  onValueChanged: (isOpen) => {console.log(isOpen);}
};