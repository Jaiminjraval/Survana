// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// // // below is ok 10-09-2025 // // //

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173, // Your frontend port
//     proxy: {
//       // Proxy requests from /api to your backend server
//       '/api': {
//         target: 'http://localhost:5000', // Your backend server URL
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // You can set your frontend port here
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Your backend server URL
        changeOrigin: true,
      },
    },
  },
});
