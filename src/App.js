import React, {useState} from "react"
import Header from "./components/Header"
import Body from "./components/Body"
import RulesInput from "./components/RulesInput"
import GameRules from "./components/GameRules"
import LoadingSpinner from "./components/LoadingSpinner"
import Footer from "./components/Footer"

export default function App() {
    const [gameGenerated, setGameGenerated] = useState(false);
    const [gameRules, setGameRules] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [generationError, setGenerationError] = useState(false);

    async function handleGenerateGame(movie, drinkCount) {
      // Handle the generation of game rules
      if (movie.trim() !== '' && Number(drinkCount) >= 1 && Number(drinkCount) <= 20) {
        // Generate new game logic
        setIsLoading(true);
        setGenerationError(false);
        setGameGenerated(false);
        console.log('Generating new game...');
        const [rules, movieExists] = await generateGameRules(movie, drinkCount);
        setGameRules(rules);
        setIsLoading(false);
        if (movieExists)
          setGameGenerated(true);
        else
          setGenerationError(true);
      } else {
        console.log('Invalid input. Please provide a movie and drinks between 1 and 20.');
        setGameGenerated(false);
        setGenerationError(true);
      }
    };

    async function generateGameRules(movie, drinkCount) {
      const url = "https://lx2sxnu4ze.execute-api.us-east-2.amazonaws.com/prod/movie-sips";
      console.log(movie, drinkCount);
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movie: movie,
            num_drinks: drinkCount,
          }),
        });
    
        if (!response.ok) {
          throw new Error("Failed to fetch game rules");
        }
    
        const data = await response.json();
        /*const data = {
          "statusCode": 200,
          "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "POST, OPTIONS"
          },
          "body": "{\"movieExists\": true, \"rules\": {\"sip\": [\"Whenever Jack Sparrow takes a drink\", \"Whenever someone says 'pirate'\", \"Whenever a sword is unsheathed\", \"Whenever a cannon is fired\", \"Whenever someone says 'savvy'\"], \"shot\": [\"Whenever Jack Sparrow escapes danger\", \"Whenever a ship sinks\", \"Whenever someone says 'parley'\", \"Whenever a character dies\", \"Whenever the Black Pearl appears\"], \"finish\": [\"Whenever Jack Sparrow says 'Savvy?'\", \"Whenever the Kraken appears\", \"Whenever someone says 'Yo ho ho and a bottle of rum'\", \"Whenever the cursed treasure is mentioned\", \"Whenever the final battle begins\"]}}"
        }*/
        
        const body = JSON.parse(data.body)
        const movieExists = body.movieExists;
        const rules = body.rules;
    
        console.log("Game rules:", rules);
        console.log(movieExists)
        return [rules, movieExists];
      } catch (error) {
        console.error("Error generating game rules:", error);
        return {};
      }
    }

    return (
      <div className="container">
        <Header />
        <Body />
        <RulesInput generateGame={handleGenerateGame}/>
        {isLoading && (
          <div className="loading-message">
            <div className="loading-spinner">
              <LoadingSpinner />
            </div>
            <p>Loading...</p>
          </div>
        )}
        {generationError && <p className="error-message">Failed to generate game rules. Please try again.</p>}
        {gameGenerated && <GameRules rules={gameRules}/>}
        <Footer />
      </div>
    )
}