import '../components/globals.css';

export const metadata = {
  title: "Missionaries and Cannibals Game",
  description: "A puzzle game where missionaries and cannibals must cross a river",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}