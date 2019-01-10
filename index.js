let readFileSync = require('fs').readFileSync;
let replace = require('gulp-replace');

const importRegex = /import.*['"]([^/]*)(.*)['"];/

module.exports = () => replace(importRegex, (match) => {


    let fullImport = match.match(importRegex)[1];
    let packageName = match.match(importRegex)[2];
    let packageSubpath = match.match(importRegex)[3];

    let packageVersion = JSON.parse(readFileSync("./package.json")).dependencies[pkgname];

    if (!['.', '/'].includes(pkgname[0])) {
        return match.replace(new RegExp(`${fullImport}`), `https://unpkg.com/${packageName}@${packageVersion}${packageSubpath}?module`);
    }

    return match;
})