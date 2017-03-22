import * as dotenv from 'dotenv';

dotenv.config();

export interface ProjectConfig {
  E20_URL: string;
  E20_SSH_USERNAME: string;
  E20_SSH_PRIVATE_KEY: string,
  E20_SSH_PRIVATE_KEY_PASSPHRASE?: string;
  E20_SSH_USE_SSH_AGENT?: string;
}

export const isTruthy = (value: string | undefined) => Boolean(value) && value !== 'false';

export const config: ProjectConfig = process.env;