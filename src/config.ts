export const SECRET = 'secret-key';

export interface Configuration {
  port: number;
  prefix: string;
}

export function configurationFactory(): Configuration {
  return {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
    prefix: process.env.PREFIX ?? 'api',
  };
}
