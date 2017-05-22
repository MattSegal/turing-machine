import CONST from 'constants'

const programs = [
  {
    title: 'Blank Program',
    description: 'Does nothing',
    tape: [CONST.START,'0', '1', CONST.BLANK,CONST.BLANK,CONST.BLANK],
    program: {
      A: [CONST.BLANK_RULE],
      B: [CONST.BLANK_RULE],
    }
  },
  {
    title: '0x1x Checker',
    description: 'Accepts a string of 0x1x Eg. 000111',
    tape: [CONST.START,'0','0','0','1','1','1',CONST.BLANK,CONST.BLANK],
    program: {
      A: [
        // Mark a 0 as 'read' then go to B so we can find a matching 1
        {read: '0', write: '!', move: CONST.RIGHT, next: 'B'},
      ],
      B: [
        // Move right until we see a 1, then mark it as 'read'
        // Then go to C so we can traverse left
        {read: '0', write: '0', move: CONST.RIGHT, next: 'B'},
        {read: '$', write: '$', move: CONST.RIGHT, next: 'B'},
        {read: '1', write: '$', move: CONST.RIGHT, next: 'C'},
      ],
      C: [
        // If we see a space we should be finished marking things
        // Otherwise traverse left
        // Once see a '!' then we are at the leftmost marked 0
        // and we should start matching 0-1 pairs again
        {read: '1', write: '1', move: CONST.LEFT, next: 'C'},
        {read: '$', write: '$', move: CONST.LEFT, next: 'C'},
        {read: '0', write: '0', move: CONST.LEFT, next: 'C'},
        {read: '!', write: '!', move: CONST.RIGHT, next: 'A'},
        {read: ' ', write: ' ', move: CONST.LEFT, next: 'D'},
      ],
      D: [
        // Verify that everything is marked and then accept
        {read: '$', write: '$', move: CONST.LEFT, next: 'D'},
        {read: '!', write: '!', move: CONST.LEFT, next: 'D'},
        {read: '#', write: '#', move: ' ', next: 'ACCEPT'},
      ],
    }
  },
  {
    title: '0x1x0x Checker',
    description: 'Accepts a string of 0x1x0x Eg. 001100',
    tape: [CONST.START,'0','0','0','1','1','1','0','0','0',CONST.BLANK,CONST.BLANK],
    program: {
      A: [
        // Do same matching algorithm as in 0x1x checker
        // in stage 1, then in stage 2 match the 2nd set of 0s
        // Mark a 0 as 'read' then go to B so we can find a matching 1
        {read: '0', write: '!', move: CONST.RIGHT, next: 'B'},
      ],
      B: [
        // Move right until we see a 1, then mark it as 'read'
        // Then go to C so we can traverse left
        {read: '0', write: '0', move: CONST.RIGHT, next: 'B'},
        {read: '$', write: '$', move: CONST.RIGHT, next: 'B'},
        {read: '1', write: '$', move: CONST.RIGHT, next: 'C'},
      ],
      C: [
        // We have just marked a '1' as matched
        // If we see another 1 then we have more matching to do
        // If we see a 0 then we should move to stage 2
        {read: '1', write: '1', move: CONST.LEFT, next: 'D'},
        {read: '0', write: '0', move: CONST.LEFT, next: 'E'},
      ],
      D: [
        {read: '1', write: '1', move: CONST.LEFT, next: 'D'},
        {read: '$', write: '$', move: CONST.LEFT, next: 'D'},
        {read: '0', write: '0', move: CONST.LEFT, next: 'D'},
        {read: '!', write: '!', move: CONST.RIGHT, next: 'A'},
      ],
      E: [
        // Verify that the first set of 0s is matched with the 2nd set
        // then move to stage 2
        {read: '$', write: '$', move: CONST.LEFT, next: 'E'},
        {read: '!', write: '!', move: CONST.LEFT, next: 'E'},
        {read: '#', write: '#', move: CONST.RIGHT, next: 'F'},
      ],
      F: [
        // Begin stage 2 - tape should read !!!$$$000
        // traverse right until we hit a '$'
        {read: '!', write: '!', move: CONST.RIGHT, next: 'F'},
        {read: '$', write: '$', move: CONST.LEFT, next: 'G'},
      ],
      G: [
        // We have hit a '$' - beging matching $s with 0s
        // mark $ as read by writing it as !
        {read: '!', write: '!', move: CONST.RIGHT, next: 'G'},
        {read: '$', write: '!', move: CONST.RIGHT, next: 'H'},
      ],
      H: [
        // Move right until we see a 0, then mark it as read with &
        {read: '$', write: '$', move: CONST.RIGHT, next: 'H'},
        {read: '!', write: '!', move: CONST.RIGHT, next: 'H'},
        {read: '&', write: '&', move: CONST.RIGHT, next: 'H'},
        {read: '0', write: '&', move: CONST.RIGHT, next: 'I'},
      ],
      I : [
        // If we see a blank then verify
        // If we see a ! then beging matching again 
        {read: '0', write: '0', move: CONST.LEFT, next: 'I'},
        {read: '&', write: '&', move: CONST.LEFT, next: 'I'},
        {read: '$', write: '$', move: CONST.LEFT, next: 'I'},
        {read: '!', write: '!', move: CONST.RIGHT, next: 'G'},
        {read: ' ', write: ' ', move: CONST.LEFT, next: 'J'},
      ],
      J: [
        // Verify that everything is marked as &s and !s 
        /// and then accept
        {read: '&', write: '&', move: CONST.LEFT, next: 'J'},
        {read: '!', write: '!', move: CONST.LEFT, next: 'J'},
        {read: '#', write: '#', move: ' ', next: 'ACCEPT'},
      ],
    }
  },
  {
    title: 'Buggy Program',
    description: 'Writes 1s forever.',
    tape: [CONST.START,'0', '1', CONST.BLANK,CONST.BLANK,CONST.BLANK],
    program: {
      A: [
        {read: '0', write: '1', move: CONST.RIGHT, next: 'A'},
        {read: '1', write: '1', move: CONST.RIGHT, next: 'A'},
        {read: ' ', write: '1', move: CONST.RIGHT, next: 'A'},
      ],
      B: [CONST.BLANK_RULE],
    }
  },
]


module.exports = programs