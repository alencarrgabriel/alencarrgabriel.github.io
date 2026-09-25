import type { NextConfig } from "next"
import { build } from "velite"

class VeliteWebpackPlugin {
  static started = false

  apply(compiler: {
    options: { mode: string }
    hooks: { beforeCompile: { tapPromise: (name: string, fn: () => Promise<void>) => void } }
  }) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return
      VeliteWebpackPlugin.started = true
      const dev = compiler.options.mode === "development"
      await build({ watch: dev, clean: !dev })
    })
  }
}

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  webpack(config) {
    config.plugins.push(new VeliteWebpackPlugin())
    return config
  },
}

export default nextConfig
