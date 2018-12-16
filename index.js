let readFileSync = require('fs').readFileSync;
let replace = require('gulp-replace');

module.exports = () => replace(/import.*['"](.*)['"];/, (match) => {
    let pkgname = match.match(/['"](.*)['"]/)[1];
    let pkgver = JSON.parse(readFileSync("./package.json")).dependencies[pkgname];

    if (!['.', '/'].includes(pkgname[0])) {
        return match.replace(new RegExp(`${pkgname}`), `https://unpkg.com/${pkgname}@${pkgver}?module`);
    }

    return match;
})