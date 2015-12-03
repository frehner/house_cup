'use strict';

var React = require('react');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var House = require('./House');

//put your firebase url here
var FIREBASE_URL = '';

var App = React.createClass({
  mixins:[ReactFireMixin],
  getInitialState: function() {
    return {
      houses:[],
      addPointsPW:"", //enter the password to be used here.
      showAddPoints:false
    };
  },
  componentDidMount: function() {
    var houseRef = new Firebase(FIREBASE_URL);
    this.bindAsArray(houseRef, "houses");
  },
  render:function() {
    var that = this;
    return (
      <div className="row">
        {this.state.houses.map(function (house){
          return (
            <House houseObj={house} showAddPoints={that.state.showAddPoints} addPointsFunc={that.addPointsToHouse} key={house[".key"]}/>
          );
        })}
        <div className="form-group">
          Password to add points to a house: 
          <input type="password" onChange={this.checkPassword} id="pwcheck" className="form-control"/>
          <button onClick={this.clearPW} className="btn btn-warning">Clear Password</button>
        </div>
      </div>
    )
  },
  checkPassword:function(event) {
    if(event.target.value === this.state.addPointsPW) {
      this.setState({
        showAddPoints:true
      });
    } else {
      this.setState({
        showAddPoints:false
      });
    }
  },
  clearPW: function() {
    document.getElementById('pwcheck').value = '';
    this.setState({
      showAddPoints:false
    });
  },
  addPointsToHouse: function(house, points) {
    var that = this;
    var currPoints = this.firebaseRefs.houses.child(house).child('points');
    currPoints.once("value", function (data){
      var newPoints = parseInt(data.val()) + parseInt(points);
      that.firebaseRefs.houses.child(house).update({
        "points":newPoints,
      });
      
    });
  }
});

module.exports = App;