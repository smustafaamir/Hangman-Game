import { Button } from "@/components/ui/button"

interface KeyboardProps {
  guessedLetters: string[]
  wrongLetters: string[]
  onGuess: (letter: string) => void
  disabled: boolean
}

export default function Keyboard({ guessedLetters, wrongLetters, onGuess, disabled }: KeyboardProps) {
  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ]

  const getButtonVariant = (letter: string) => {
    if (wrongLetters.includes(letter)) {
      return "destructive"
    }
    if (guessedLetters.includes(letter)) {
      return "secondary"
    }
    return "outline"
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 mb-2">
          {row.map((letter) => (
            <Button
              key={letter}
              variant={getButtonVariant(letter)}
              size="sm"
              className="w-8 h-8 p-0 text-center font-medium"
              onClick={() => onGuess(letter)}
              disabled={guessedLetters.includes(letter) || disabled}
            >
              {letter}
            </Button>
          ))}
        </div>
      ))}
    </div>
  )
}

