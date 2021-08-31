export const generateRoutesFromConfigs = (configs, auth = "guest") => {
    let routes = [];
    configs.forEach(config => {
        if (config.auth.find(ele => ele === auth))
            routes = [...routes, ...config.routes]
    });
    return routes;
}