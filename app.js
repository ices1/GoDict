const axios = require('axios')
const wordBaseUrl = 'http://104.194.71.73:5001/word/'
const AutoBaseUrl = 'http://104.194.71.73:5001/autocomplete/'

// let options = {
//   hostname: '127.0.0.1',
//   port: 8080,
//   path: '/http://4.cddm.me:5001/word/love'
// };


const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'GoDict >>> '
});

rl.prompt();

function getAutoWord(word) {
  console.log('未查询到准确单词, 以下为相关联想词')
  axios.get(AutoBaseUrl + word)
    .then((res) => 
      // res.data.results.forEach((it,cur) => console.log(it.searchtext))
      console.log(res.data.results.reduce((pre,cur) => pre +=cur.searchtext + ', ', ''))
    )
    .catch((err) => {
      console.log(err)
    })
}

rl.on('line', async (line) => {

  // 开始请求数据
  await axios.get(wordBaseUrl + line.trim())
    .then(res => {
      let data = res.data

      // 未查询到准确单词
      if (data.length === 0) {
        getAutoWord(line.trim())
        rl.prompt();
      } else {
        data.forEach((it, idx) => {
          console.log( ' #', idx + 1)
          let info = it.senses[0].defs[0]
          console.log('Cn: ', info.defCn.replace(/\s+/g,' '))
          console.log('En: ', info.defEn.replace(/\s+/g,' '))
          console.log('example: ', '\n', '  ' + info.examples[0].cn.replace(/\s+/g,' '),'\n', '  ' + info.examples[0].en.replace(/\s+/g,' '))
        })
        // console.log()
      }
    })
    .catch(err => console.log(err))
  rl.prompt();
}).on('close', () => {
  console.log('Bye...');
  process.exit(0);
});



// axios.listen(80, console.log('(GoDict)listen on port 80...'))
