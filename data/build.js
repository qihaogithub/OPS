import csv from "csvtojson"
import fs from "fs"
import path from "path"
// import { fromNotion } from "./src/notion/fromNotion.js";
import localCommandDesc from "./src/localCommandDesc.js"

const __dirname = decodeURI(new URL(".", import.meta.url).pathname)

let localPromptDefineMap = {}

// 用于从 Notion 获取数据的
// Add notion database https://www.notion.so/moonvy/5ac19c115d11488f95847c9e2d789dff?v=5ce9b783b4504c23bb7b492aa70c1cfc
// let notionPromptDescMap = await fromNotion();
// Object.assign(localPromptDefineMap, notionPromptDescMap);

// Add src/dict/*.csv
const pathLang = path.join(__dirname, "src", "dict")
console.log(`Reading directory: ${pathLang}`)

try {
    // Debugging: Check if the path exists
    if (!fs.existsSync(pathLang)) {
        throw new Error(`Directory ${pathLang} does not exist.`)
    }
    console.log(`Directory ${pathLang} exists.`)

    const files = fs.readdirSync(pathLang, { withFileTypes: true })
    console.log(
        `Files in directory:`,
        files.map((file) => file.name)
    )

    for (let file of files) {
        console.log(`Processing file: ${file.name}`)
        if (file.isFile() && file.name.toLowerCase().endsWith(".csv")) {
            console.log(`Reading CSV file: ${file.name}`)
            let re = await csv().fromFile(path.join(pathLang, file.name))
            re.forEach((item) => addToMap(item))
            console.log(`Added src/dict/${file.name}`)
        }
    }
    console.log(`Added src/dict/*.csv`)
} catch (error) {
    console.error(`Error reading directory: ${error.message}`)
}

// src/localCommandDesc.js
localCommandDesc().forEach((item) => addToMap(item))
console.log(`Added src/localCommandDesc.js`)

// ------------------------------------

Object.values(localPromptDefineMap).forEach((item) => {
    if (item?.tags?.length === 0) delete item.tags
})

const outputPath = path.join(__dirname, "localPromptDefineMap.json")
const publicOutputPath = path.join(__dirname, "../web/public/localPromptDefineMap.json")

console.log(`Writing files to ${outputPath} and ${publicOutputPath}`)

try {
    // Create directories if they do not exist
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })
    fs.writeFileSync(outputPath, JSON.stringify(localPromptDefineMap, null, 1))
    console.log(`File written: ${outputPath}`)
} catch (error) {
    console.error(`Error writing file ${outputPath}: ${error.message}`)
}

try {
    fs.mkdirSync(path.dirname(publicOutputPath), { recursive: true })
    fs.writeFileSync(publicOutputPath, JSON.stringify(localPromptDefineMap, null, 1))
    console.log(`File written: ${publicOutputPath}`)
} catch (error) {
    console.error(`Error writing file ${publicOutputPath}: ${error.message}`)
}

try {
    let finSize = fs.statSync(outputPath).size
    let itemsLength = Object.keys(localPromptDefineMap).length
    console.log(`[generated] localPromptDescMap.json ( ${itemsLength} items | ${(finSize / 1024).toFixed(1)}KB )`)
} catch (error) {
    console.error(`Error getting file stats: ${error.message}`)
}

// --------------------------

function addToMap(item) {
    const subTypeMap = {
        普通: "normal",
        风格: "style",
        质量: "quality",
        命令: "command",
        负面: "eg",
    }
    let key = item.text.toLowerCase()
    if (item.subType && subTypeMap[item.subType]) {
        item.subType = subTypeMap[item.subType]
    }

    if (localPromptDefineMap[key]) {
        Object.assign(localPromptDefineMap[key], item)
    } else {
        localPromptDefineMap[key] = item
    }
}
