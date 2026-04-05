import { useState, useCallback } from 'react';
import api from '../lib/api';

export function useGame() {
  const [question, setQuestion]       = useState(null);
  const [progress, setProgress]       = useState(null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);
  const [answerResult, setAnswerResult] = useState(null); // { correct, scoreDelta, newScore }
  const [hint, setHint]               = useState(null);
  const [cardState, setCardState]     = useState('idle'); // idle | shake | glow | slide

  const fetchCurrent = useCallback(async () => {
    setLoading(true);
    setError(null);
    setHint(null);
    setAnswerResult(null);
    try {
      const { data } = await api.get('/game/current');
      if (data.completed) {
        return { completed: true };
      }
      setQuestion(data.question);
      setProgress(data.progress);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const submitAnswer = useCallback(async (answer) => {
    if (!answer.trim()) return null;
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/game/answer', { answer });
      setAnswerResult(data);
      
      if (data.correct) {
        setCardState('glow');
      } else {
        setCardState('shake');
      }
      
      // Reset card state after animation
      setTimeout(() => setCardState('idle'), 700);
      
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const skipQuestion = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/game/skip');
      setCardState('slide');
      setTimeout(() => setCardState('idle'), 500);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const requestHint = useCallback(async () => {
    try {
      const { data } = await api.post('/game/hint');
      setHint(data.hint);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  const startGame = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/game/start');
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getResult = useCallback(async () => {
    try {
      const { data } = await api.get('/game/result');
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  const getSession = useCallback(async () => {
    try {
      const { data } = await api.get('/game/session');
      return data;
    } catch (err) {
      return null;
    }
  }, []);

  return {
    question, progress, loading, error,
    answerResult, hint, cardState,
    fetchCurrent, submitAnswer, skipQuestion,
    requestHint, startGame, getResult, getSession,
  };
}
