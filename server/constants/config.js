export const corsOptions = {
  credentials: true,
  origin: [
    'http://localhost:5173',
    'http://localhost:4173r',
    process.env.CLIENT_URL,
  ],
}
