import React, {
  PropTypes,
  Component
} from 'react';

export default class Switch extends Component {
  constructor(props) {
    super(props);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchCancel = this._onTouchCancel.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
  }
  _onTouchStart(e) {

  }
  _onTouchMove(e) {

  }
  _onTouchCancel(e) {

  }
  _onTouchEnd(e) {

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