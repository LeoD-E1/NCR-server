import restify from "restify";
import logger from "morgan";
import corsMiddleware from "restify-cors-middleware2";
// principal Router handler
import router from "../routes";

const server = restify.createServer({
  name: `${process.env.SERVICE_NAME}`,
  version: `${process.env.SERVICE_VERSION}`,
});

const cors = corsMiddleware({
  origins: ["http://localhost:3000", "http://localhost:3001"],
  allowHeaders: ["API-Token", "*"],
  exposeHeaders: ["API-Token-Expiry"],
});

// middleware
server.use(logger("dev"));
server.pre(cors.preflight);
server.use(cors.actual);

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
router.applyRoutes(server);
export default server;
