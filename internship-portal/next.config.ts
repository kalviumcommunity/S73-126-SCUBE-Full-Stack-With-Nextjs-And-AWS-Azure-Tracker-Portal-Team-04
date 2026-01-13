/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Enforce HTTPS
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },

          // Prevent clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },

          // Prevent MIME sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },

          // Basic XSS protection
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },

          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; " +
              "script-src 'self'; " +
              "style-src 'self' 'unsafe-inline'; " +
              "img-src 'self' data:; " +
              "font-src 'self'; " +
              "connect-src 'self';",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
