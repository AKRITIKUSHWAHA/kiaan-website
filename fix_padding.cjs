const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('c:/Users/WINDOWS 11/Desktop/Kiaan/Kiaan_Project/src');
let changedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const regex = /(className="[^"]*?)\b(pt-20|pt-24|pt-28)\b([^"]*?")/;
    if (regex.test(content)) {
        content = content.replace(regex, '$1pt-32$3');
        fs.writeFileSync(file, content, 'utf8');
        changedCount++;
        console.log('Fixed:', file);
    }
});

console.log('Total files fixed:', changedCount);
