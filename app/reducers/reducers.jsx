

"use strict";

var _ = require('lodash');
var R = require('ramda');

var initialCardList = function(){  
    var cards = [];
    var items = ['sunset','sunrise', 'flower', 'sky', 'boat', 'tree', 'road', 'twilight',
                 'sunset','sunrise', 'flower', 'sky', 'boat', 'tree', 'road', 'twilight'];              
    var randomItem = "";
    
    // create list of random card objects from `items` list 
    R.times(i=>{
        randomItem = _.random(0, items.length-1)
        cards.push({
            "id":            i,
            "open":          false,            
            "class":        "memoCard",
            "matched":       false,
            'backgroundImg': items[randomItem]     
        }); 
        // remove the item
        items.splice(randomItem, 1);
    }, 16);
 
    return cards;
}

var getInitialState = function(){
    return {
       'cardList' : initialCardList()
    };
};


// get old state object and return new state with updated value
// THIS IS A PURE FUNCTION - NO STATE IS MUTATED, BUT A NEW COPY OF THE STATE IS RETURNED
var updateState = function(stateObj, key, value) {
    if (stateObj[key] === value) {
        return stateObj;
    }
    else {
        var newState = R.clone(stateObj);
        newState[key] = value;
        return newState;
    }
};

// redux reducer - receives old state and an action, and returns a new state
// THIS FUNCTION IS PURE: DOES NOT MUTATE GIVEN STATE
var reducer = function(state, action) {
    var  newCardList = {};

    if (typeof state === 'undefined') {
        return getInitialState();
    }
    else if (action.type === 'FLIP_CARD'){
        var newCardList = R.clone(state.cardList);      
       
        // find the open card according the `id` and set the `open` atribute to TRUE
        R.map(x=> { 
            if (x.id === action.id){
                    x.open = true; 
                }              
            },  
        newCardList);

        return updateState(state, 'cardList', newCardList);
    }
    else if (action.type === 'MATCHED'){

        // clone the current list of cards
        var newCardList = R.clone(state.cardList); 
        
        //TODO: Analyse why `return false` doesn't work to break R.forEach  
        R.forEach(x=>{
            // Get the current open card
            if (x.id === action.id && !x.matched){

                //TODO: Convert _.map to R.map           
                // iterate again the list of cards to check if open cards are matched                 
                _.map(newCardList, function(obj, index){
                    // If not matched, close both cards 
                    if (obj.open && obj.backgroundImg !== x.backgroundImg && !obj.matched){

                        obj.open = false;
                        x.open   = false;
                        return false;
                    }
                    // if matched, set `matched` attribute to TRUE
                    // check if number of open cards with same background image is 2
                    else if (obj.open && obj.backgroundImg === x.backgroundImg && !obj.matched && 
                        R.filter(o=>o.backgroundImg === x.backgroundImg && o.open, newCardList).length === 2){

                        obj.matched = true;
                        x.matched = true;
                        return false;
                    }                    
                });             
            }
        }, newCardList);

        return updateState(state, 'cardList', newCardList);
    }

};

module.exports = reducer;
