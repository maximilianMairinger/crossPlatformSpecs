// let os: typeof import("os")


// import crossPlatformSpecs from "../../app/src/crossPlatformSpecs"
// //const testElem = document.querySelector("#test")

// crossPlatformSpecs()


import is from "platform-detect"
import uaParser from "ua-parser-js"
import prettyBytes from "pretty-bytes"
import os from "os"


export let environment = "?"
if (is.node /* this works for both node and deno */) environment = "Server side"
else {
  if (is.web) environment = "Web"
  if (is.website) environment = "Web (main thread)"
  if (is.packaged) environment = "Web app (main thread)"
  if (is.worker) environment = "Web Worker"
}


const uaInfo = is.web ? uaParser(navigator.userAgent) : undefined 

//@ts-ignore
let isDeno = false
try {
  //@ts-ignore
  isDeno = !!Deno
}
catch(e) {}


export let osName = "?";
export let osVersion = "?";

if (is.web) {
  osName = uaInfo.os.name
  osVersion = uaInfo.os.version
}
else if (is.node) { // this works in deno and in node
  if (isDeno) {
    // @ts-ignore
    osName = Deno.build.os
    // @ts-ignore
    // osVersion = "?"; // not natively supported in deno. We could exec a cli command to find out, but with deno being so security conscious, I'm not sure if that's a good idea to prompt the user for basically arbitrary code execution. Maybe a proper API will come in the future.
  }
  else {
    osName = os.platform()
    osVersion = os.release()
    // if (osVersion[0].toLowerCase() === "v") osVersion = osVersion.slice(1)
  }
}


export let runtime = "?"
export let runtimeVersion = "?"




if (is.node) {
  if (isDeno) runtime = "Deno"
  runtime = "Node"
  // @ts-ignore
  if (isDeno) runtimeVersion = Deno.version.deno
  else runtimeVersion = process.versions.node
}
else {
  runtime = uaInfo.browser.name
  runtimeVersion = uaInfo.browser.version
}





export let engine = "?"
export let engineVersion = "?"

if (is.node) {
  if (isDeno) engine = "V8"
  else engine = "V8"
  // @ts-ignore
  if (isDeno) engineVersion = Deno.version.v8
  else engineVersion = process.versions.v8
}
else {
  engine = uaInfo.engine.name
  engineVersion = uaInfo.engine.version
}


export let cpuName = "?"
export let cpuCores = "?"
export let cpuArch = "?"


if (is.node) {
  if (isDeno) {
    // @ts-ignore
    cpuArch = Deno.build.arch
    // @ts-ignore
    // cpuName = Deno.build.target
    // @ts-ignore
    // cpuCores = Deno.build.cpu.cores
  }
  else {
    cpuName = unique(os.cpus().map(c => c.model)).join("/")
    cpuCores = os.cpus().length + ""
    cpuArch = process.arch
  }
}
else {
  if (navigator.hardwareConcurrency) cpuCores = navigator.hardwareConcurrency + ""
  if (uaInfo.cpu.architecture !== undefined) cpuArch = uaInfo.cpu.architecture
}

export let memAvailable = "?"
export let memFree = "?"

if (is.node) {
  if (isDeno) {
    // @ts-ignore
    memAvailable = prettyBytes(Deno.systemMemoryInfo().total * 2 ** 10, {binary: true})
    // @ts-ignore
    memFree = prettyBytes(Deno.systemMemoryInfo().free * 2 ** 10, {binary: true})
  }
  else {
    memAvailable = prettyBytes(os.totalmem(), {binary: true})
    memFree = prettyBytes(os.freemem(), {binary: true})
  }
}
else {
  if ((navigator as any).deviceMemory) memAvailable = prettyBytes((navigator as any).deviceMemory * 2 ** 30, {binary: true})
  
  if ((performance as any).memory) {
    memAvailable = prettyBytes((performance as any).memory.jsHeapSizeLimit, {binary: true})
    memFree = prettyBytes((performance as any).memory.jsHeapSizeLimit - (performance as any).memory.totalJSHeapSize, {binary: true})
  }
}

// todo gpu


function unique(arr: string[]) {
  return [...new Set(arr)]
}



export function allSpecs() {
  return `Platform:
  OS: ${osName} v${osVersion}
  Runtime: ${runtime} v${runtimeVersion}
  Engine: ${engine} v${engineVersion}
Processor:
  Model: ${cpuName}
  Cores: ${cpuCores}
  Architecture: ${cpuArch}
Memory:
  Total/available: ${memAvailable}
  Free: ${memFree}`
}




export default allSpecs



