import HangmanGame from "@/components/hangman-game"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
      <HangmanGame />
    </main>
  )
}

