import "dotenv/config";
import server from "./server/index";

server.listen(process.env.PORT || 3000, () => {
  console.log("%s listening at %s", server.name, process.env.PORT || 3000);
});
