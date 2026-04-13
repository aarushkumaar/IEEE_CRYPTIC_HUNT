# Mock API Mode

When the backend is not available, you can use **Mock Mode** to test the frontend with realistic mock data.

## Enabling Mock Mode

### Option 1: Environment Variable (Recommended)
In `.env`, set:
```
VITE_MOCK_MODE=true
```

If you need to disable it:
```
VITE_MOCK_MODE=false
```

### Option 2: Runtime Toggle
Open the browser console and run:
```javascript
// Import the mock API library (if needed for debugging)
import { mockApiLib } from './lib/api.js'
mockApiLib.mockReset() // Reset mock state
mockApiLib.mockGetState() // View current state
```

## What's Mocked

The following API endpoints are mocked:

| Method | Endpoint | Mock Data |
|--------|----------|-----------|
| GET | `/game/session` | Current game round and completion status |
| GET | `/game/current` | Current question with answers and hints |
| POST | `/game/answer` | Answer validation and score updates |
| POST | `/game/hint` | Hint text for current question |
| POST | `/game/start` | Initializes game session |
| GET | `/game/result` | Game result (pass/fail) |
| GET | `/scoreboard` | Mock leaderboard with 5 players |

## Mock Game Structure

- **4 Phases** with Egyptian riddles
- **Attempts per phase:**
  - Phase 1 (Easy): 2 attempts, 4 questions
  - Phase 2 (Medium): 3 attempts, 4 questions
  - Phase 3 (Hard): 3 attempts, 4 questions
  - Phase 4 (Wildcard): 1 attempt (do or die), 1 question
- **Scoring:** +1 point per correct answer, no negative points
- **No skipping:** Must answer all questions

## Mock API Features

✅ Simulates realistic network delays (300-400ms)
✅ Validates answers correctly/incorrectly
✅ Tracks attempts remaining
✅ Disqualifies on insufficient attempts
✅ Advances rounds properly
✅ Maintains persistent game state during session

## Switching Back to Real Backend

To use the real backend when it's available:

1. In `.env`, change:
   ```
   VITE_MOCK_MODE=false
   ```

2. Make sure `VITE_API_URL` points to your backend:
   ```
   VITE_API_URL=http://localhost:4000
   ```

3. Restart your dev server with `npm run dev`

## Testing Different Scenarios

### View Mock State
```javascript
import { mockApiLib } from './src/lib/api.js'
console.log(mockApiLib.mockGetState())
```

### Reset Game
```javascript
import { mockApiLib } from './src/lib/api.js'
mockApiLib.mockReset()
```

### Manually Advance Round
```javascript
import { mockApiLib } from './src/lib/api.js'
mockApiLib.mockAdvanceRound()
console.log(mockApiLib.mockGetState())
```

## Known Limitations

- Game timer is calculated client-side (12 hours from game start)
- No persistence between browser refreshes
- Questions are hardcoded (not loaded from database)
- Score bonus multipliers not implemented in mock mode
