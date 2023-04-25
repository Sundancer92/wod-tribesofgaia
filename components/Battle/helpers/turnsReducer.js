

export const turnsReducer = (state, {type, payload}) => {
    switch(type){
        case 'endTurn':
            payload.player.turns = 0
            console.log('Entro en endTurn Reducer', payload.player.name)
            return state;
        case 'updateTurns':
            console.log('Entro en endTurn Reducer', payload.roster)
            return state;
        default:
            console.log('Default del Reducer')
            return state;
    }
}

