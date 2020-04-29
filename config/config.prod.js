/**
 * 生产环境配置
 *
 * 最终生效的配置为 prod + default（前者覆盖后者）
 */

module.exports = (app) => {
  const exports = {};
  exports.cluster = {
    listen: {
      path: "",
      port: 6688,
      hostname: "127.0.0.1",
    },
  };
  return exports;
};
