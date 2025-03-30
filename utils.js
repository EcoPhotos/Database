const mongoose = require("mongoose");

function isDBConnected() {
  return mongoose.connection.readyState === 1;
}

async function fetchData(schemaName, query = {}) {
  const model = mongoose.models[schemaName];
  if (!model) throw new Error(`Schema "${schemaName}" not found.`);
  return await model.find(query).lean();
}

async function destroyDB() {
  if (!isDBConnected()) {
    console.log("⚠️ Database not connected.");
    return;
  }

  await mongoose.connection.dropDatabase();
  console.log("💥 Database destroyed!");
}

function schemaToJSON(name) {
  const model = mongoose.models[name];
  if (!model) throw new Error(`Schema "${name}" not found.`);
  return JSON.stringify(model.schema.obj, null, 2);
}

module.exports = { isDBConnected, fetchData, destroyDB, schemaToJSON };
