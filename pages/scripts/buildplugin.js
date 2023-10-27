const path = require('path');
const fse = require('fs-extra');

module.exports = class BuildPlugin {
  constructor (props) {
    this._props = props;
  }

  apply (compiler) {
    compiler.hooks.done.tap('BuildPluginDone', () => {
      const { rootPath, outputPath } = this._props;
      fse.copySync(path.resolve(rootPath, './templates/css'), path.resolve(outputPath, './css'));
      fse.copySync(path.resolve(rootPath, './templates/public'), path.resolve(outputPath, './public'));
    });
  }
};
