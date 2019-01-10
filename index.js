let readFileSync = require('fs').readFileSync;
let replace = require('gulp-replace');

const importRegex = /import.*['"]([^/]*)(.*)['"];/

module.exports = () => replace(importRegex, (match) => {
    let pkgname = match.match(importRegex)[1];
    let pkgver = JSON.parse(readFileSync("./package.json")).dependencies[pkgname];
    let pkgSubpath = match.match(importRegex)[2];

    if (!['.', '/'].includes(pkgname[0])) {
        return match.replace(new RegExp(`${pkgname}`), `https://unpkg.com/${pkgname}@${pkgver}${pkgSubpath}?module`);
    }

    return match;
})