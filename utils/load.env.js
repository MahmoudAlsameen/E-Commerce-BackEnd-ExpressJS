// add the environment variable to the app
import dotenv from "dotenv";

export const load_env = function () {
  let configPath, result;
  switch (process.env.NODE_ENV) {
    case "prod":
      configPath = "config/.env.prod";
      result = dotenv.config({ path: configPath });
      process.env = {
        ...process.env,
        ...result,
      };
      break;
    case "test":
      configPath = "config/.env.test";
      result = dotenv.config({ path: configPath });
      process.env = {
        ...process.env,
        ...result,
      };
      break;
    case "dev":
      configPath = "config/.env.dev";
      result = dotenv.config({ path: configPath });
      process.env = {
        ...process.env,
        ...result,
      };
      break;
    default:
      dotenv.config();
      break;
  }
};
