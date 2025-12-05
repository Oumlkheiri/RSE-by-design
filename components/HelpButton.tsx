'use client';

import React, { useState } from 'react';

/**
 * Help button component - shows game instructions
 */
export function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Help button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-0 right-6 z-20 flex items-center justify-center  rounded-full border border-gray-700 bg-gray-800 hover:bg-gray-900 text-white shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Aide"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      </button>

      {/* Help modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="mx-4 w-full max-w-2xl rounded-2xl bg-gray-800 border border-gray-700 p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-white">Comment Jouer</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="space-y-6 text-gray-300">
              {/* Game objective */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Objectif du Jeu</h3>
                <p className="leading-relaxed">
                  Cliquez sur le bon bouton de tri avant que l'objet n'atteigne le bas de l'écran.
                  Chaque tri correct vous rapporte des points et économise du CO₂ !
                </p>
              </div>

              {/* Controls */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Contrôles</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-white">Souris/Tactile :</strong> Cliquez sur les boutons en bas de l'écran
                  </li>
                  <li>
                    <strong className="text-white">Clavier :</strong>
                    <ul className="ml-6 mt-1 space-y-1 list-disc">
                      <li><kbd className="px-2 py-1 bg-gray-700 rounded text-sm">V</kbd> pour Verre</li>
                      <li><kbd className="px-2 py-1 bg-gray-700 rounded text-sm">L</kbd> pour Plastique</li>
                      <li><kbd className="px-2 py-1 bg-gray-700 rounded text-sm">P</kbd> pour Papier</li>
                      <li><kbd className="px-2 py-1 bg-gray-700 rounded text-sm">M</kbd> pour Métal</li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* Game rules */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Règles</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Un seul objet tombe à la fois</li>
                  <li>Vous avez 3 vies au départ</li>
                  <li>Perdez une vie si vous vous trompez ou si l'objet atteint le bas</li>
                  <li>La vitesse augmente avec votre score</li>
                  <li>Le jeu se termine quand vous n'avez plus de vies</li>
                </ul>
              </div>

              {/* Scoring */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Score et CO₂</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>+10 points par tri correct</li>
                  <li>Chaque tri correct économise du CO₂ selon le type d'objet</li>
                  <li>Suivez votre impact environnemental en temps réel</li>
                </ul>
              </div>

              {/* NB Note */}
              <div className="bg-green-900/30 border-l-4 border-green-500 p-4 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-green-400"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-green-400 mb-1">NB :</p>
                    <p className="text-sm leading-relaxed">
                      Ce jeu vise à sensibiliser les utilisateurs aux enjeux du tri sélectif et à l'importance de réduire notre impact environnemental au quotidien.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-500 active:bg-blue-700 shadow-lg"
            >
              Compris
            </button>
          </div>
        </div>
      )}
    </>
  );
}
