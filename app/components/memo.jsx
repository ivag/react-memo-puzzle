
"use strict";

// REDUX
var connect = require('react-redux').connect;

// REACT
var React   = require('react');

// RAMDA - practical functional library
var R       = require('ramda');

var actions = require("../actions/actions.jsx");

//////////////////////////////////////////////////////////////////////////

// Presentational 'dumb' component
var CardPresentation = React.createClass({
    render: function() {
        return (
            <div 
                className={this.props.cardClass} 
                onClick={this.props.onClick}>
            </div>
        );        
    }
});


var mapCardDispatchToProps = function(dispatch, props){
    return{
        onClick: function(value){        
            dispatch(actions.flipCard(props.id));

            setTimeout(function () {             
                dispatch(actions.matched(props.id));           
            }.bind(this), 550);            
        }
    };
}

var mapCardStateToProps = function(state, props) {
    // get the background image css class
    var result = R.find(obj=>(obj.id === props.id && obj.open))(state.cardList);

    return {
        cardClass: result ? "memoCard " + result.backgroundImg : "memoCard" 
    };
};

// `Smart` component
var CardContainer = connect(
    mapCardStateToProps, 
    mapCardDispatchToProps
)(CardPresentation);

//////////////////////////////////////////////////////////////////////////////
// MAIN PARENT PRESENTATION CONTAINER
//////////////////////////////////////////////////////////////////////////////
var MemoPresentation = React.createClass({
    render: function() {
    	var cardList = [];
        var cardId   = 0; 
        var cardCol  = [];      
       
        // use RAMDA times to create the list of card components ...
        R.times(n=>{          
            //create a column of cards
            R.times(n=>{
                cardCol.push(<div key={n}><CardContainer id={cardId}/></div>);               
                cardId++;         
            }, 4);           
           
            // add the column to the main list
            cardList.push(<div key={n} className="memoColumn">{cardCol}</div>); 

            cardCol = [];                                  
        }, 4);       

	    return (
    	    <div>          
	        {cardList}                     
            </div>
        );
    }
});

module.exports = connect()(MemoPresentation);


