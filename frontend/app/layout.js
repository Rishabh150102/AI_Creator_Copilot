import "./globals.css";

export const metadata = {
  title: "AI Creator Copilot",
  description: "AI SaaS frontend for creator ideation, hooks, titles, and scripts."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
