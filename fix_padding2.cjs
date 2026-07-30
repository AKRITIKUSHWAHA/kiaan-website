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
    // Replace pt-32 with pt-[110px] only in className strings (main page containers)
    const newContent = content.replace(/(className="[^"]*?)\bpt-32\b([^"]*?")/g, '$1pt-[110px]$2');
    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        changedCount++;
        console.log('Fixed:', file);
    }
});

console.log('Total files fixed:', changedCount);
