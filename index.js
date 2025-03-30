const mongoose = require("mongoose");
const { mongoURI, options } = require("./config");
const schemaManager = require("./schemaManager");
const utils = require("./utils");

class EcoDB {
  constructor() {
    this.connection = null;
    this.schemas = {};
  }

  async ConnectDB() {
    if (this.connection) return this.connection;

    try {
      this.connection = await mongoose.connect(mongoURI, options);
      console.log("✅ EcoDB Connected to MongoDB");
      return this.connection;
    } catch (error) {
      console.error("❌ EcoDB Connection Error:", error);
      process.exit(1);
    }
  }

  RegisterSchema(name, schemaDefinition) {
    return schemaManager.registerSchema(name, schemaDefinition);
  }

  RegisterSchemasFromFolder(folderPath) {
    return schemaManager.registerSchemasFromFolder(folderPath);
  }

  GetSchema(name) {
    const schema = schemaManager.getSchema(name);
    if (!schema) throw new Error(`Schema "${name}" not found.`);
    
    schema.toJSON = () => utils.schemaToJSON(name);
    return schema;
  }

  IsConnected() {
    return utils.isDBConnected();
  }

  async FetchData(schemaName, query = {}) {
    return utils.fetchData(schemaName, query);
  }

  async DestroyDB() {
    return utils.destroyDB();
  }
}

module.exports = new EcoDB();
