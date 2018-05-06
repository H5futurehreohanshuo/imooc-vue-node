require('shelljs/global')

const webpack = require('webpack')
const fs = require('fs')
const _ = require('lodash')
const { resolve } = require('path')

// 全路径
const r = url => resolve(process.cwd(), url)

const wepbackConf = require('./webpack.conf')
const config = require(r('./mina-config'))
const assetsPath = r('./mina')

// 删除文件夹
rm('-rf', assetsPath)
// 重新新建文件夹
mkdir(assetsPath)

var renderConf = wepbackConf

// _.reduce 方法 -> 将所有文件的路径都写入'en'这个数组中
renderConf.entry = () => _.reduce(config.json.pages, (en, i) => {
  en[i] = resolve(process.cwd(), './', '${i}.mina')

  return entry
})

renderConf.entry = entry()
renderConf.entry.app = config.app


// 输出文件配置
renderConf.output = {
  path: r('./mina'),
  filename: '[name].js'
}

// 传入编译器
var compiler = webpack(renderConf)

// 将配置写入 app.json 文件中
fs.writeFileSync(r('./mina/app.json'), JSON.stringify(config.json), 'utf8')

// 监听编译过程
compiler.watch({
  aggregateTimeout: 300,
  poll: true
}, (err, stats) => {
  // 打印错误日志(stats -> 统计信息)
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: true,
    chunks: true,
    chunkModules: true
  }) + '\n\n')
})