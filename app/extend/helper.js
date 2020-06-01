module.exports = {
  // 将字符串的下划线转为驼峰
  toHump(str) {
    return str.replace(/\_(\w)/g, function (all, letter) {
      console.log(all);
      return letter.toUpperCase();
    });
  },

  // 将一个对象的key全部转为驼峰命名
  objKeyToHump(obj) {
    let data = {};
    Object.keys(obj).forEach(key => {
      let tempVal = obj[key];
      key = this.toHump(key);
      data[key] = tempVal;
    })
    return data;
  }
}