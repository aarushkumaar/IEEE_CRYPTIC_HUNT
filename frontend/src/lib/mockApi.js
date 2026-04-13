/**
 * Mock API for frontend development when backend is not available
 * Toggle mock mode by setting VITE_MOCK_MODE=true in .env
 */

// Mock questions database
const MOCK_QUESTIONS = [
  // Round 1 (Easy) - 4 questions
  {
    id: 1,
    text: "What is the Egyptian symbol for life?",
    answers: ["ankh", "cartouche", "scarab", "was"],
    answer: "ankh",
    round: 1,
    difficulty: "easy",
    hint: "A cross with a loop at the top"
  },
  {
    id: 2,
    text: "Which pharaoh built the Great Pyramid?",
    answers: ["khufu", "khafre", "menkaure", "tutankhamun"],
    answer: "khufu",
    round: 1,
    difficulty: "easy",
    hint: "Fourth Dynasty ruler"
  },
  {
    id: 3,
    text: "What river did ancient Egypt depend on?",
    answers: ["nile", "tigris", "euphrates", "indus"],
    answer: "nile",
    round: 1,
    difficulty: "easy",
    hint: "The longest river in Africa"
  },
  {
    id: 4,
    text: "What is a mummy wrapped in?",
    answers: ["linen", "cotton", "silk", "papyrus"],
    answer: "linen",
    round: 1,
    difficulty: "easy",
    hint: "A fabric material"
  },

  // Round 2 (Medium) - 4 questions
  {
    id: 5,
    text: "What was the purpose of the pyramids?",
    answers: ["tombs", "temples", "palaces", "storehouses"],
    answer: "tombs",
    round: 2,
    difficulty: "medium",
    hint: "Burial monuments for pharaohs"
  },
  {
    id: 6,
    text: "Which goddess was the wife of Osiris?",
    answers: ["isis", "horus", "thoth", "bastet"],
    answer: "isis",
    round: 2,
    difficulty: "medium",
    hint: "Goddess of magic and fertility"
  },
  {
    id: 7,
    text: "What was used to write on in ancient Egypt?",
    answers: ["papyrus", "parchment", "clay", "stone"],
    answer: "papyrus",
    round: 2,
    difficulty: "medium",
    hint: "Made from reeds along the Nile"
  },
  {
    id: 8,
    text: "How many kingdoms did Egypt have?",
    answers: ["three", "two", "four", "five"],
    answer: "three",
    round: 2,
    difficulty: "medium",
    hint: "Old, Middle, New"
  },

  // Round 3 (Hard) - 4 questions
  {
    id: 9,
    text: "What was the ancient Egyptian practice of preserving the dead called?",
    answers: ["mummification", "embalmment", "mortification", "preservation"],
    answer: "mummification",
    round: 3,
    difficulty: "hard",
    hint: "A sacred process lasting 70 days"
  },
  {
    id: 10,
    text: "Which pharaoh's tomb was discovered by Howard Carter in 1922?",
    answers: ["tutankhamun", "ramesses ii", "thutmose iii", "amenhotep iii"],
    answer: "tutankhamun",
    round: 3,
    difficulty: "hard",
    hint: "The Boy Pharaoh from the 18th Dynasty"
  },
  {
    id: 11,
    text: "What was the name of the sun god in ancient Egypt?",
    answers: ["ra", "amun", "ptah", "atum"],
    answer: "ra",
    round: 3,
    difficulty: "hard",
    hint: "Often depicted with a falcon head"
  },
  {
    id: 12,
    text: "What script did ancient Egyptians primarily use?",
    answers: ["hieroglyphics", "cuneiform", "alphabet", "runes"],
    answer: "hieroglyphics",
    round: 3,
    difficulty: "hard",
    hint: "Sacred carvings with pictures and symbols"
  },

  // Round 4 (Wildcard) - 1 question (do or die)
  {
    id: 13,
    text: "What was the name of the Egyptian underworld where souls were judged?",
    answers: ["duat", "aaru", "heliopolis", "memphis"],
    answer: "duat",
    round: 4,
    difficulty: "wildcard",
    hint: "Where Osiris judges the hearts of the deceased"
  },
];

// Mock game state storage
let mockGameState = {
  currentRound: 1,
  currentQuestion: 0,
  score: 0,
  // Track attempts per question: { "round-questionIndex": attemptsUsed }
  questionAttempts: {},
  hasSession: false,
  completed: false,
  completedAt: null,
  answers: [],
  gameStartTime: null, // Will be initialized on first game start
};

/**
 * Get or initialize game start time (persistent in sessionStorage)
 */
function getGameStartTime() {
  if (mockGameState.gameStartTime) return mockGameState.gameStartTime;
  
  // Try to get from sessionStorage (survives page navigation but not refresh)
  let startTime = sessionStorage.getItem('mockGameStartTime');
  if (!startTime) {
    // New game session - set start time now
    startTime = new Date().toISOString();
    sessionStorage.setItem('mockGameStartTime', startTime);
  }
  
  mockGameState.gameStartTime = startTime;
  return startTime;
}

/**
 * Get max attempts allowed for this round
 */
function getMaxAttemptsForRound(round) {
  if (round === 1) return 2; // Phase 1: 2 tries per question
  if (round === 2) return 3; // Phase 2: 3 tries per question
  if (round === 3) return 3; // Phase 3: 3 tries per question
  if (round === 4) return 1; // Phase 4 (Wildcard): 1 try (do or die)
  return 2;
}

/**
 * Get attempts used for current question
 */
function getAttemptsUsed() {
  const key = `${mockGameState.currentRound}-${mockGameState.currentQuestion}`;
  return mockGameState.questionAttempts[key] || 0;
}

/**
 * Increment attempts for current question
 */
function incrementAttempts() {
  const key = `${mockGameState.currentRound}-${mockGameState.currentQuestion}`;
  mockGameState.questionAttempts[key] = (mockGameState.questionAttempts[key] || 0) + 1;
  return mockGameState.questionAttempts[key];
}

/**
 * Get current game session
 */
export const mockGetSession = async () => {
  await new Promise(r => setTimeout(r, 300)); // Simulate network delay
  
  // Determine currentRound based on game progress
  let roundToReturn = mockGameState.currentRound;
  
  // If all questions in current round are done, the next round is available
  const roundQuestions = MOCK_QUESTIONS.filter(q => q.round === mockGameState.currentRound);
  if (mockGameState.currentQuestion >= roundQuestions.length) {
    // Current round is finished, but don't advance yet - just report that the next is available
    if (mockGameState.currentRound < 4) {
      roundToReturn = mockGameState.currentRound + 1;
    }
  }
  
  return {
    hasSession: mockGameState.hasSession,
    currentRound: roundToReturn,
    completed: mockGameState.completed,
  };
};

/**
 * Get current question
 */
export const mockGetCurrent = async () => {
  await new Promise(r => setTimeout(r, 300));
  
  // Check if there's a pending round advancement in sessionStorage (set by Game component)
  const pendingRound = sessionStorage.getItem('mockPendingRound');
  if (pendingRound) {
    const roundToLoad = parseInt(pendingRound, 10);
    if (roundToLoad !== mockGameState.currentRound && roundToLoad >= 1 && roundToLoad <= 4) {
      mockGameState.currentRound = roundToLoad;
      mockGameState.currentQuestion = 0;
      sessionStorage.removeItem('mockPendingRound');
    }
  }
  
  const roundQuestions = MOCK_QUESTIONS.filter(q => q.round === mockGameState.currentRound);
  const questionIndex = mockGameState.currentQuestion;
  
  console.log('📋 mockGetCurrent:', { round: mockGameState.currentRound, questionIndex, totalQuestions: roundQuestions.length, score: mockGameState.score });
  
  if (questionIndex >= roundQuestions.length) {
    console.log('🏁 Round complete - returning gameFinished');
    return {
      gameFinished: true,
      round: mockGameState.currentRound,
      score: mockGameState.score,
    };
  }

  const mockQuestion = roundQuestions[questionIndex];
  
  // Map to match the real backend schema with playing card suits
  const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
  const suit = suits[(mockGameState.currentQuestion) % 4];
  const card_number = ((mockGameState.currentQuestion) % 13) + 2; // 2-14 (A is 14)
  
  const maxAttempts = getMaxAttemptsForRound(mockGameState.currentRound);
  const attemptsUsed = getAttemptsUsed();
  const triesLeft = maxAttempts - attemptsUsed;
  
  return {
    question: {
      id: mockQuestion.id,
      suit: suit,
      card_number: card_number,
      question: mockQuestion.text,
      answers: mockQuestion.answers,
      hint: mockQuestion.hint,
      difficulty: mockQuestion.difficulty,
      round: mockGameState.currentRound,
      is_wildcard: mockGameState.currentRound === 4,
    },
    progress: {
      currentQuestion: questionIndex + 1,
      totalQuestions: roundQuestions.length,
      questionInRound: questionIndex + 1,
      round: mockGameState.currentRound,
      score: mockGameState.score,
      triesLeft: triesLeft,
    },
    gameStartTime: getGameStartTime(),
  };
};

/**
 * Submit answer
 */
export const mockSubmitAnswer = async (answer) => {
  await new Promise(r => setTimeout(r, 400));
  
  const roundQuestions = MOCK_QUESTIONS.filter(q => q.round === mockGameState.currentRound);
  const question = roundQuestions[mockGameState.currentQuestion];

  console.log('🎯 mockSubmitAnswer:', { round: mockGameState.currentRound, questionIndex: mockGameState.currentQuestion, totalQuestions: roundQuestions.length, answer, questionExists: !!question });

  // Safety check
  if (!question) {
    console.error('❌ Question not found', { currentRound: mockGameState.currentRound, currentQuestion: mockGameState.currentQuestion, totalQuestions: roundQuestions.length });
    return {
      correct: false,
      scoreDelta: 0,
      newScore: mockGameState.score,
      error: 'Question not found',
    };
  }
  
  const isCorrect = answer.toLowerCase().trim() === question.answer.toLowerCase();
  const attemptsUsed = incrementAttempts();
  const maxAttempts = getMaxAttemptsForRound(mockGameState.currentRound);
  
  console.log('📊 Attempt tracking:', { attemptsUsed, maxAttempts, isCorrect });
  
  if (isCorrect) {
    // Correct answer - move to next question
    mockGameState.score += 1;
    mockGameState.answers.push({ questionId: question.id, answer, correct: true, attempts: attemptsUsed });
    mockGameState.currentQuestion++;
    
    // Check if game is completed (all rounds finished including wildcard)
    const isRoundComplete = mockGameState.currentQuestion >= roundQuestions.length;
    const isGameComplete = mockGameState.currentRound === 4 && isRoundComplete;
    
    const response = {
      correct: true,
      scoreDelta: 1,
      newScore: mockGameState.score,
      triesLeft: getMaxAttemptsForRound(mockGameState.currentRound),
    };
    
    if (isGameComplete) {
      response.completed = true;
      mockGameState.completed = true;
      mockGameState.completedAt = new Date().toISOString();
      console.log('🏆 Game completed!', { finalScore: mockGameState.score });
    }
    
    return response;
  } else {
    // Wrong answer - check if out of attempts
    mockGameState.answers.push({ questionId: question.id, answer, correct: false, attempts: attemptsUsed });
    
    const triesRemaining = maxAttempts - attemptsUsed;
    if (triesRemaining <= 0) {
      // Out of attempts - disqualified
      console.log('💀 Disqualified - out of attempts');
      return {
        correct: false,
        scoreDelta: 0,
        newScore: mockGameState.score,
        disqualified: true,
        triesLeft: 0,
      };
    }

    // Still have attempts left
    return {
      correct: false,
      scoreDelta: 0,
      newScore: mockGameState.score,
      triesLeft: triesRemaining,
    };
  }
};

/**
 * Skip question - NOT ALLOWED in this game
 */
export const mockSkipQuestion = async () => {
  await new Promise(r => setTimeout(r, 300));
  console.log('❌ Skipping is not allowed in this game');
  return {
    error: 'Cannot skip questions in this game',
  };
};

/**
 * Start game
 */
export const mockStartGame = async () => {
  await new Promise(r => setTimeout(r, 300));
  mockGameState.hasSession = true;
  mockGameState.gameStartTime = new Date().toISOString();
  return { success: true };
};

/**
 * Get result after round expires or finishes
 */
export const mockGetResult = async () => {
  await new Promise(r => setTimeout(r, 300));
  
  if (mockGameState.completed || mockGameState.score >= 10) {
    return {
      status: 'passed',
      score: mockGameState.score,
      totalScore: 12,
      round: mockGameState.currentRound,
    };
  }

  return {
    status: 'failed',
    score: mockGameState.score,
    totalScore: 12,
    round: mockGameState.currentRound,
  };
};

/**
 * Advance to next round
 */
export const mockAdvanceRound = async () => {
  await new Promise(r => setTimeout(r, 300));
  
  if (mockGameState.currentRound < 4) {
    mockGameState.currentRound++;
    mockGameState.currentQuestion = 0;
    // Don't need to reset attempts - they're per-question now
  } else {
    mockGameState.completed = true;
    mockGameState.completedAt = new Date().toISOString();
  }

  return { success: true };
};

/**
 * Get leaderboard
 */
export const mockGetLeaderboard = async () => {
  await new Promise(r => setTimeout(r, 400));
  
  const now = new Date();
  const oneHourAgo = new Date(now - 60 * 60 * 1000);
  
  return [
    { id: '1', name: 'Player One', score: 12, status: 'passed', time_started: oneHourAgo.toISOString(), time_ended: now.toISOString() },
    { id: '2', name: 'Player Two', score: 11, status: 'passed', time_started: oneHourAgo.toISOString(), time_ended: now.toISOString() },
    { id: '3', name: 'Player Three', score: 10, status: 'passed', time_started: oneHourAgo.toISOString(), time_ended: now.toISOString() },
    { id: '4', name: 'You', score: mockGameState.score, status: 'passed', time_started: oneHourAgo.toISOString(), time_ended: now.toISOString() },
    { id: '5', name: 'Player Four', score: 8, status: 'playing', time_started: oneHourAgo.toISOString(), time_ended: null },
  ];
};

/**
 * Reset mock state
 */
export const mockReset = () => {
  sessionStorage.removeItem('mockGameStartTime'); // Reset timer
  mockGameState = {
    currentRound: 1,
    currentQuestion: 0,
    score: 0,
    questionAttempts: {},
    hasSession: false,
    completed: false,
    completedAt: null,
    answers: [],
    gameStartTime: null,
  };
};

/**
 * Get mock state for debugging
 */
export const mockGetState = () => mockGameState;
