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
  }
  _emitEvent(eventType,e) {
    let eventHandler = this.props[eventType];
    if(!eventHandler)return;
    eventHandler.call(this,e);
  };
  _onTouchStart(e) {
    let point = e.touches ? e.touches[0] : e;
    this.pointX = point.pageX;
    this.pointY = point.pageY;
  }
  _onTouchMove(e) {
    let point = e.touches ? e.touches[0] :e;
    let deltaX = point.pageX - this.pointX;
    let deltaY = point.pageY - this.pointY;
    this._emitEvent('onMove',{
      deltaX,
      deltaY
    });
    this.pointX = point.pageX;
    this.pointY = point.pageY;
    e.preventDefault();
  }
  _onTouchCancel(e) {
    this._onTouchEnd();
  }
  _onTouchEnd(e) {
    this.pointX = 0;
    this.pointY = 0;
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