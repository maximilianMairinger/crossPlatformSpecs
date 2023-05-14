#!/usr/bin/env node
import crossPlatformSpecs from "../crossPlatformSpecs"
import { program } from "commander"
import reqPackageJson, { reqPackagePath } from "req-package-json"
import {promises as fs} from "fs"
import * as path from "path"
const config = reqPackageJson()
import * as console from "./../lib/logger"

program
  .version(config.version)
  .description(config.description)
  .name(config.name)
  .option('-s, --silent', 'silence stdout')
  // .argument('<required example>', "description of required example")
  // .argument('[optional example]', "description of optional example")
  .action((...args, options) => {
    console.setVerbose(!options.silent)
    
    crossPlatformSpecs(...args)
    
    
  })

.parse(process.argv)

