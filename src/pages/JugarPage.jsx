"use client"

import { useState } from "react"
import RouletteGame from "../components/RouletteGame"
import "./JugarPage.css"

function JugarPage() {
  const [showRoulette, setShowRoulette] = useState(false)

  return (
    <div className="jugar-page">
      <div className="container">
        <div className="jugar-hero">
          <h1>🎰 Zona de Juegos</h1>
          <p>¡Diviértete y gana premios increíbles!</p>
        </div>

        <div className="games-grid">
          <div className="game-card">
            <div className="game-icon">🎯</div>
            <h3>Ruleta de la Suerte</h3>
            <p>
              Gira la ruleta y podrías ganar un pelado completamente gratis. ¡Solo tienes un 10% de probabilidad, pero
              vale la pena intentarlo!
            </p>
            <button className="play-button" onClick={() => setShowRoulette(true)}>
              <i className="material-icons">casino</i>
              Jugar Ahora
            </button>
          </div>

          <div className="game-card coming-soon">
            <div className="game-icon">🎮</div>
            <h3>Próximamente</h3>
            <p>Más juegos emocionantes están en camino. ¡Mantente atento para más oportunidades de ganar!</p>
            <button className="play-button" disabled>
              <i className="material-icons">schedule</i>
              Próximamente
            </button>
          </div>
        </div>

        <div className="game-info">
          <h2>🏆 Premios Disponibles</h2>
          <div className="prizes-grid">
            <div className="prize-card">
              <div className="prize-icon">✂️</div>
              <h4>Pelado Gratis</h4>
              <p>Un corte de cabello completamente gratuito</p>
            </div>
            <div className="prize-card">
              <div className="prize-icon">🎁</div>
              <h4>Más Premios</h4>
              <p>Próximamente más premios increíbles</p>
            </div>
          </div>
        </div>
      </div>

      {showRoulette && (
        <RouletteGame
          onClose={() => setShowRoulette(false)}
          onWin={() => {
            // La ruleta ya no se cierra automáticamente
          }}
        />
      )}
    </div>
  )
}

export default JugarPage
