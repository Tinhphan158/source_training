const dayjs = require("dayjs")

function buildInfoPlugin(version, name) {
  const startTime = Date.now()
  return {
    name: "buildInfoPlugin",
    buildStart() {
      console.log("\u001B[32m", "Build process has started...")
    },
    buildEnd() {
      const endTime = Date.now()
      const buildTime = endTime - startTime
      const hash = `${startTime}${endTime}`
      console.log("\n")
      console.log(
        "\u001B[32m",
        `

        _   _ ____  __  __ 
        | | | |  _ \|  \/  |
        | |_| | |_) | |\/| |
        |  _  |  _ <| |  | |
        |_| |_|_| \_\_|  |_|
                            
      `
      )
      console.log("\u001B[32m", `***************00***************`)
      console.log("\u001B[32m", "   HRM build information")
      console.log("\u001B[32m", `Hash: ${hash}`)
      console.log("\u001B[32m", `Application: ${name}`)
      console.log("\u001B[32m", `Version: ${version}`)
      console.log("\u001B[32m", `Time: ${buildTime} ms`)
      console.log("\u001B[32m", `Build Date: ${dayjs().format("DD/MM/YYYY hh:mm:ss")}`)
      console.log("\u001B[32m", `***************00***************\n`)
    },
  }
}

module.exports = buildInfoPlugin
