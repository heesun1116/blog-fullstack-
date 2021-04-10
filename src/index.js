//이파일에서만 no-global-assing ESLint 옵션 비활성화

require = require('esm')(module /*, options */);
module.exports = require('./main.js');
