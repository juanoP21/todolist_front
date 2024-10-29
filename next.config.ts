// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login', // Cambia "/login" por la ruta a la que deseas redirigir
        permanent: true,
      },
    ];
  },
};
