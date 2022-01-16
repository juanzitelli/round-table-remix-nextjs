const customPackages = ["ui", "supabase-sdk"];

const withTM = require("next-transpile-modules")(customPackages);

module.exports = withTM({
  reactStrictMode: true,
});
