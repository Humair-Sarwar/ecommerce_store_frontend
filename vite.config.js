import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jwt_decode from "jwt-decode/build/jwt-decode.esm.js";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
