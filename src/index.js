const app = require("./app");
require("./database");

app.set("port", process.env.PORT || 3050);

async function init() {
  await app.listen(app.get("port"));
  console.log(`server on port ${app.get("port")}`);
}

init();
