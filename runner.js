#!/usr/bin/env node

var adventure = require('adventure')
  , learnjs = require('./')
  , shop = adventure('learnjs')
  ;
for (var name in learnjs) {
  ;(function (name) {
    shop.add(name, function () {return learnjs[name]} )
  })(name)
}

shop.execute(process.argv.slice(2))
