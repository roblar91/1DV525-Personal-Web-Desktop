import '../custom-elements/rl-pwd/rl-pwd.js'
import '../custom-elements/rl-quiz/rl-quiz.js'
import '../custom-elements/rl-memory/rl-memory.js'
import '../custom-elements/rl-chat/rl-chat.js'
import '../custom-elements/rl-life/rl-life.js'

const pwd = document.getElementById('pwd')
pwd.registerApp('rl-quiz', 'Quiz', './resources/rl-quiz/icon.png', new Map([
  ['src', 'http://vhost3.lnu.se:20080/question/1'],
  ['data-preferred-width', '30rem'],
  ['data-preferred-height', '36rem']
]))

pwd.registerApp('rl-memory', 'Memory', './resources/rl-memory/icon.png', new Map([
  ['data-preferred-width', '34rem'],
  ['data-preferred-height', '34rem']
]))

pwd.registerApp('rl-chat', 'Chat', './resources/rl-chat/icon.png', new Map([
  ['src', 'ws://vhost3.lnu.se:20080/socket/'],
  ['key', 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd']
]))

pwd.registerApp('rl-life', 'Life', './resources/rl-life/icon.png', new Map([
  ['data-preferred-width', '56rem'],
  ['data-preferred-height', '40rem']
]))
