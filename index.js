'use strict';
var Promise = require('promise')
  , spawn = require('child_process').spawn
  , sprom = require('sprom')
  , errorCode = require('exit-error')

module.exports =
function os(bin, args, opts) {
  var child
    , ret = new Promise(function(resolve, reject) {
        if (!Array.isArray(args)) {
          opts = args
          args = []
        }

        var name = bin
        if (Array.isArray(bin)) {
          name = bin.join(' ')
          args = bin.concat(args)
          bin = args.shift()
        }

        opts = opts
          ? Object.create(opts)
          : {}
        opts.stdio = [(opts.stdio && opts.stdio[0]) || process.stdin, (opts.stdio && opts.stdio[1]) || process.stdout, 'pipe']

        child = spawn(bin, args, opts)
        var stderr = sprom(stderr)

        if (!opts.quiet) child.stderr.pipe(process.stderr)

        child.on('error', reject)
        child.on('exit', function(code, signal) {
          if (code === 0 && !signal) return resolve()
          stderr.then(function(stderr) {
            var err = errorCode(code, signal)
            err.message += ': ' + stderr
            err.stderr = stderr

            reject(err)
          })
        })
      })

  if (child) {
    ret.child = child
    ret.stdin = child.stdin
  }

  return ret
}
