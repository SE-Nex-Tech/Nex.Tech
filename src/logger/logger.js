const fse = require('fs-extra')
const fs = require('fs')

export default function (msg, admin) {
  const dt = new Date()
  let dir = 'logs/' + dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate() + '_' + ((admin) ? 'admins' : 'users') + '.log'
  let message = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds() + ' -- ' + msg + '\n'
  if (fse.pathExistsSync(dir)) {
    fs.appendFileSync(dir, message)
  } else {
    fse.outputFileSync(dir, message)
  }
}
