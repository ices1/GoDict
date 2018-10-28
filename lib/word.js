#!/usr/bin/env node
const axios = require('axios')
const wordBaseUrl = 'http://104.194.71.73:5001/word/'
const AutoBaseUrl = 'http://104.194.71.73:5001/autocomplete/'
var program = require('commander')

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  // prompt: 'godict '
  prompt: 'GoDict >>> '
})


// read the second argv...
;(async () => {
  if (process.argv[2]) {
    let a = await getWord(program.parse(process.argv).args[0])
    console.log('\n')
    rl.prompt()
  } 
  })()


// get data by  getAutoWord
async function  getAutoWord (word) {
  await axios.get(AutoBaseUrl + word)
    .then((res) => {
      let ary = res.data.results
      if (ary.length) {
        console.log(`\n<<< msg: '${word}' not found, the following are relative words  ^_^`)
        ary.forEach((it,idx) => console.log(`  ${idx}: ${it.searchtext}`))
        // console.log('relative: ', ary.reduce((pre,cur) => pre +=cur.searchtext + ', ', ''))
      } else {
        console.log(`\n<<< msg: Sorry, there is no answer you want here. *_*`)
      }
    })
    .catch((err) => {
      // console.log('')
    })
}
// get data by getWord
async function getWord (word) {
  await axios.get(wordBaseUrl + word)
      .then(async res => {
        let data = res.data
        // 未查询到准确单词
        if (data.length === 0) {
          await getAutoWord(word)
        } else {
          data.forEach((it, idx) => {
            console.log( '\n# ', idx + 1)
            let info = it.senses[0].defs[0]
            console.log('Cn: ', info.defCn.replace(/\s+/g,' '))
            console.log('En: ', info.defEn.replace(/\s+/g,' '))
            console.log('example: ', '\n', '  ' + info.examples[0].cn.replace(/\s+/g,' '),
              '\n', '  ' + info.examples[0].en.replace(/\s+/g,' '))
          })
        }
      })
      .catch(err =>{
        // console.log('')
      }
       )
  }

// readline
rl.on('line', async (line) => {
  if (line.trim() === '') {
    return rl.prompt()
  } else if (line.trim() === 'gg') {
    process.exit(0)
  }

  // get data
  await getWord(line.trim())
  console.log('\n')

  rl.prompt()
}).on('close', () => {
  console.log('Bye...')
  process.exit(0)
})
