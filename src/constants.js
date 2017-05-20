module.exports = {
  NODE_NAMES: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
  BLANK_RULE: {
      read: ' ', // CONST.BLANK
      next: ' ',
      write: ' ',
      move: ' ',
  },

  // Machine states
  VIRGIN: 'VIRGIN', 
  RUNNING: 'RUNNING',
  ACCEPT: 'ACCEPT',
  REJECT: 'REJECT',

  // Tape / instruction values
  BLANK: ' ',
  START: '#',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',

  // Initial state
  HEAD_START: 1,
  INIT: 'A',
}