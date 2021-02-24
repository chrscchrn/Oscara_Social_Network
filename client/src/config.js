import configJson from "./auth_config.json";

export function getConfig() {

    const audience = process.env.audience || 
        (configJson.audience && configJson.audience !== "YOUR_API_IDENTIFIER")
            ? configJson.audience
            : null;

    return {
        domain: process.env.domain || configJson.domain,
        clientId: process.env.clientId || configJson.clientId,
        ...(audience ? { audience } : null),
    };
}