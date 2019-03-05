const {compiler} = require("vueify");
const {promisify} = require("util");

class BrunchPlugin {
  constructor(config) {
    this.config = config.plugins.vueify || {};
    this.config.extractCSS = true;
  }
  async compile({ data, path }) {
    var style = "";
    compiler.applyConfig(this.config);
    compiler.on("style", args => style += args.style);
    const result = await promisify(compiler.compile)(data, path);
    return { data: result, cssExports: style };
  }
}

BrunchPlugin.prototype.brunchPlugin = true;
BrunchPlugin.prototype.type = "javascript";
BrunchPlugin.prototype.extension = "vue";
module.exports = BrunchPlugin;
