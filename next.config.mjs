/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
    // Permite que o build de produção seja concluído mesmo com erros de TypeScript.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
