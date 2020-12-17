export enum MESSAGE_TYPE{
    PLACE_BET,
    WAITING_FOR_OPPONENT_BET,
    OPPONENT_MOVE,
    YOUR_MOVE,
    YOU_WON,
    YOU_LOST,
    EQUAL_BETS,
    NONE
}

export enum NOTICE_BOARD_STATUS{
    BETTING,
    NOTICE,
    GAMEOVER
}

export enum GAMESTATE{
    BETTING,
    BET_WAITING,
    MOVE_WAITING,
    MOVING,
    GAMEOVER
}

// export const message = {
//     PLACE_BET: "PLACE YOUR BETS"
//     WAITING_FOR_OPPONENT_BET: "WAITING FOR ",
//     OPPONENT_MOVE,
//     YOUR_MOVE,
//     YOU_WON,
//     YOU_LOST
// }