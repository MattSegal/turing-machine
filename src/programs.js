import CONST from 'constants'

const programs = [
  {
    title: 'Blank Program',
    description: 'Does nothing',
    tape: [CONST.START,'0', '1', CONST.BLANK,CONST.BLANK,CONST.BLANK],
    program: {
      A: [CONST.BLANK_RULE],
    }
  },
  {
    title: '0n1n Checker',
    description: 'Accepts a string of n 0s followed by n 1s',
    tape: [CONST.START,'0','0','0','1','1','1',CONST.BLANK,CONST.BLANK],
    program: {
      A: [
        {read: '0', write: '!', move: CONST.RIGHT, next: 'B'},
        CONST.BLANK_RULE
      ],
      B: [
        {read: '0', write: '0', move: CONST.RIGHT, next: 'B'},
        {read: '$', write: '$', move: CONST.RIGHT, next: 'B'},
        {read: '1', write: '$', move: CONST.RIGHT, next: 'C'},
        CONST.BLANK_RULE
      ],
      C: [
        {read: '1', write: '1', move: CONST.LEFT, next: 'C'},
        {read: '$', write: '$', move: CONST.LEFT, next: 'C'},
        {read: '0', write: '0', move: CONST.LEFT, next: 'C'},
        {read: '!', write: '!', move: CONST.RIGHT, next: 'A'},
        {read: ' ', write: ' ', move: CONST.LEFT, next: 'D'},
        CONST.BLANK_RULE
      ],
      D: [
        {read: '$', write: '$', move: CONST.LEFT, next: 'D'},
        {read: '!', write: '!', move: CONST.LEFT, next: 'D'},
        {read: '#', write: '#', move: ' ', next: 'ACCEPT'},
        CONST.BLANK_RULE
      ],
      E: [CONST.BLANK_RULE]
    }
  }
]


module.exports = programs