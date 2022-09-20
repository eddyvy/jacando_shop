type AppEnvironment = {
  NODE_ENV: string
  APP_PORT: string
}

const defaultEnv: AppEnvironment = {
  NODE_ENV: 'test',
  APP_PORT: '4000',
}

export function testEnv(
  customEnv: Partial<AppEnvironment> = {},
): AppEnvironment {
  const env = { ...defaultEnv, ...customEnv }
  Object.entries(env).forEach(([k, v]) => {
    process.env[k] = v
  })
  return env
}
