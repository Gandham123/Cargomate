const webpack=require('webpack');
module.exports=function override(config){
    const fallback=config.resolve.fallback || {};
    Object.assign(fallback,{
        "zlib": require.resolve("browserify-zlib"),
        "querystring": require.resolve("querystring-es3"),
        "path": require.resolve("path-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        fs:false,
        "stream": require.resolve("stream-browserify"),
        "http": require.resolve("stream-http"),
        net:false,
        "util": require.resolve("util/"),
        "buffer": require.resolve("buffer/"),
        "assert": require.resolve("assert/"),
        "url": require.resolve("url/")
    });
    config.resolve.fallback=fallback;
    config.plugins=(config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process:"process/browser",
        })
    ])
    return config;
}