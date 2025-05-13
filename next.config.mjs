import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'api.soomha.net',
      pathname: '/**', // allow all paths from this domain
    },
  ],
}

};



export default withNextIntl(nextConfig);
