const path = require('path');
const fs = require('fs');

//递归获取指定目录下的所有指定后缀名文件列表
export const walk = function (dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (let i = 0; i < list.length; i++) {
    file = dir + '/' + list[i];
      if (path.extname(file) === '.md') {
        results.push(file);
      }
  }
  const res = results.map((item) => { return{
    text: path.basename(item,'.md'),
    link: item.slice(6,-3)
  } })
  const sortRes = res.sort((a,b) => { 
    const index1 = Number(a.text.split('.')[0])
    const index2 = Number(b.text.split('.')[0])
    return index1-index2
   })
  return sortRes;
};
