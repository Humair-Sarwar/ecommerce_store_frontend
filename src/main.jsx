import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/style.css'
import './css/media.css'
import App from './App.jsx'
import 'react-toastify/ReactToastify.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
