var fs = require('fs')
  , path = require('path')
  , docs = path.join(__dirname, 'docs')
  , child_process = require('child_process')
  , md = require('cli-md')
  , exec = child_process.exec
  ;

function getOutput (program, cb) {
  var child = exec(program, function (error, stdout, stderr) {
    if (error) return cb(error)
    cb(null, stdout)
  })
  return child
}

function verifyIntro (args, cb) {
  var program = 'node ' + args[0]
  getOutput(program, function (e, stdout) {
    if (stdout === 'Hello World!\n') {
      cb(true)
    }
    if (e) {
      console.error('Your program did not run :(')
      console.error(e)
      return cb(false)
    }
    if (stdout !== 'Hello World!') {
      console.log('Your program did not output the exact text "Hello World!". Please check your program, fix the error, and verify again.')
    }
  })
}

function verifyStrings (args, cb) {
  var program = 'node ' + args[0]
  getOutput(program, function (e, stdout) {
    if (stdout === 'It\'s a stringy world.\n') {
      cb(true)
    }
    if (e) {
      console.error('Your program did not run :(')
      console.error(e)
      return cb(false)
    }
    if (stdout !== 'It\'s a stringy world.\n') {
      console.log('Your program did not output the exact text "It\'s a stringy world.". Please check your program, fix the error, and verify again.')
    }
  })
}

function verifyVariables (args, cb) {
  var program = 'node ' + args[0]
  // TODO: use emscripten or some shit to validate they actually use variables
  getOutput(program, function (e, stdout) {
    if (stdout === 'It\'s a stringy world.\n') {
      cb(true)
    }
    if (e) {
      console.error('Your program did not run :(')
      console.error(e)
      return cb(false)
    }
    if (stdout !== 'It\'s a stringy world.\n') {
      console.log('Your program did not output the exact text "It\'s a stringy world.". Please check your program, fix the error, and verify again.')
    }
  })
}

function verifyObjects1 (args, cb) {
  var program = 'node ' + args[0]
  // TODO: use emscripten or some shit to validate they actually use .toUpperCase()
  getOutput(program, function (e, stdout) {
    if (stdout === 'It\'s a stringy world.\n'.toUpperCase()) {
      cb(true)
    }
    if (e) {
      console.error('Your program did not run :(')
      console.error(e)
      return cb(false)
    }
    if (stdout !== 'It\'s a stringy world.\n'.toUpperCase()) {
      console.log('Your program did not output the exact text "IT\'S A STRINGY WORLD.". Please check your program, fix the error, and verify again.')
    }
  })
}

function verifyObjects2 (args, cb) {
  var program = 'node ' + args[0]
  // TODO: use emsripten or some shit to valiate thay actually make an object w/ a property
  getOutput(program, function (e, stdout) {
    if (stdout === 'It\'s a stringy world.\n'.toUpperCase()) {
      cb(true)
    }
    if (e) {
      console.error('Your program did not run :(')
      console.error(e)
      return cb(false)
    }
    if (stdout !== 'It\'s a stringy world.\n'.toUpperCase()) {
      console.log('Your program did not output the exact text "IT\'S A STRINGY WORLD.". Please check your program, fix the error, and verify again.')
    }
  })
}

function verifyFunction (args, cb) {
  var program = 'node ' + args[0]
  // TODO: use emsripten or some shit to valiate thay actually make a function to do this
  getOutput(program, function (e, stdout) {
    if (stdout === 'It\'s a stringy world.\n'.toUpperCase()+'It\'s a stringy world.\n'.toUpperCase()) {
      cb(true)
    }
    if (e) {
      console.error('Your program did not run :(')
      console.error(e)
      return cb(false)
    }
    if (stdout !== 'It\'s a stringy world.\n'.toUpperCase()+ 'It\'s a stringy world.\n'.toUpperCase()) {
      console.log('Your program did not output the exact text "IT\'S A STRINGY WORLD.\\nIT\'S A STRINGY WORLD.". Please check your program, fix the error, and verify again.')
    }
  })
}

function verifyArrays (args, cb) {
  var program = 'node ' + args[0]
  // TODO: use emsripten or some shit to validate they are actually pushing to the Array prototype.
  getOutput(program, function (e, stdout) {
    console.error(JSON.stringify(stdout))
    if (stdout === '1\n2\n') {
      cb(true)
    }
    if (e) {
      console.error('Your program did not run :(')
      console.error(e)
      return cb(false)
    }
    if (stdout !== '1\n2') {
      console.log('Your program did not output the exact text "1\\n2\\n". Please check your program, fix the error, and verify again.')
    }
  })
}

function docText (name) {
  return md(fs.readFileSync(path.join(docs, name)).toString()).replace(/&#39;/g, "'").replace(/&quot;/g, '"')
}

exports['Hello World!'] =
  { problem: docText('intro.mkd')
  , verify: verifyIntro
  }

exports['Strings'] =
  { problem: docText('strings.mkd')
  , verify: verifyStrings
  }

exports['Values and Variables'] =
  { problem: docText('variables.mkd')
  , verify: verifyVariables
  }

exports['Intro to Objects'] =
  { problem: docText('objects1.mkd')
  , verify: verifyObjects1
  }

exports['Making Objects'] =
  { problem: docText('objects2.mkd')
  , verify: verifyObjects2
  }

exports['Functions'] =
  { problem: docText('functions.mkd')
  , verify: verifyFunction
  }

exports['Arrays'] =
  { problem: docText('arrays.mkd')
  , verify: verifyArrays
  }
