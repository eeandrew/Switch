import React, {
  PropTypes,
  Component
} from 'react';

/**
 * Figer Detection, currenty only support MOVE
 */
export default class Gestures extends Component {
  constructor(props) {
    super(props);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchCancel = this._onTouchCancel.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
    this._emitEvent = this._emitEvent.bind(this);
    this.startX = this.startY = this.moveX = this.moveY = null;
  }
  _emitEvent(eventType,e) {
    let eventHandler = this.props[eventType];
    if(!eventHandler)return;
    eventHandler.call(this,e);
  };
  _onTouchStart(e) {
    let point = e.touches ? e.touches[0] : e;
    this.startX = point.pageX;
    this.startY = point.pageY;
  }
  _onTouchMove(e) {
    let point = e.touches ? e.touches[0] :e;
    let deltaX = this.moveX === null ? 0 : point.pageX - this.moveX;
    let deltaY = this.moveY === null ? 0 : point.pageY - this.moveY;
    this._emitEvent('onMove',{
      deltaX,
      deltaY
    });
    this.moveX = point.pageX;
    this.moveY = point.pageY;
    e.preventDefault();
  }
  _onTouchCancel(e) {
    this._onTouchEnd();
  }
  _onTouchEnd(e) {
    /**
     * 在X轴或Y轴发生过移动
     */
    if(this.moveX !== null && Math.abs(this.moveX - this.startX) > 10 ||
    this.moveY !== null && Math.abs(this.moveY - this.startY) > 10) {
    }else {
      this._emitEvent('onTap');
    }
    this.startX = this.startY = this.moveX = this.moveY = null;
  }
  render() {
   return React.cloneElement(React.Children.only(this.props.children), {
        onTouchStart: this._onTouchStart.bind(this),
        onTouchMove: this._onTouchMove.bind(this),
        onTouchCancel: this._onTouchCancel.bind(this),
        onTouchEnd: this._onTouchEnd.bind(this)
    });
  }
}

Gestures.propTypes = {
  onMove: PropTypes.func
};