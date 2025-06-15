import webpack from "webpack";
import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  webpack: (config: Configuration, { dev, isServer }) => {
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:(.+)$/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
      })
    );

    // Handle libsql and native modules
    if (isServer) {
      config.externals = config.externals || [];
      const externals = Array.isArray(config.externals)
        ? config.externals
        : [config.externals];

      // Externalize the entire @libsql and @prisma/adapter-libsql packages
      externals.push(({ request }, callback) => {
        if (
          request?.startsWith("@libsql/") ||
          request?.startsWith("@prisma/adapter-libsql")
        ) {
          return callback(null, `commonjs ${request}`);
        }
        callback();
      });

      config.externals = externals;
    }

    // Add rules to handle various file types that shouldn't be processed
    config.module?.rules?.push(
      { test: /\.md$/, use: "ignore-loader" },
      { test: /LICENSE/, use: "ignore-loader" },
      // Ignore .node files (native binaries)
      {
        test: /\.node$/,
        use: "ignore-loader",
      },
      // Ignore .d.ts files in node_modules
      {
        test: /\.d\.ts$/,
        include: /node_modules/,
        use: "ignore-loader",
      }
    );

    // Additional resolve configuration
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      buffer: require.resolve("buffer/"),
      fs: false,
      path: false,
      crypto: false,
    };

    // Ignore specific problematic modules on client side
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@libsql/core": false,
        "@libsql/client": false,
        "@prisma/adapter-libsql": false,
      };
    }

    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/*.db",
          "**/*.db-journal",
          "**/.git/**",
          "**/.next/**",
          "**/node_modules/**",
        ],
      };
    }

    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      })
    );

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Ensure server-only packages don't get bundled for client
  experimental: {
    serverComponentsExternalPackages: [
      "@libsql/client",
      "@prisma/adapter-libsql",
      "libsql",
    ],
  },
};

export default nextConfig;
