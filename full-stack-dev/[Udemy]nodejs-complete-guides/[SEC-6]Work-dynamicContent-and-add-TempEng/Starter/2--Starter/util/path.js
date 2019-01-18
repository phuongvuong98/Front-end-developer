const path = require('path');

// export root path
// process: global process variable which available in all file
// main module: refer to the main and call filename
module.exports = path.dirname(process.mainModule.filename);