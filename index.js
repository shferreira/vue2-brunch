"use strict";

const compiler = require("vueify").compiler;

class BrunchPlugin {
  constructor(config) {
    this.config = config.plugins.vueify || {};
    this.config.extractCSS = true;
  }
  compile(file) {
    var style = "";
    compiler.applyConfig(this.config);
    compiler.on("style", args => style += args.style);
    return new Promise((resolve, reject) => {
      compiler.compile(file.data, file.path, (error, result) => {
        if (error)
          return reject(error);
        return resolve({ data: result, cssExports: style });
      });
    });
  }
}

BrunchPlugin.prototype.brunchPlugin = true;
BrunchPlugin.prototype.type = "javascript";
BrunchPlugin.prototype.extension = "vue";
module.exports = BrunchPlugin;
