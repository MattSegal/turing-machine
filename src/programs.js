import CONST from 'constants'

const programs = [
  {
    title: 'String Comparer',
    description: 'Verifies that two strings of 0s and 1s separated by a & sign are the same Eg. 01101&01101',
    tape: [CONST.START,'0','1','1','0','1','&','0','1','1','0','1', CONST.BLANK,CONST.BLANK,CONST.BLANK],
    program: {
      A: [
        // Read 0 or 1 from LHS
        {read: '0', write: 'x', move: CONST.RIGHT, next: 'B'},
        {read: '1', write: 'x', move: CONST.RIGHT, next: 'C'},
        // If we see an & we're hopefully done, move to verification
        {read: '&', write: '&', move: CONST.RIGHT, next: 'H'},
      ],
      B: [
        // Scan right until the middle, remembering you saw a 0
        {read: '0', write: '0', move: CONST.RIGHT, next: 'B'},
        {read: '1', write: '1', move: CONST.RIGHT, next: 'B'},
        {read: '&', write: '&', move: CONST.RIGHT, next: 'D'},

      ],
      C: [
        // Scan right until the middle, remembering you saw a 1
        {read: '0', write: '0', move: CONST.RIGHT, next: 'C'},
        {read: '1', write: '1', move: CONST.RIGHT, next: 'C'},
        {read: '&', write: '&', move: CONST.RIGHT, next: 'E'},
      ],
      D: [
        // Scan right over 'x', mark a 0 if seen
        {read: 'x', write: 'x', move: CONST.RIGHT, next: 'D'},
        {read: '0', write: 'x', move: CONST.LEFT, next: 'F'},
      ],
      E: [
        // Scan right over 'x', mark a 1 if seen
        {read: 'x', write: 'x', move: CONST.RIGHT, next: 'E'},
        {read: '1', write: 'x', move: CONST.LEFT, next: 'F'},
      ],
      F: [
        // Scan left over 'x' until the middle 
        {read: 'x', write: 'x', move: CONST.LEFT, next: 'F'},
        {read: '&', write: '&', move: CONST.LEFT, next: 'G'},
      ],
      G: [
        // Scan left over 0s and 1s until the next 'x' 
        {read: '0', write: '0', move: CONST.LEFT, next: 'G'},
        {read: '1', write: '1', move: CONST.LEFT, next: 'G'},
        {read: 'x', write: 'x', move: CONST.RIGHT, next: 'A'},      
      ],
      H: [
        // Scan right until the end, we should only see 'x' and then a blank 
        {read: 'x', write: 'x', move: CONST.RIGHT, next: 'H'},
        {read: ' ', write: ' ', move: ' ', next: 'ACCEPT'},      
      ],
    }
  },
  {
    title: '0x1x Checker',
    description: 'Accepts a string of 0x1x Eg. 000111',
    tape: [CONST.START,'0','0','0','1','1','1',CONST.BLANK,CONST.BLANK],
    program: {
      A: [
        // Mark a 0 as 'read' then go to B so we can find a matching 1
        {read: '0', write: 'x', move: CONST.RIGHT, next: 'B'},
      ],
      B: [
        // Move right until we see a 1, then mark it as 'read'
        // Then go to C so we can traverse left
        {read: '0', write: '0', move: CONST.RIGHT, next: 'B'},
        {read: 'y', write: 'y', move: CONST.RIGHT, next: 'B'},
        {read: '1', write: 'y', move: CONST.RIGHT, next: 'C'},
      ],
      C: [
        // If we see a space we should be finished marking things
        // Otherwise traverse left
        // Once see a 'x' then we are at the leftmost marked 0
        // and we should start matching 0-1 pairs again
        {read: '1', write: '1', move: CONST.LEFT, next: 'C'},
        {read: 'y', write: 'y', move: CONST.LEFT, next: 'C'},
        {read: '0', write: '0', move: CONST.LEFT, next: 'C'},
        {read: 'x', write: 'x', move: CONST.RIGHT, next: 'A'},
        {read: ' ', write: ' ', move: CONST.LEFT, next: 'D'},
      ],
      D: [
        // Verify that everything is marked and then accept
        {read: 'y', write: 'y', move: CONST.LEFT, next: 'D'},
        {read: 'x', write: 'x', move: CONST.LEFT, next: 'D'},
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
        {read: '0', write: 'x', move: CONST.RIGHT, next: 'B'},
      ],
      B: [
        // Move right until we see a 1, then mark it as 'read'
        // Then go to C so we can traverse left
        {read: '0', write: '0', move: CONST.RIGHT, next: 'B'},
        {read: 'y', write: 'y', move: CONST.RIGHT, next: 'B'},
        {read: '1', write: 'y', move: CONST.RIGHT, next: 'C'},
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
        {read: 'y', write: 'y', move: CONST.LEFT, next: 'D'},
        {read: '0', write: '0', move: CONST.LEFT, next: 'D'},
        {read: 'x', write: 'x', move: CONST.RIGHT, next: 'A'},
      ],
      E: [
        // Verify that the first set of 0s is matched with the 2nd set
        // then move to stage 2
        {read: 'y', write: 'y', move: CONST.LEFT, next: 'E'},
        {read: 'x', write: 'x', move: CONST.LEFT, next: 'E'},
        {read: '#', write: '#', move: CONST.RIGHT, next: 'F'},
      ],
      F: [
        // Begin stage 2 - tape should read xxxyyy000
        // traverse right until we hit a 'y'
        {read: 'x', write: 'x', move: CONST.RIGHT, next: 'F'},
        {read: 'y', write: 'y', move: CONST.LEFT, next: 'G'},
      ],
      G: [
        // We have hit a 'y' - beging matching ys with 0s
        // mark y as read by writing it as x
        {read: 'x', write: 'x', move: CONST.RIGHT, next: 'G'},
        {read: 'y', write: 'x', move: CONST.RIGHT, next: 'H'},
      ],
      H: [
        // Move right until we see a 0, then mark it as read with z
        {read: 'y', write: 'y', move: CONST.RIGHT, next: 'H'},
        {read: 'x', write: 'x', move: CONST.RIGHT, next: 'H'},
        {read: 'z', write: 'z', move: CONST.RIGHT, next: 'H'},
        {read: '0', write: 'z', move: CONST.RIGHT, next: 'I'},
      ],
      I : [
        // If we see a blank then verify
        // If we see a x then beging matching again 
        {read: '0', write: '0', move: CONST.LEFT, next: 'I'},
        {read: 'z', write: 'z', move: CONST.LEFT, next: 'I'},
        {read: 'y', write: 'y', move: CONST.LEFT, next: 'I'},
        {read: 'x', write: 'x', move: CONST.RIGHT, next: 'G'},
        {read: ' ', write: ' ', move: CONST.LEFT, next: 'J'},
      ],
      J: [
        // Verify that everything is marked as zs and xs 
        /// and then accept
        {read: 'z', write: 'z', move: CONST.LEFT, next: 'J'},
        {read: 'x', write: 'x', move: CONST.LEFT, next: 'J'},
        {read: '#', write: '#', move: ' ', next: 'ACCEPT'},
      ],
    }
  },
  {
    title: 'Blank Program',
    description: 'Does nothing',
    tape: [CONST.START,'0', '1', CONST.BLANK,CONST.BLANK,CONST.BLANK],
    program: {
      A: [CONST.BLANK_RULE],
      B: [CONST.BLANK_RULE],
    }
  },
]


module.exports = programs