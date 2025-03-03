"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Moon, Sun } from "lucide-react"
import HangmanDrawing from "./hangman-drawing"
import Keyboard from "./keyboard"
import { wordList } from "@/data/word-list"
import { useTheme } from "next-themes"

export default function HangmanGame() {
  const [word, setWord] = useState("")
  const [hint, setHint] = useState("")
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([])
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing")
  const [showHint, setShowHint] = useState(false)
  const [score, setScore] = useState(0)
  const { theme, setTheme } = useTheme()

  const maxWrongGuesses = 6

  // Initialize the game
  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length)
    const { word: newWord, hint: newHint } = wordList[randomIndex]
    setWord(newWord.toLowerCase())
    setHint(newHint)
    setGuessedLetters([])
    setWrongGuesses([])
    setGameStatus("playing")
    setShowHint(false)
  }

  const handleGuess = (letter: string) => {
    if (gameStatus !== "playing" || guessedLetters.includes(letter)) return

    const newGuessedLetters = [...guessedLetters, letter]
    setGuessedLetters(newGuessedLetters)

    if (!word.includes(letter)) {
      const newWrongGuesses = [...wrongGuesses, letter]
      setWrongGuesses(newWrongGuesses)

      if (newWrongGuesses.length >= maxWrongGuesses) {
        setGameStatus("lost")
      }
    } else {
      // Check if player has won
      const isWon = word.split("").every((char) => newGuessedLetters.includes(char) || char === " ")

      if (isWon) {
        setGameStatus("won")
        setScore((prevScore) => prevScore + 1)
      }
    }
  }

  const toggleHint = () => {
    setShowHint(!showHint)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Display the word with guessed letters revealed
  const displayWord = word.split("").map((letter, index) => {
    const isSpace = letter === " "
    const isGuessed = guessedLetters.includes(letter)
    const shouldReveal = isGuessed || isSpace || gameStatus === "lost"

    return (
      <span
        key={index}
        className={`inline-block mx-1 text-center ${isSpace ? "w-4" : "w-8"} border-b-2 border-primary pb-1 text-2xl font-bold`}
      >
        {shouldReveal ? letter : "_"}
      </span>
    )
  })

  return (
    <Card className="w-full max-w-3xl shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Hangman Game</CardTitle>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-sm">
            Score: {score}
          </Badge>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-6">
        <div className="w-full max-w-xs">
          <HangmanDrawing wrongGuesses={wrongGuesses.length} />
        </div>

        <div className="flex flex-wrap justify-center my-4">{displayWord}</div>

        {gameStatus === "won" && (
          <div className="text-center p-3 bg-green-100 dark:bg-green-900 rounded-md w-full">
            <p className="text-green-700 dark:text-green-300 font-medium">Congratulations! You won!</p>
          </div>
        )}

        {gameStatus === "lost" && (
          <div className="text-center p-3 bg-red-100 dark:bg-red-900 rounded-md w-full">
            <p className="text-red-700 dark:text-red-300 font-medium">
              Game over! The word was: <span className="font-bold">{word}</span>
            </p>
          </div>
        )}

        <div className="flex items-center gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleHint}
            className="flex items-center gap-2"
            disabled={gameStatus !== "playing"}
          >
            <Lightbulb className="h-4 w-4" />
            {showHint ? "Hide Hint" : "Show Hint"}
          </Button>

          {showHint && (
            <div className="flex-1 p-2 bg-muted rounded-md text-sm">
              <p>{hint}</p>
            </div>
          )}
        </div>

        <Keyboard
          guessedLetters={guessedLetters}
          wrongLetters={wrongGuesses}
          onGuess={handleGuess}
          disabled={gameStatus !== "playing"}
        />
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button onClick={startNewGame} className="w-full sm:w-auto">
          {gameStatus === "playing" ? "New Game" : "Play Again"}
        </Button>
      </CardFooter>
    </Card>
  )
}

