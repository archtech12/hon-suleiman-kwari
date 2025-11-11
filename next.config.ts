import {NextConfig} from 'next'

const config: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [{hostname: 'cdn.sanity.io'}],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default config