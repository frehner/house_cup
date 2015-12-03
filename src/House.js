'use strict';

var React = require('react');

var House = React.createClass({
  getInitialState: function() {
    return {
      addPoints:0,
      showSuccess:false,
      pointsAdded:0
    };
  },
  componentDidMount: function() {
  },
  render:function() {
    return (
      <div className="col-sm-6">
        <div className="card text-center">
          <div className="card-block">
            <h4 className="card-title">
              {this.props.houseObj.name}
            </h4>
            <div className="card-text">
              <h5>
                {this.props.houseObj.points} points
              </h5>
              <div className={this.props.showAddPoints ? 'form-group' : 'form-group hidden-xl-down'}>
                <input type="number" onChange={this.updatePointsAdded} className="form-control"/>
                <button onClick={this.addPoints} className="btn btn-success"> Add {this.state.addPoints} points to {this.props.houseObj.name} </button>
                <div className={this.state.showSuccess ? 'alert alert-success' : 'alert alert-success hidden-xl-down'}>
                  Added {this.state.pointsAdded} points to {this.props.houseObj.name}!
                </div>
              </div>
              <div>
                Members:
                {this.props.houseObj.members.map( function (member) {
                  return(
                    <div>{member.name}</div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  updatePointsAdded:function(event) {
    this.setState({
      addPoints:event.target.value
    });
  },
  addPoints: function(event){
    var addPoints = this.state.addPoints;
    var that = this;
    this.props.addPointsFunc(this.props.houseObj[".key"], this.state.addPoints);
    event.currentTarget.previousSibling.value = 0;
    this.setState({
      pointsAdded:addPoints,
      addPoints:0,
      showSuccess:true
    });
    setTimeout(function(){
      that.setState({
        showSuccess:false
      });
    }, 5000);
  }
});

module.exports = House;