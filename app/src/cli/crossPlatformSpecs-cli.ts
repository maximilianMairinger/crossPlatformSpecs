#!/usr/bin/env node
import * as specMod from "../crossPlatformSpecs"
import { program } from "commander"
import reqPackageJson, { reqPackagePath } from "req-package-json"
const config = reqPackageJson()
// import * as console from "./../lib/logger"


program
  .version(config.version)
  .description(config.description)
  .name(config.name)
  // .option('-s, --silent', 'silence stdout')
  // .argument('<required example>', "description of required example")
  // .argument('[optional example]', "description of optional example")
  .argument('[specific spec]', `Optionally provide a spec name of interest to only return that spec. Can be one of ["environment", "osName", "osVersion", "runtime", "runtimeVersion", "engine", "engineVersion", "cpuName", "cpuCores", "cpuArch", "memAvailable", "memFree"]. If omitted, a summery of all specs will be returned.`)
  .action((spec, options) => {
    // console.setVerbose(!options.silent)
    
    if (spec !== undefined) console.log(specMod[spec])
    else console.log(specMod.allSpecs())
  })

.parse(process.argv)

