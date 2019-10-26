import '../custom-elements/rl-pwd/rl-pwd.js'

const pwd = document.getElementById('pwd')
pwd.registerApp('rl-quiz', 'Quiz', '/resources/rl-quiz/icon.png', new Map([
  ['src', 'http://vhost3.lnu.se:20080/question/1'],
  ['data-preferred-width', '30rem'],
  ['data-preferred-height', '36rem']
]))

pwd.registerApp('rl-memory', 'Memory', '/resources/rl-memory/icon.png', new Map([
  ['data-preferred-width', '34rem'],
  ['data-preferred-height', '34rem']
]))

pwd.registerApp('rl-chat', 'Chat', '/resources/rl-chat/icon.png', new Map([
  ['src', 'ws://vhost3.lnu.se:20080/socket/'],
  ['key', 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd']
]))

pwd.registerApp('rl-pwd', 'PWD', '/resources/rl-pwd/icon.png')
