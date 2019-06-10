export const getEnvSafe = (envName: string): string => {
    const value = process.env[envName];
    if (!value) {
        throw new Error(`Can't get value of precess.env.${envName}`);
    }
    return value;
};
