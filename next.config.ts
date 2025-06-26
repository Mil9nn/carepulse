import {withSentryConfig} from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withSentryConfig(nextConfig, {

org: "js-mastery-lp",
project: "javascript-nextjs",

silent: !process.env.CI,

widenClientFileUpload: true,

tunnelRoute: "/monitoring",

disableLogger: true,

automaticVercelMonitors: true,
});