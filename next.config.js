/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
};

const withTM = require("next-transpile-modules")(["vis-timeline"]);
module.exports = withTM({});
