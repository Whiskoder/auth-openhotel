import { api } from "./api.ts";
import { ConfigTypes, Envs } from "shared/types/main.ts";
import { getConfig as $getConfig, getDb, update } from "@oh/utils";
import { captcha } from "./captcha.ts";
import { email } from "./email.ts";
import { otp } from "./otp.ts";
import { tasks } from "./tasks.ts";
import { sessions } from "./sessions.ts";
import { CONFIG_DEFAULT } from "shared/consts/config.consts.ts";

export const System = (() => {
  let $config: ConfigTypes;
  let $envs: Envs;

  const $api = api();
  const $captcha = captcha();
  const $email = email();
  const $otp = otp();
  const $tasks = tasks();
  const $sessions = sessions();
  const $db = getDb({ pathname: `./database` });

  const load = async (envs: Envs) => {
    if (
      envs.version !== "DEVELOPMENT" &&
      (await update({
        targetVersion: "latest",
        version: envs.version,
        repository: "openhotel/auth",
        log: console.log,
        debug: console.debug,
      }))
    )
      return;

    $config = await $getConfig<ConfigTypes>({ defaults: CONFIG_DEFAULT });
    $envs = envs;

    $tasks.load();
    await $db.load();
    await $email.load();
    $api.load();

    $sessions.load();
  };

  const getConfig = (): ConfigTypes => $config;
  const getEnvs = (): Envs => $envs;

  return {
    load,
    getConfig,
    getEnvs,

    db: $db,
    api: $api,
    captcha: $captcha,
    email: $email,
    otp: $otp,
    tasks: $tasks,
    sessions: $sessions,
  };
})();