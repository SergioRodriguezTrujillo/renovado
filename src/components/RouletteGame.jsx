"use client"

import { useState } from "react"
import "./RouletteGame.css"

function RouletteGame({ onClose, onWin }) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState(null)
  const [showResult, setShowResult] = useState(false)

  // Configuración de la ruleta: 10 segmentos de 36 grados cada uno
  const segments = [
    { label: "¡GRATIS!", color: "#ff6b6b", isWin: true, angle: 36 },
    { label: "¡Ánimo!", color: "#4ecdc4", isWin: false, angle: 36 },
    { label: "¡Sigue!", color: "#45b7d1", isWin: false, angle: 36 },
    { label: "¡Vamos!", color: "#96ceb4", isWin: false, angle: 36 },
    { label: "¡Fuerza!", color: "#ffeaa7", isWin: false, angle: 36 },
    { label: "¡Dale!", color: "#dda0dd", isWin: false, angle: 36 },
    { label: "¡Tú puedes!", color: "#98d8c8", isWin: false, angle: 36 },
    { label: "¡Intenta!", color: "#f7dc6f", isWin: false, angle: 36 },
    { label: "¡Persiste!", color: "#bb8fce", isWin: false, angle: 36 },
    { label: "¡No pares!", color: "#85c1e9", isWin: false, angle: 36 },
  ]

  const spinRoulette = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setShowResult(false)
    setResult(null)

    // Generar número aleatorio para determinar si gana (10% probabilidad)
    const random = Math.random()
    const isWinner = random < 0.1 // 10% de probabilidad

    // Calcular rotación final con más vueltas y animación más larga
    const baseRotation = 2160 + Math.random() * 2160 // Entre 6 y 12 vueltas completas
    let finalRotation

    if (isWinner) {
      // Si gana, que caiga en el primer segmento (0-36 grados)
      finalRotation = baseRotation + Math.random() * 36
    } else {
      // Si no gana, que caiga en cualquier otro segmento (36-360 grados)
      finalRotation = baseRotation + (36 + Math.random() * 324)
    }

    setRotation(finalRotation)

    // Mostrar resultado después de la animación más larga
    setTimeout(() => {
      setIsSpinning(false)
      setResult(isWinner ? "win" : "lose")
      setShowResult(true)

      if (isWinner) {
        setTimeout(() => onWin(), 3000)
      }
    }, 6000) // Aumentado a 6 segundos
  }

  const handleTryAgain = () => {
    setShowResult(false)
    setResult(null)
    setRotation(0)
  }

  const handleClose = () => {
    if (!isSpinning) {
      onClose()
    }
  }

  return (
    <div className="roulette-overlay" onClick={handleClose}>
      <div className="roulette-container" onClick={(e) => e.stopPropagation()}>
        <div className="roulette-header">
          <h2>🎰 Ruleta de la Suerte</h2>
          <p>¡Gira la ruleta y podrías ganar un pelado gratis!</p>
          <button className="close-roulette" onClick={handleClose} disabled={isSpinning}>
            ✕
          </button>
        </div>

        <div className="roulette-game">
          <div className="roulette-wheel-container">
            <div className="roulette-pointer">▼</div>
            <div
              className={`roulette-wheel ${isSpinning ? "spinning" : ""}`}
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {segments.map((segment, index) => (
                <div
                  key={index}
                  className="segment"
                  style={{
                    background: segment.color,
                    clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(((index * 36 - 90) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((index * 36 - 90) * Math.PI) / 180)}%, ${50 + 50 * Math.cos((((index + 1) * 36 - 90) * Math.PI) / 180)}% ${50 + 50 * Math.sin((((index + 1) * 36 - 90) * Math.PI) / 180)}%)`,
                  }}
                >
                  <span
                    style={{
                      transform: `rotate(${index * 36 + 18}deg)`,
                      position: "absolute",
                      top: "20%",
                      left: "50%",
                      transformOrigin: "0 100px",
                      fontSize: "0.7rem",
                      fontWeight: "bold",
                      color: "white",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {segment.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="roulette-controls">
            <button
              className={`spin-button ${isSpinning ? "spinning" : ""}`}
              onClick={spinRoulette}
              disabled={isSpinning}
            >
              {isSpinning ? (
                <>
                  <div className="spinner"></div>
                  Girando...
                </>
              ) : (
                <>
                  <i className="material-icons">casino</i>
                  ¡GIRAR RULETA!
                </>
              )}
            </button>
          </div>

          {showResult && (
            <div className={`result-modal ${result}`}>
              <div className="result-content">
                {result === "win" ? (
                  <>
                    <div className="result-icon win">🎉</div>
                    <h3>¡FELICITACIONES!</h3>
                    <p>¡Has ganado un pelado gratis!</p>
                    <p className="result-instruction">Muestra esta pantalla en la barbería para reclamar tu premio</p>
                    <div className="winner-code">Código: WINNER{Date.now().toString().slice(-6)}</div>
                  </>
                ) : (
                  <>
                    <div className="result-icon lose">😔</div>
                    <h3>¡Casi lo logras!</h3>
                    <p>Esta vez no fue, pero puedes intentar de nuevo</p>
                    <p className="result-instruction">¡No te desanimes! Siempre hay una nueva oportunidad</p>
                  </>
                )}
                <button className="result-button" onClick={result === "win" ? handleClose : handleTryAgain}>
                  {result === "win" ? "¡Genial!" : "Intentar de nuevo"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="roulette-info">
          <p>🍀 Probabilidad de ganar: 10%</p>
          <p>🎁 Premio: Un pelado completamente gratis</p>
        </div>
      </div>
    </div>
  )
}

export default RouletteGame
