import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { AuthRouter } from "../auth/router";
import { UserRouter } from "../user/router";

export function setupRoutes(router: FastifyInstance) {
  router.get("/_render/health", async () => "ok");
  router.register(setup, { prefix: "api/v1" });
}

const setup: FastifyPluginAsync = async (router) => {
  UserRouter(router);
  AuthRouter(router);
};