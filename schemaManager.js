const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const registeredSchemas = {};

function registerSchema(name, schemaDefinition) {
  if (!registeredSchemas[name]) {
    const schema = new mongoose.Schema(schemaDefinition);
    registeredSchemas[name] = mongoose.model(name, schema);
  }
  return registeredSchemas[name];
}

function getSchema(name) {
  return registeredSchemas[name] || null;
}

function registerSchemasFromFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  
  files.forEach((file) => {
    if (file.endsWith(".js")) {
      const schemaName = path.basename(file, ".js");
      const schemaDefinition = require(path.join(folderPath, file));

      registerSchema(schemaName, schemaDefinition);
      console.log(`✅ Registered Schema: ${schemaName}`);
    }
  });
}

module.exports = { registerSchema, getSchema, registerSchemasFromFolder };
