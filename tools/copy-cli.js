const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../dist/@nyaf/cli/');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, 0744);
}
// destination.txt will be created or overwritten by default.
fs.copyFile(path.join(__dirname, '../src/packages/@nyaf/cli/package.json'), path.join(__dirname, '../dist/@nyaf/cli/package.json'), (err) => {
  if (err) throw err;
});
fs.copyFile(path.join(__dirname, '../src/packages/@nyaf/cli/cli.js'), path.join(__dirname, '../dist/@nyaf/cli/cli.js'), (err) => {
  if (err) throw err;
});
