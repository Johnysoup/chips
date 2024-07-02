import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const gameData = {
  start: {
    text: "You're hungry and decide to get some fish and chips. As you approach the shop, you see the owner outside.",
    choices: [
      { text: "Kia ora!", nextStep: "inside", correct: true, feedback: "Correct! 'Kia ora' is a common greeting in Te Reo Māori." },
      { text: "Ka kite!", nextStep: "gameOver", message: "Oh no! The owner looks confused and closes the shop early. You go home hungry.", feedback: "Incorrect. 'Ka kite' means 'See you later' and is used when leaving, not greeting." },
      { text: "Say nothing and walk past", nextStep: "gameOver", message: "The owner frowns and puts up a \"Closed\" sign. No fish and chips today!", feedback: "Incorrect. In Māori culture, it's polite to greet people, especially when entering a shop." }
    ]
  },
  inside: {
    text: "You enter the shop and see a long queue. The person in front of you turns around.",
    choices: [
      { text: "Tēnā koe", nextStep: "ordering", correct: true, feedback: "Correct! 'Tēnā koe' is a formal greeting to one person." },
      { text: "Mōrena", nextStep: "gameOver", message: "It's 7 PM! Everyone laughs, and you run out embarrassed.", feedback: "Incorrect. 'Mōrena' means 'Good morning' and isn't appropriate in the evening." },
      { text: "E noho rā", nextStep: "gameOver", message: "The person thinks you're leaving and lets you out of the queue. No dinner tonight!", feedback: "Incorrect. 'E noho rā' means 'Goodbye' (said to someone staying) and isn't a greeting." }
    ]
  },
  ordering: {
    text: "It's your turn to order. The owner asks, \"Kei te pēhea koe?\"",
    choices: [
      { text: "Kei te pai ahau", nextStep: "final", correct: true, feedback: "Correct! 'Kei te pai ahau' means 'I'm good' and is an appropriate response." },
      { text: "Kei hea te wharepaku?", nextStep: "gameOver", message: "The owner points to the back, and you lose your spot in line.", feedback: "Incorrect. 'Kei hea te wharepaku?' means 'Where is the toilet?' which doesn't answer the owner's question." },
      { text: "E hia te utu?", nextStep: "gameOver", message: "The owner looks confused and serves the next customer. You leave hungry.", feedback: "Incorrect. 'E hia te utu?' means 'How much does it cost?' which doesn't answer the owner's question about how you are." }
    ]
  },
  final: {
    text: "The owner hands you the wrapped fish and chips and says, \"Ka pai!\"",
    choices: [
      { text: "Kia ora", nextStep: "almostWin", message: "Not quite right, but the owner appreciates the effort. You get your food, but it's a bit cold.", feedback: "Close, but not quite. 'Kia ora' is more of a greeting than a thank you." },
      { text: "Haere rā", nextStep: "win", correct: true, feedback: "Correct! 'Haere rā' means 'Goodbye' and is appropriate when leaving." },
      { text: "Nau mai", nextStep: "gameOver", message: "The owner thinks you work there now and hands you an apron. No dinner tonight!", feedback: "Incorrect. 'Nau mai' means 'Welcome' and is not appropriate when leaving." }
    ]
  },
  gameOver: {
    text: "Game Over! Would you like to try again?",
    choices: [
      { text: "Try Again", nextStep: "start" }
    ]
  },
  almostWin: {
    text: "Almost perfect! Would you like to try again for a better ending?",
    choices: [
      { text: "Try Again", nextStep: "start" },
      { text: "End Game", nextStep: "end" }
    ]
  },
  win: {
    text: "Congratulations! You've successfully bought your fish and chips while practicing Te Reo Māori!",
    choices: [
      { text: "Play Again", nextStep: "start" },
      { text: "End Game", nextStep: "end" }
    ]
  },
  end: {
    text: "Thanks for playing! Ka pai!",
    choices: []
  }
};

const Game = () => {
  const [currentStep, setCurrentStep] = useState('start');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const handleChoice = (choice) => {
    if (choice.message) {
      setMessage(choice.message);
    } else {
      setMessage('');
    }
    setFeedback(choice.feedback || '');
    setIsCorrect(choice.correct);
    setCurrentStep(choice.nextStep);
  };

  return (
    <div className="opacity-100 transition-opacity duration-500">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="bg-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center text-[#6B8F9C]">Ika me ngā Rīwai Parai</CardTitle>
          <p className="text-sm text-center text-gray-600">Fish and Chips</p>
        </CardHeader>
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
          <p className="text-lg mb-4 text-gray-800 text-center">{gameData[currentStep].text}</p>
          {message && (
            <p className="mb-4 text-red-500 font-semibold text-center">
              {message}
            </p>
          )}
          {feedback && (
            <p className={`mb-4 text-sm font-semibold text-center ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {feedback}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col bg-gray-100 rounded-b-lg">
          {gameData[currentStep].choices.map((choice, index) => (
            <Button 
              key={index} 
              onClick={() => handleChoice(choice)}
              className="mb-2 w-full bg-[#6B8F9C] hover:bg-[#5A7A86] text-white font-semibold py-3 px-4 rounded transition duration-300 text-lg"
            >
              {choice.text}
            </Button>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Game;
