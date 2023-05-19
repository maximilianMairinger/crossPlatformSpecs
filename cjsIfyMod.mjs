import { rollup } from 'rollup';
import commander from 'commander';
import path from 'path';
import fs from 'fs';

const { program } = commander;

program
  .argument("<input dir>", "Input dir")
  .action((dir) => {
    for (const file of walkDir(dir).filter(file => file.endsWith(".js"))) {
      rollup({
        input: file,
        


    }
  })


function walkDir(dir) {
  if (!fs.statSync(dir).isDirectory()) return [dir]
  const ls = []
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      ls.push(...walkDir(filePath));
    } else {
      ls.push(filePath);
    }
  }
}
