// ES6 syntax

"use strict";

///////////////////////////////////////////////////////////
// REDUX ACTIONS
///////////////////////////////////////////////////////////

const MATCHED   = 'MATCHED'
const FLIP_CARD = 'FLIP_CARD'


export function matched(id){
    return {
        type: MATCHED,
        id:   id
    };
};

export function flipCard(id){
    return {
        type: FLIP_CARD,
        id:   id
    };
};
