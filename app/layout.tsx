import type { Metadata } from "next"
import { JetBrains_Mono, Inter } from "next/font/google"
import "./globals.css"
import { LangProvider } from "@/lib/lang"

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Gabriel Alencar — Software Developer",
  description: "Software Developer: Web · Mobile · Desktop. Studying pentest and security, documented in public.",
  keywords: ["NestJS", "Flutter", "Next.js", "TypeScript", "Python", "Software Developer", "Cybersecurity", "Pentest"],
  openGraph: {
    title: "Gabriel Alencar — Software Developer",
    description: "Web · Mobile · Desktop. Projects that ship.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${jetbrains.variable} ${inter.variable} bg-[#09090B] text-zinc-100 antialiased`}>
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  )
}
