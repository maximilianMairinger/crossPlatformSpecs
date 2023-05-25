import build from './build.mjs';
import startBrowser from './browser.mjs';
import startServer from './server.mjs';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await build()
console.log("built")
const { port: _port, server: _server } = startServer()
const port = await _port
const server = await _server
console.log("started server")
const { browser, page } = await startBrowser(port, true)
console.log("started browser")
await page.evaluate(await fs.readFile(path.join(__dirname, 'testDist', 'test.js'), "utf8"))
console.log("evaluated, now done")
browser.close()
server.close()



