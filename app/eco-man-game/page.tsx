"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Leaf,
  Droplet,
  Sun,
  Wind,
  Recycle,
  RefreshCw,
  Zap,
  Shield,
  Home,
  Mountain,
  Trees,
  Globe,
  Heart,
  Trophy,
  AlertCircle,
  Target,
  Flame,
  Coffee,
  Trash2,
  Cloud,
  Battery,
  Factory,
  Gamepad2,
  Pause,
  Play,
  SkipBack,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  X,
  Check,
  Lock,
  ChevronRight,
  Star,
  RefreshCcw,
  Activity,
} from "lucide-react";

const CELL_SIZE = 30;
const MOBILE_CELL_SIZE = 20;
const GRID_WIDTH = 19;
const GRID_HEIGHT = 21;

// Color palette
const COLORS = {
  primary: "#120e0c",
  secondary: "#07b549",
  accent: "#cec38c",
  background: "#0a0908",
  lightBg: "#1a1715",
  text: "#f0f0f0",
};

// Level configurations
const NIVEAUX = [
  {
    id: 1,
    nom: "Rues Urbaines",
    icon: Home,
    maze: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
      [1, 3, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 3, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1],
      [0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0],
      [1, 1, 1, 1, 2, 1, 0, 1, 1, 0, 1, 1, 0, 1, 2, 1, 1, 1, 1],
      [0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0],
      [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1],
      [0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0],
      [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
      [1, 3, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 3, 1],
      [1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1],
      [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    fantomes: 4,
    vitesse: 300,
    recyclables: 172,
  },
  {
    id: 2,
    nom: "Chemin Forestier",
    icon: Trees,
    maze: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1],
      [1, 3, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 3, 1],
      [1, 2, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1],
      [0, 0, 1, 2, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 2, 1, 0, 0],
      [1, 1, 1, 2, 1, 1, 2, 1, 0, 0, 0, 1, 2, 1, 1, 2, 1, 1, 1],
      [0, 0, 0, 2, 1, 2, 2, 1, 0, 1, 0, 1, 2, 2, 1, 2, 0, 0, 0],
      [1, 1, 1, 2, 2, 2, 1, 1, 0, 0, 0, 1, 1, 2, 2, 2, 1, 1, 1],
      [0, 0, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 1, 2, 1, 1, 1, 0, 0],
      [1, 1, 1, 2, 2, 2, 1, 0, 1, 1, 1, 0, 1, 2, 2, 2, 1, 1, 1],
      [0, 0, 1, 2, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 2, 1, 0, 0],
      [1, 1, 1, 2, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 2, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 3, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    fantomes: 5,
    vitesse: 250,
    recyclables: 152,
  },
  {
    id: 3,
    nom: "Passage Montagneux",
    icon: Mountain,
    maze: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 2, 1],
      [1, 2, 1, 3, 1, 1, 2, 1, 3, 1, 3, 1, 2, 1, 1, 3, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 2, 1, 0, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 2, 1, 0, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
      [1, 2, 0, 3, 1, 1, 2, 1, 3, 2, 3, 1, 2, 1, 1, 3, 0, 2, 1],
      [1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    fantomes: 6,
    vitesse: 200,
    recyclables: 165,
  },
];

const JeuEcoMan = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [niveauActuel, setNiveauActuel] = useState(0);
  const [ecoMan, setEcoMan] = useState({ x: 9, y: 15, direction: "right" });
  type Fantome = {
    x: number;
    y: number;
    color: string;
    nom: string;
    icon: React.ComponentType<any>;
  };
  const [fantomes, setFantomes] = useState<Fantome[]>([]);
  const [maze, setMaze] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [vies, setVies] = useState(3);
  const [modePuissance, setModePuissance] = useState(false);
  const [partieTerminee, setPartieTerminee] = useState(false);
  const [partieGagnee, setPartieGagnee] = useState(false);
  const [enPause, setEnPause] = useState(false);
  const [afficherControles, setAfficherControles] = useState(false);
  const [totalRecyclables, setTotalRecyclables] = useState(0);
  const [recyclablesCollectes, setRecyclablesCollectes] = useState(0);
  const [tousNiveauxTermines, setTousNiveauxTermines] = useState(false);

  const cellSize = isMobile ? MOBILE_CELL_SIZE : CELL_SIZE;

  // Helper function to render level icon
  const renderIconeNiveau = (indexNiveau : number) => {
    const IconeNiveau = NIVEAUX[indexNiveau]?.icon;
    return IconeNiveau ? (
      <IconeNiveau className="w-4 h-4" style={{ color: COLORS.accent }} />
    ) : null;
  };

  // Initialize game
  const initialiserNiveau = useCallback((indexNiveau: number) => {
    const niveau = NIVEAUX[indexNiveau];
    const startX = 9;
    const startY = 15;

    // Set maze
    setMaze(niveau.maze.map((row) => [...row]));

    // Set Eco-Man starting position
    setEcoMan({ x: startX, y: startY, direction: "right" });

    // Initialize ghosts
    const positionsFantomes = [
      { x: 8, y: 9, color: "gray", nom: "Pollué", icon: Cloud },
      { x: 9, y: 9, color: "yellow", nom: "Déchet", icon: Trash2 },
      { x: 10, y: 9, color: "black", nom: "Pétroleux", icon: Battery },
      { x: 9, y: 10, color: "brown", nom: "Industriel", icon: Factory },
    ];

    // Add extra ghosts for higher levels
    const fantomesSupplementaires = [];
    for (let i = 4; i < niveau.fantomes; i++) {
      const iconesFantomes = [Cloud, Trash2, Battery, Factory];
      fantomesSupplementaires.push({
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT),
        color: ["gray", "yellow", "black", "brown"][i % 4],
        nom: `Pollueur ${i + 1}`,
        icon: iconesFantomes[i % 4],
      });
    }

    setFantomes([
      ...positionsFantomes.slice(0, Math.min(4, niveau.fantomes)),
      ...fantomesSupplementaires,
    ]);

    // Calculate total recyclables
    const recyclables = niveau.maze.flat().filter((cell) => cell === 2).length;
    setTotalRecyclables(recyclables);
    setRecyclablesCollectes(0);

    // Reset game states
    setModePuissance(false);
    setPartieTerminee(false);
    setPartieGagnee(false);
    setTousNiveauxTermines(false);
    setNiveauActuel(indexNiveau);
  }, []);

  // Check screen size on mount and resize
  useEffect(() => {
    const verifierMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    verifierMobile();
    window.addEventListener("resize", verifierMobile);
    return () => window.removeEventListener("resize", verifierMobile);
  }, []);

  // Initialize first level
  useEffect(() => {
    initialiserNiveau(0);
  }, [initialiserNiveau]);

  // Check collision with ghosts
  const verifierCollisionFantome = useCallback(
    (x : any, y : any) => {
      return fantomes.some((fantome) => fantome.x === x && fantome.y === y);
    },
    [fantomes],
  );

  // Move to next level
  const niveauSuivant = useCallback(() => {
    if (niveauActuel < NIVEAUX.length - 1) {
      initialiserNiveau(niveauActuel + 1);
      setVies((prev) => prev + 1); // Reward with extra life
    } else {
      // Last level completed
      setTousNiveauxTermines(true);
      setPartieGagnee(true);
    }
  }, [niveauActuel, initialiserNiveau]);

  // Move Eco-Man
  const deplacerEcoMan = useCallback(
    (dx : number, dy : number) => {
      if (partieTerminee || partieGagnee || enPause) return;

      const newX = ecoMan.x + dx;
      const newY = ecoMan.y + dy;

      // Check boundaries and walls
      if (
        newX >= 0 &&
        newX < GRID_WIDTH &&
        newY >= 0 &&
        newY < GRID_HEIGHT &&
        maze[newY][newX] !== 1
      ) {
        setEcoMan((prev) => ({
          ...prev,
          x: newX,
          y: newY,
          direction:
            dx > 0 ? "right" : dx < 0 ? "left" : dy > 0 ? "down" : "up",
        }));

        // Collect recyclables
        if (maze[newY][newX] === 2) {
          setScore((prev) => prev + 10);
          setRecyclablesCollectes((prev) => prev + 1);
          const newMaze = [...maze];
          newMaze[newY][newX] = 0;
          setMaze(newMaze);
        }

        // Collect power-ups
        if (maze[newY][newX] === 3) {
          setScore((prev) => prev + 50);
          setModePuissance(true);
          const newMaze = [...maze];
          newMaze[newY][newX] = 0;
          setMaze(newMaze);
          setTimeout(() => setModePuissance(false), 7000);
        }

        // Check ghost collision
        if (verifierCollisionFantome(newX, newY)) {
          if (modePuissance) {
            setScore((prev) => prev + 200);
          } else {
            setVies((prev) => {
              const newVies = prev - 1;
              if (newVies <= 0) {
                setPartieTerminee(true);
              }
              return newVies;
            });
            setEcoMan({ x: 9, y: 15, direction: "right" });
          }
        }
      }
    },
    [
      ecoMan,
      maze,
      fantomes,
      partieTerminee,
      partieGagnee,
      modePuissance,
      verifierCollisionFantome,
      enPause,
    ],
  );

  // Check level completion
  useEffect(() => {
    if (
      !partieTerminee &&
      !partieGagnee &&
      !enPause &&
      recyclablesCollectes > 0 &&
      recyclablesCollectes >= totalRecyclables
    ) {
      if (niveauActuel < NIVEAUX.length - 1) {
        setTimeout(() => {
          niveauSuivant();
        }, 500);
      } else {
        // Last level
        setTimeout(() => {
          setTousNiveauxTermines(true);
          setPartieGagnee(true);
        }, 500);
      }
    }
  }, [
    recyclablesCollectes,
    totalRecyclables,
    niveauActuel,
    partieTerminee,
    partieGagnee,
    enPause,
    niveauSuivant,
  ]);

  // Handle keyboard input
  useEffect(() => {
    const gererToucheClavier = (e : KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "z":
        case "Z":
          e.preventDefault();
          deplacerEcoMan(0, -1);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          deplacerEcoMan(0, 1);
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          deplacerEcoMan(-1, 0);
          break;
        case "ArrowRight":
        case "e":
        case "E":
          e.preventDefault();
          deplacerEcoMan(1, 0);
          break;
        case " ":
          e.preventDefault();
          setEnPause((prev) => !prev);
          break;
        case "Escape":
          setAfficherControles(false);
          break;
      }
    };

    window.addEventListener("keydown", gererToucheClavier);
    return () => window.removeEventListener("keydown", gererToucheClavier);
  }, [deplacerEcoMan]);

  // Move ghosts
  useEffect(() => {
    if (partieTerminee || partieGagnee || enPause) return;

    const interval = setInterval(() => {
      setFantomes((prevFantomes) =>
        prevFantomes.map((fantome) => {
          const directions = [
            { dx: 0, dy: -1 },
            { dx: 0, dy: 1 },
            { dx: -1, dy: 0 },
            { dx: 1, dy: 0 },
          ];

          const niveau = NIVEAUX[niveauActuel];
          let meilleureDir =
            directions[Math.floor(Math.random() * directions.length)];

          if (!modePuissance) {
            let distMin = Infinity;
            directions.forEach((dir) => {
              const newX = fantome.x + dir.dx;
              const newY = fantome.y + dir.dy;
              if (
                newX >= 0 &&
                newX < GRID_WIDTH &&
                newY >= 0 &&
                newY < GRID_HEIGHT &&
                maze[newY][newX] !== 1
              ) {
                const dist =
                  Math.abs(newX - ecoMan.x) + Math.abs(newY - ecoMan.y);
                if (dist < distMin) {
                  distMin = dist;
                  meilleureDir = dir;
                }
              }
            });
          } else {
            let distMax = -Infinity;
            directions.forEach((dir) => {
              const newX = fantome.x + dir.dx;
              const newY = fantome.y + dir.dy;
              if (
                newX >= 0 &&
                newX < GRID_WIDTH &&
                newY >= 0 &&
                newY < GRID_HEIGHT &&
                maze[newY][newX] !== 1
              ) {
                const dist =
                  Math.abs(newX - ecoMan.x) + Math.abs(newY - ecoMan.y);
                if (dist > distMax) {
                  distMax = dist;
                  meilleureDir = dir;
                }
              }
            });
          }

          const newX = fantome.x + meilleureDir.dx;
          const newY = fantome.y + meilleureDir.dy;

          if (
            newX >= 0 &&
            newX < GRID_WIDTH &&
            newY >= 0 &&
            newY < GRID_HEIGHT &&
            maze[newY][newX] !== 1
          ) {
            return { ...fantome, x: newX, y: newY };
          }
          return fantome;
        }),
      );
    }, NIVEAUX[niveauActuel]?.vitesse || 300);

    return () => clearInterval(interval);
  }, [
    ecoMan,
    maze,
    partieTerminee,
    partieGagnee,
    modePuissance,
    niveauActuel,
    enPause,
  ]);

  // Check ghost collision after ghost movement
  useEffect(() => {
    if (
      verifierCollisionFantome(ecoMan.x, ecoMan.y) &&
      !partieTerminee &&
      !partieGagnee &&
      !enPause
    ) {
      if (modePuissance) {
        setScore((prev) => prev + 200);
        setFantomes((prev) =>
          prev.filter((g) => g.x !== ecoMan.x || g.y !== ecoMan.y),
        );
      } else {
        setVies((prev) => {
          const newVies = prev - 1;
          if (newVies <= 0) {
            setPartieTerminee(true);
          }
          return newVies;
        });
        setEcoMan({ x: 9, y: 15, direction: "right" });
      }
    }
  }, [
    fantomes,
    ecoMan,
    partieTerminee,
    partieGagnee,
    modePuissance,
    verifierCollisionFantome,
    enPause,
  ]);

  const reinitialiserJeu = () => {
    setScore(0);
    setVies(3);
    setModePuissance(false);
    setPartieTerminee(false);
    setPartieGagnee(false);
    setTousNiveauxTermines(false);
    setEnPause(false);
    initialiserNiveau(0);
  };

  const redemarrerNiveau = () => {
    setVies(3);
    setModePuissance(false);
    setPartieTerminee(false);
    setPartieGagnee(false);
    setTousNiveauxTermines(false);
    setEnPause(false);
    initialiserNiveau(niveauActuel);
  };

  const basculerPause = () => {
    setEnPause((prev) => !prev);
  };

  // Mobile touch controls
  const gererMouvementTactile = (direction : any) => {
    switch (direction) {
      case "up":
        deplacerEcoMan(0, -1);
        break;
      case "down":
        deplacerEcoMan(0, 1);
        break;
      case "left":
        deplacerEcoMan(-1, 0);
        break;
      case "right":
        deplacerEcoMan(1, 0);
        break;
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-2 md:p-4"
      style={{ backgroundColor: COLORS.primary, color: COLORS.text }}
    >
      {/* Header */}
      <div
        className="w-full max-w-4xl mb-2 md:mb-4 text-center rounded-xl p-3 md:p-4 border-2"
        style={{
          backgroundColor: COLORS.background,
          borderColor: COLORS.secondary,
        }}
      >
        <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
          <Leaf
            className="w-6 h-6 md:w-10 md:h-10 animate-pulse"
            style={{ color: COLORS.secondary }}
          />
          <span style={{ color: COLORS.accent }}>
            ECO-MAN : SAUVEZ LA PLANÈTE
          </span>
          <Recycle
            className="w-6 h-6 md:w-10 md:h-10 animate-spin"
            style={{ animationDuration: "3s", color: COLORS.secondary }}
          />
        </h1>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-sm md:text-base">
          <div
            className="flex items-center gap-1 md:gap-2 px-3 py-1 md:px-4 md:py-2 rounded-lg"
            style={{ backgroundColor: COLORS.lightBg }}
          >
            <Recycle className="w-4 h-4" style={{ color: COLORS.accent }} />
            <span style={{ color: COLORS.accent }}>Recyclés :</span>
            <span
              className="font-bold ml-1"
              style={{ color: COLORS.secondary }}
            >
              {score}
            </span>
          </div>
          <div
            className="flex items-center gap-1 md:gap-2 px-3 py-1 md:px-4 md:py-2 rounded-lg"
            style={{ backgroundColor: COLORS.lightBg }}
          >
            <Heart className="w-4 h-4" style={{ color: COLORS.secondary }} />
            <span style={{ color: COLORS.accent }}>Vies :</span>
            <span
              className="font-bold ml-1"
              style={{ color: COLORS.secondary }}
            >
              {vies}
            </span>
          </div>
          <div
            className="flex items-center gap-1 md:gap-2 px-3 py-1 md:px-4 md:py-2 rounded-lg"
            style={{ backgroundColor: COLORS.lightBg }}
          >
            {renderIconeNiveau(niveauActuel)}
            <span style={{ color: COLORS.accent }}>Niveau :</span>
            <span
              className="font-bold ml-1"
              style={{ color: COLORS.secondary }}
            >
              {NIVEAUX[niveauActuel]?.nom || "Rues Urbaines"}
            </span>
          </div>
          <div
            className="flex items-center gap-1 md:gap-2 px-3 py-1 md:px-4 md:py-2 rounded-lg"
            style={{ backgroundColor: COLORS.lightBg }}
          >
            <Target className="w-4 h-4" style={{ color: COLORS.accent }} />
            <span style={{ color: COLORS.accent }}>Progrès :</span>
            <span
              className="font-bold ml-1"
              style={{ color: COLORS.secondary }}
            >
              {recyclablesCollectes}/{totalRecyclables}
            </span>
          </div>
        </div>

        {modePuissance && (
          <div
            className="mt-2 md:mt-3 font-bold text-sm md:text-lg flex items-center justify-center gap-1 md:gap-2 py-1 md:py-2 px-3 md:px-4 rounded-lg animate-pulse"
            style={{
              backgroundColor: COLORS.accent + "20",
              color: COLORS.accent,
            }}
          >
            <Zap className="w-4 h-4 md:w-6 md:h-6 animate-spin" />
            ÉNERGIE SOLAIRE ACTIVÉE !
            <Zap className="w-4 h-4 md:w-6 md:h-6 animate-spin" />
          </div>
        )}
      </div>

      {/* Game Container */}
      <div className="flex flex-col lg:flex-row gap-4 w-full max-w-6xl">
        {/* Game Board */}
        <div className="relative">
          <div
            className="relative rounded-lg shadow-2xl border-4"
            style={{
              width: GRID_WIDTH * cellSize,
              height: GRID_HEIGHT * cellSize,
              backgroundColor: COLORS.background,
              borderColor: COLORS.secondary,
            }}
          >
            {/* Render maze */}
            {maze.map((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  className="absolute"
                  style={{
                    left: x * cellSize,
                    top: y * cellSize,
                    width: cellSize,
                    height: cellSize,
                  }}
                >
                  {cell === 1 && (
                    <div
                      className="w-full h-full border"
                      style={{
                        backgroundColor: COLORS.primary,
                        borderColor: COLORS.accent,
                        boxShadow: "inset 0 0 5px " + COLORS.accent + "50",
                      }}
                    />
                  )}
                  {cell === 2 && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="relative">
                        <div
                          className="w-2 h-2 md:w-3 md:h-3 rounded-full animate-pulse"
                          style={{
                            backgroundColor: COLORS.secondary,
                            boxShadow: "0 0 8px " + COLORS.secondary + "80",
                          }}
                        />
                        <div
                          className="absolute inset-0 text-xs flex items-center justify-center font-bold opacity-80"
                          style={{ color: COLORS.accent }}
                        >
                          <Recycle className="w-2 h-2 md:w-3 md:h-3" />
                        </div>
                      </div>
                    </div>
                  )}
                  {cell === 3 && (
                    <div className="w-full h-full flex items-center justify-center">
                      <Sun
                        className="w-3 h-3 md:w-5 md:h-5 animate-pulse"
                        style={{
                          color: COLORS.accent,
                          filter:
                            "drop-shadow(0 0 8px " + COLORS.accent + "80)",
                          animation: "pulse 1s ease-in-out infinite",
                        }}
                      />
                    </div>
                  )}
                </div>
              )),
            )}

            {/* Render Eco-Man */}
            <div
              className="absolute transition-all duration-100"
              style={{
                left: ecoMan.x * cellSize,
                top: ecoMan.y * cellSize,
                width: cellSize,
                height: cellSize,
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative">
                  <div
                    className={`absolute inset-0 rounded-full ${modePuissance ? "animate-ping opacity-75" : ""}`}
                    style={{ backgroundColor: COLORS.accent }}
                  />
                  <Leaf
                    className={`w-5 h-5 md:w-7 md:h-7 relative z-10 ${modePuissance ? "animate-pulse" : ""}`}
                    style={{
                      color: COLORS.secondary,
                      filter: "drop-shadow(0 0 6px " + COLORS.secondary + "90)",
                      transform:
                        ecoMan.direction === "right"
                          ? "rotate(0deg)"
                          : ecoMan.direction === "left"
                            ? "rotate(180deg)"
                            : ecoMan.direction === "up"
                              ? "rotate(-90deg)"
                              : "rotate(90deg)",
                    }}
                  />
                  {modePuissance && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sun
                        className="w-6 h-6 md:w-8 md:h-8 opacity-50 animate-spin"
                        style={{ color: COLORS.accent }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Render ghosts */}
            {fantomes.map((fantome, i) => (
              <div
                key={i}
                className="absolute transition-all duration-300"
                style={{
                  left: fantome.x * cellSize,
                  top: fantome.y * cellSize,
                  width: cellSize,
                  height: cellSize,
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div
                    className={`w-4 h-4 md:w-6 md:h-6 rounded-t-full relative ${modePuissance ? "opacity-60 animate-pulse" : ""}`}
                    style={{
                      backgroundColor: modePuissance
                        ? COLORS.accent + "80"
                        : fantome.color === "gray"
                          ? COLORS.accent
                          : fantome.color === "yellow"
                            ? "#eab308"
                            : fantome.color === "black"
                              ? COLORS.primary
                              : "#78350f",
                      boxShadow: modePuissance
                        ? "0 0 15px " + COLORS.accent + "80"
                        : "0 0 10px " + COLORS.accent + "60",
                    }}
                  >
                    {!modePuissance && (
                      <>
                        <div className="absolute top-0.5 md:top-1 left-0.5 md:left-1 w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full" />
                        <div className="absolute top-0.5 md:top-1 right-0.5 md:right-1 w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full" />
                      </>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-1 md:h-2 overflow-hidden">
                      <div className="flex">
                        <div
                          className="w-1 md:w-2 h-1 md:h-2 rounded-b-full"
                          style={{ backgroundColor: "inherit" }}
                        />
                        <div
                          className="w-1 md:w-2 h-1 md:h-2 rounded-b-full"
                          style={{ backgroundColor: "inherit" }}
                        />
                        <div
                          className="w-1 md:w-2 h-1 md:h-2 rounded-b-full"
                          style={{ backgroundColor: "inherit" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Pause overlay */}
            {enPause && !partieTerminee && !partieGagnee && (
              <div
                className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center rounded-lg"
                style={{ borderColor: COLORS.secondary }}
              >
                <div
                  className="text-center p-6 rounded-xl border-2"
                  style={{
                    backgroundColor: COLORS.background,
                    borderColor: COLORS.accent,
                  }}
                >
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-4"
                    style={{ color: COLORS.accent }}
                  >
                    JEU EN PAUSE
                  </h3>
                  <p
                    className="mb-4 flex items-center justify-center gap-2"
                    style={{ color: COLORS.secondary }}
                  >
                    <Pause className="w-5 h-5" />
                    Appuyez sur ESPACE pour continuer
                  </p>
                  <div className="flex flex-col md:flex-row gap-3 justify-center">
                    <button
                      onClick={basculerPause}
                      className="px-6 py-2 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 justify-center"
                      style={{
                        backgroundColor: COLORS.secondary,
                        color: COLORS.primary,
                      }}
                    >
                      <Play className="w-5 h-5" />
                      REPRENDRE LE JEU
                    </button>
                    <button
                      onClick={redemarrerNiveau}
                      className="px-6 py-2 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 justify-center"
                      style={{
                        backgroundColor: COLORS.accent,
                        color: COLORS.primary,
                      }}
                    >
                      <RefreshCcw className="w-5 h-5" />
                      RECOMMENCER LE NIVEAU
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Game Over / Win overlay */}
            {(partieTerminee || partieGagnee) && (
              <div
                className="absolute inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-center rounded-lg border-4"
                style={{
                  borderColor: partieGagnee ? COLORS.secondary : "#ef4444",
                }}
              >
                <div
                  className="text-center p-6 rounded-xl border-2 max-w-md w-full"
                  style={{
                    backgroundColor: COLORS.background,
                    borderColor: partieGagnee ? COLORS.secondary : "#ef4444",
                  }}
                >
                  {partieGagnee ? (
                    <>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Globe
                          className="w-12 h-12 md:w-16 md:h-16 animate-bounce"
                          style={{ color: COLORS.secondary }}
                        />
                        <Star
                          className="w-12 h-12 md:w-16 md:h-16 animate-pulse"
                          style={{ color: COLORS.accent }}
                        />
                        <Leaf
                          className="w-12 h-12 md:w-16 md:h-16 animate-bounce"
                          style={{ color: COLORS.secondary }}
                        />
                      </div>
                      <h2
                        className="text-2xl md:text-4xl font-bold mb-4"
                        style={{ color: COLORS.secondary }}
                      >
                        {tousNiveauxTermines
                          ? "VICTOIRE !"
                          : "NIVEAU TERMINÉ !"}
                      </h2>
                      <p
                        className="text-lg md:text-xl mb-2 flex items-center justify-center gap-2"
                        style={{ color: COLORS.accent }}
                      >
                        <Trophy className="w-6 h-6" />
                        {tousNiveauxTermines
                          ? "Tous les niveaux terminés !"
                          : "Niveau terminé !"}
                      </p>
                      {tousNiveauxTermines && (
                        <p
                          className="mb-4 text-lg"
                          style={{ color: COLORS.text }}
                        >
                          Vous avez sauvé la planète ! 🎉
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Cloud
                          className="w-12 h-12 md:w-16 md:h-16"
                          style={{ color: "#ef4444" }}
                        />
                        <Factory
                          className="w-12 h-12 md:w-16 md:h-16"
                          style={{ color: "#ef4444" }}
                        />
                        <AlertCircle
                          className="w-12 h-12 md:w-16 md:h-16"
                          style={{ color: "#ef4444" }}
                        />
                      </div>
                      <h2
                        className="text-2xl md:text-4xl font-bold mb-4"
                        style={{ color: "#ef4444" }}
                      >
                        POLLUTION EXCESSIVE
                      </h2>
                      <p
                        className="text-lg md:text-xl mb-4 flex items-center justify-center gap-2"
                        style={{ color: COLORS.accent }}
                      >
                        <AlertCircle className="w-5 h-5" />
                        La planète a besoin de vous ! Réessayez !
                      </p>
                    </>
                  )}
                  <div
                    className="py-3 px-6 rounded-lg mb-6 border"
                    style={{
                      backgroundColor: COLORS.lightBg,
                      borderColor: COLORS.accent,
                    }}
                  >
                    <p
                      className="text-xl md:text-2xl font-bold flex items-center justify-center gap-2"
                      style={{ color: COLORS.text }}
                    >
                      <Recycle
                        className="w-6 h-6"
                        style={{ color: COLORS.secondary }}
                      />
                      Recyclés :{" "}
                      <span style={{ color: COLORS.secondary }}>{score}</span>
                    </p>
                    {!tousNiveauxTermines && (
                      <p
                        className="mt-2 flex items-center justify-center gap-2"
                        style={{ color: COLORS.accent }}
                      >
                        {renderIconeNiveau(niveauActuel)}
                        Niveau : {NIVEAUX[niveauActuel]?.nom}
                      </p>
                    )}
                    {tousNiveauxTermines && (
                      <p
                        className="mt-2 flex items-center justify-center gap-2"
                        style={{ color: COLORS.accent }}
                      >
                        <Trophy className="w-4 h-4" />3 Niveaux Terminés !
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row gap-3 justify-center">
                    {tousNiveauxTermines ? (
                      <button
                        onClick={reinitialiserJeu}
                        className="px-6 py-3 text-white rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 justify-center"
                        style={{ backgroundColor: COLORS.secondary }}
                      >
                        <Leaf className="w-5 h-5" />
                        REJOUER
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={reinitialiserJeu}
                          className="px-6 py-3 text-white rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 justify-center"
                          style={{ backgroundColor: COLORS.secondary }}
                        >
                          <Leaf className="w-5 h-5" />
                          NOUVELLE PARTIE
                        </button>
                        <button
                          onClick={redemarrerNiveau}
                          className="px-6 py-3 text-white rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 justify-center"
                          style={{
                            backgroundColor: COLORS.accent,
                            color: COLORS.primary,
                          }}
                        >
                          <RefreshCcw className="w-5 h-5" />
                          RECOMMENCER
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          {isMobile && (
            <div className="mt-4 w-full max-w-md">
              {/* Game Actions Mobile */}
              <div className="flex gap-2 mb-3 justify-center px-2">
                <button
                  onClick={basculerPause}
                  className="flex-1 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-1 min-w-0"
                  style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
                >
                  {enPause ? (
                    <>
                      <Play className="w-4 h-4" />
                      <span className="truncate">REPRENDRE</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-4 h-4" />
                      <span className="truncate">PAUSE</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setAfficherControles(!afficherControles)}
                  className="flex-1 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-1 min-w-0"
                  style={{ backgroundColor: COLORS.secondary, color: COLORS.primary }}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span className="truncate">AIDE</span>
                </button>
                <button
                  onClick={redemarrerNiveau}
                  className="flex-1 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-1 min-w-0"
                  style={{ backgroundColor: '#ef4444', color: 'white' }}
                >
                  <RefreshCcw className="w-4 h-4" />
                  <span className="truncate">RECOMMENCER</span>
                </button>
              </div>

              {/* Levels Progress Mobile */}
              <div className="rounded-xl p-3 border-2 mb-3 mx-2" style={{ backgroundColor: COLORS.background, borderColor: COLORS.accent }}>
                <div className="flex items-center justify-between mb-2 gap-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {renderIconeNiveau(niveauActuel)}
                    <span className="font-bold text-sm truncate" style={{ color: COLORS.secondary }}>
                      {NIVEAUX[niveauActuel]?.nom}
                    </span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded flex items-center gap-1 shrink-0" style={{ backgroundColor: COLORS.primary, color: COLORS.accent }}>
                    <Target className="w-3 h-3" />
                    {recyclablesCollectes}/{totalRecyclables}
                  </span>
                </div>
                <div className="flex gap-1 overflow-x-auto pb-2 justify-center">
                  {NIVEAUX.map((niveau, index) => {
                    const IconeNiveau = niveau.icon;
                    return (
                      <button
                        key={niveau.id}
                        onClick={() => initialiserNiveau(index)}
                        className={`px-3 py-2 rounded text-xs whitespace-nowrap flex items-center gap-1 flex-shrink-0 ${
                          niveauActuel === index ? 'font-bold' : ''
                        }`}
                        style={{
                          backgroundColor: niveauActuel === index ? COLORS.secondary : COLORS.lightBg,
                          color: niveauActuel === index ? COLORS.primary : COLORS.text
                        }}
                      >
                        <IconeNiveau className="w-3 h-3 flex-shrink-0" />
                        <span>Niv. {niveau.id}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Controls Help Modal */}
              {afficherControles && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
                  <div className="rounded-xl p-6 max-w-sm w-full border-2" style={{ backgroundColor: COLORS.background, borderColor: COLORS.secondary }}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: COLORS.accent }}>
                        <Gamepad2 className="w-5 h-5" />
                        Contrôles du Jeu
                      </h3>
                      <button
                        onClick={() => setAfficherControles(false)}
                        className=""
                        style={{ color: COLORS.secondary }}
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <p className="flex items-center gap-2 text-sm" style={{ color: COLORS.text }}>
                        <ArrowUp className="w-4 h-4 flex-shrink-0" />
                        Utilisez les boutons directionnels pour déplacer Eco-Man
                      </p>
                      <p className="flex items-center gap-2 text-sm" style={{ color: COLORS.text }}>
                        <Recycle className="w-4 h-4 flex-shrink-0" style={{ color: COLORS.secondary }} />
                        Collectez tous les déchets recyclables pour avancer
                      </p>
                      <p className="flex items-center gap-2 text-sm" style={{ color: COLORS.text }}>
                        <Sun className="w-4 h-4 flex-shrink-0" style={{ color: COLORS.accent }} />
                        Les panneaux solaires donnent une invincibilité temporaire
                      </p>
                      <p className="flex items-center gap-2 text-sm" style={{ color: COLORS.text }}>
                        <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#ef4444' }} />
                        Évitez les fantômes pollueurs ou mangez-les avec l'énergie solaire
                      </p>
                      <div className="mt-6">
                        <button
                          onClick={() => setAfficherControles(false)}
                          className="w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2"
                          style={{ backgroundColor: COLORS.secondary, color: COLORS.primary }}
                        >
                          <Check className="w-5 h-5" />
                          COMPRIS !
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Side Panel - Hidden on small mobile, shown on tablet+ */}
        <div className="hidden lg:flex flex-col gap-4 w-80">
          {/* Controls */}
          <div
            className="rounded-xl p-4 border-2"
            style={{
              backgroundColor: COLORS.background,
              borderColor: COLORS.secondary,
            }}
          >
            <p
              className="mb-3 font-bold text-lg text-center flex items-center justify-center gap-2"
              style={{ color: COLORS.accent }}
            >
              <Gamepad2 className="w-5 h-5" />
              CONTRÔLES
              <Gamepad2 className="w-5 h-5" />
            </p>
            <div className="space-y-2">
              <div
                className="flex items-center gap-2 p-2 rounded"
                style={{ backgroundColor: COLORS.lightBg }}
              >
                <kbd
                  className="px-2 py-1 rounded text-sm font-bold flex items-center gap-1"
                  style={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.accent,
                  }}
                >
                  <ArrowUp className="w-3 h-3" /> Z
                </kbd>
                <span style={{ color: COLORS.text }}>
                  Déplacer vers le Haut
                </span>
              </div>
              <div
                className="flex items-center gap-2 p-2 rounded"
                style={{ backgroundColor: COLORS.lightBg }}
              >
                <kbd
                  className="px-2 py-1 rounded text-sm font-bold flex items-center gap-1"
                  style={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.accent,
                  }}
                >
                  <ArrowDown className="w-3 h-3" /> S
                </kbd>
                <span style={{ color: COLORS.text }}>Déplacer vers le Bas</span>
              </div>
              <div
                className="flex items-center gap-2 p-2 rounded"
                style={{ backgroundColor: COLORS.lightBg }}
              >
                <kbd
                  className="px-2 py-1 rounded text-sm font-bold flex items-center gap-1"
                  style={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.accent,
                  }}
                >
                  <ArrowLeft className="w-3 h-3" /> A
                </kbd>
                <span style={{ color: COLORS.text }}>
                  Déplacer vers la Gauche
                </span>
              </div>
              <div
                className="flex items-center gap-2 p-2 rounded"
                style={{ backgroundColor: COLORS.lightBg }}
              >
                <kbd
                  className="px-2 py-1 rounded text-sm font-bold flex items-center gap-1"
                  style={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.accent,
                  }}
                >
                  <ArrowRight className="w-3 h-3" /> E
                </kbd>
                <span style={{ color: COLORS.text }}>
                  Déplacer vers la Droite
                </span>
              </div>
              <div
                className="flex items-center gap-2 p-2 rounded"
                style={{ backgroundColor: COLORS.lightBg }}
              >
                <kbd
                  className="px-2 py-1 rounded text-sm font-bold"
                  style={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.accent,
                  }}
                >
                  ESPACE
                </kbd>
                <span style={{ color: COLORS.text }}>Pause/Reprise</span>
              </div>
            </div>
            <div
              className="mt-4 p-3 rounded"
              style={{ backgroundColor: COLORS.lightBg }}
            >
              <p
                className="text-sm flex items-center gap-2"
                style={{ color: COLORS.accent }}
              >
                <Recycle
                  className="w-4 h-4"
                  style={{ color: COLORS.secondary }}
                />
                Collectez tous les déchets recyclables pour terminer chaque
                niveau
              </p>
              <p
                className="text-sm mt-2 flex items-center gap-2"
                style={{ color: COLORS.accent }}
              >
                <Sun className="w-4 h-4" style={{ color: COLORS.accent }} />
                Les panneaux solaires donnent une invincibilité temporaire !
              </p>
            </div>
          </div>

          {/* Levels Progress */}
          <div
            className="rounded-xl p-4 border-2"
            style={{
              backgroundColor: COLORS.background,
              borderColor: COLORS.accent,
            }}
          >
            <p
              className="mb-3 font-bold text-lg text-center flex items-center justify-center gap-2"
              style={{ color: COLORS.secondary }}
            >
              <Globe className="w-5 h-5" />
              NIVEAUX
              <Globe className="w-5 h-5" />
            </p>
            <div className="space-y-3">
              {NIVEAUX.map((niveau, index) => {
                const IconeNiveau = niveau.icon;
                return (
                  <div
                    key={niveau.id}
                    className={`p-3 rounded-lg transition-all cursor-pointer ${niveauActuel === index ? "scale-105" : "opacity-80"}`}
                    onClick={() => initialiserNiveau(index)}
                    style={{
                      backgroundColor:
                        niveauActuel === index
                          ? COLORS.secondary + "20"
                          : COLORS.lightBg,
                      border: `2px solid ${niveauActuel === index ? COLORS.secondary : COLORS.accent + "50"}`,
                      color:
                        niveauActuel === index ? COLORS.secondary : COLORS.text,
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <IconeNiveau className="w-5 h-5" />
                        <div>
                          <span className="font-bold">
                            Niveau {niveau.id} :
                          </span>
                          <span className="ml-2">{niveau.nom}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span
                          className="text-xs px-2 py-1 rounded flex items-center gap-1"
                          style={{
                            backgroundColor: COLORS.primary,
                            color: COLORS.accent,
                          }}
                        >
                          <Cloud className="w-3 h-3" />
                          {niveau.fantomes}
                        </span>
                        <span
                          className="text-xs px-2 py-1 rounded flex items-center gap-1"
                          style={{
                            backgroundColor: COLORS.primary,
                            color: COLORS.accent,
                          }}
                        >
                          <Recycle className="w-3 h-3" />
                          {niveau.recyclables}
                        </span>
                      </div>
                    </div>
                    <div
                      className="mt-2 text-xs flex items-center gap-1"
                      style={{ color: COLORS.accent }}
                    >
                      <Activity className="w-3 h-3" />
                      Vitesse : {niveau.vitesse}ms •{" "}
                      {index < niveauActuel ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3" /> Terminé
                        </span>
                      ) : index === niveauActuel ? (
                        <span className="flex items-center gap-1">
                          <Activity className="w-3 h-3 animate-pulse" /> En
                          cours
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Verrouillé
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Game Actions */}
          <div className="flex gap-3">
            <button
              onClick={basculerPause}
              className="flex-1 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
            >
              {enPause ? (
                <>
                  <Play className="w-5 h-5" />
                  REPRENDRE
                </>
              ) : (
                <>
                  <Pause className="w-5 h-5" />
                  PAUSE
                </>
              )}
            </button>
            <button
              onClick={redemarrerNiveau}
              className="flex-1 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              style={{ backgroundColor: "#ef4444", color: "white" }}
            >
              <RefreshCcw className="w-5 h-5" />
              RECOMMENCER
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Panel */}
      {isMobile && (
        <div className="mt-4 w-full max-w-md">
          {/* Game Actions Mobile */}
          <div className="flex gap-2 mb-3 justify-center">
            <button
              onClick={basculerPause}
              className="flex-1 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-1"
              style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
            >
              {enPause ? (
                <>
                  <Play className="w-4 h-4" />
                  REPRENDRE
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4" />
                  PAUSE
                </>
              )}
            </button>
            <button
              onClick={() => setAfficherControles(!afficherControles)}
              className="flex-1 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-1"
              style={{
                backgroundColor: COLORS.secondary,
                color: COLORS.primary,
              }}
            >
              <HelpCircle className="w-4 h-4" />
              AIDE
            </button>
            <button
              onClick={redemarrerNiveau}
              className="flex-1 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-1"
              style={{ backgroundColor: "#ef4444", color: "white" }}
            >
              <RefreshCcw className="w-4 h-4" />
              RECOMMENCER
            </button>
          </div>

          {/* Levels Progress Mobile */}
          <div
            className="rounded-xl p-3 border-2 mb-3"
            style={{
              backgroundColor: COLORS.background,
              borderColor: COLORS.accent,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {renderIconeNiveau(niveauActuel)}
                <span
                  className="font-bold text-sm"
                  style={{ color: COLORS.secondary }}
                >
                  {NIVEAUX[niveauActuel]?.nom}
                </span>
              </div>
              <span
                className="text-xs px-2 py-1 rounded flex items-center gap-1"
                style={{
                  backgroundColor: COLORS.primary,
                  color: COLORS.accent,
                }}
              >
                <Target className="w-3 h-3" />
                {recyclablesCollectes}/{totalRecyclables}
              </span>
            </div>
            <div className="flex gap-1 overflow-x-auto pb-2 justify-center">
              {NIVEAUX.map((niveau, index) => {
                const IconeNiveau = niveau.icon;
                return (
                  <button
                    key={niveau.id}
                    onClick={() => initialiserNiveau(index)}
                    className={`px-3 py-1 rounded text-xs whitespace-nowrap flex items-center gap-1 ${niveauActuel === index ? "font-bold" : ""}`}
                    style={{
                      backgroundColor:
                        niveauActuel === index
                          ? COLORS.secondary
                          : COLORS.lightBg,
                      color:
                        niveauActuel === index ? COLORS.primary : COLORS.text,
                    }}
                  >
                    <IconeNiveau className="w-3 h-3" />
                    {niveau.id}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls Help Modal */}
          {afficherControles && (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
              <div
                className="rounded-xl p-6 max-w-sm w-full border-2"
                style={{
                  backgroundColor: COLORS.background,
                  borderColor: COLORS.secondary,
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3
                    className="text-xl font-bold flex items-center gap-2"
                    style={{ color: COLORS.accent }}
                  >
                    <Gamepad2 className="w-5 h-5" />
                    Contrôles du Jeu
                  </h3>
                  <button
                    onClick={() => setAfficherControles(false)}
                    className=""
                    style={{ color: COLORS.secondary }}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-3">
                  <p
                    className="flex items-center gap-2"
                    style={{ color: COLORS.text }}
                  >
                    <ArrowUp className="w-4 h-4" />
                    Utilisez les boutons directionnels pour déplacer Eco-Man
                  </p>
                  <p
                    className="flex items-center gap-2"
                    style={{ color: COLORS.text }}
                  >
                    <Recycle
                      className="w-4 h-4"
                      style={{ color: COLORS.secondary }}
                    />
                    Collectez tous les déchets recyclables pour avancer
                  </p>
                  <p
                    className="flex items-center gap-2"
                    style={{ color: COLORS.text }}
                  >
                    <Sun className="w-4 h-4" style={{ color: COLORS.accent }} />
                    Les panneaux solaires donnent une invincibilité temporaire
                  </p>
                  <p
                    className="flex items-center gap-2"
                    style={{ color: COLORS.text }}
                  >
                    <AlertCircle
                      className="w-4 h-4"
                      style={{ color: "#ef4444" }}
                    />
                    Évitez les fantômes pollueurs ou mangez-les avec l'énergie
                    solaire
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => setAfficherControles(false)}
                      className="w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: COLORS.secondary,
                        color: COLORS.primary,
                      }}
                    >
                      <Check className="w-5 h-5" />
                      COMPRIS !
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JeuEcoMan;
