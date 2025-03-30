# Eco-DB

```js
const ecodb = require("./index")

ecodb.RegisterSchemasFromFolder("path")

const User = ecodb.GetSchema("User");

await User.insertMany([
    { username: "User1", email: "user1@example.com", age: 22 },
    { username: "User2", email: "user2@example.com", age: 30 }
  ])


  if(ecodb.IsConnected()) {
    console.log("DB is Connected")
  } else {
    console.log("DB is not Connected")
  }

  ```


