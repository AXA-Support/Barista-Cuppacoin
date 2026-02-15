import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  X, Trophy, Target, CheckCircle, XCircle, BarChart, Users,
  Clock, Award, ChevronLeft, ChevronRight, BookOpen, AlertCircle,
  BookmarkCheck, BookmarkX
} from 'lucide-react';
import QuestionsModal from './QuestionsModal';
import { fetchQuizAttempts } from '../../store/slices/quizSlice';
import { getEmployeeId } from '../../utils/cookies';

// Main QuizResultsModal Component
const QuizResultsModal = ({ isOpen, onClose, quizData, quizId }) => {
  const dispatch = useDispatch();
  const { quizAttempts, attemptsLoading, attemptsError } = useSelector((state) => state.quiz);

  const [showModal, setShowModal] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [scoreProgress, setScoreProgress] = useState(0);

  // State for question modals
  const [showCorrectQuestions, setShowCorrectQuestions] = useState(false);
  const [showIncorrectQuestions, setShowIncorrectQuestions] = useState(false);
  const [questionsData, setQuestionsData] = useState({
    correctQuestions: [],
    incorrectQuestions: []
  });

  // Fetch quiz attempts when modal opens
  useEffect(() => {
    if (isOpen && quizId) {
      const employeeId = getEmployeeId();
      if (employeeId && employeeId !== 'null') {
        dispatch(fetchQuizAttempts({ employeeId, quizId }));
      }
    }
  }, [isOpen, quizId, dispatch]);


  // Transform API response to QuestionsModal format
  useEffect(() => {
    if (quizAttempts?.latest_attempt?.question_by_question_review) {
      const review = quizAttempts.latest_attempt.question_by_question_review;

      const correct = review
        .filter(q => q.is_correct)
        .map(q => ({
          id: q.question_id,
          question: q.question,
          options: q.options.map(opt => ({
            id: opt.letter.toLowerCase(),
            text: opt.text
          })),
          correctAnswer: q.correct_answer.letter.toLowerCase(),
          userAnswer: q.your_answer.letter.toLowerCase(),
          explanation: q.explanation || null
        }));

      const incorrect = review
        .filter(q => !q.is_correct)
        .map(q => ({
          id: q.question_id,
          question: q.question,
          options: q.options.map(opt => ({
            id: opt.letter.toLowerCase(),
            text: opt.text
          })),
          correctAnswer: q.correct_answer.letter.toLowerCase(),
          userAnswer: q.your_answer.letter.toLowerCase(),
          explanation: q.explanation || null
        }));

      setQuestionsData({
        correctQuestions: correct,
        incorrectQuestions: incorrect
      });
    }
  }, [quizAttempts]);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setTimeout(() => setFadeIn(true), 10);
      const timer = setTimeout(() => setScoreProgress(100), 500);
      return () => clearTimeout(timer);
    } else {
      setFadeIn(false);
      setScoreProgress(0);
      setTimeout(() => setShowModal(false), 300);
    }
  }, [isOpen]);

  if (!showModal) return null;

  // Get data from API response or fallback to props
  const latestAttempt = quizAttempts?.latest_attempt;
  const scoreDetails = latestAttempt?.score_details;
  const ranking = latestAttempt?.ranking;
  const leaderboardSummary = quizAttempts?.quiz_leaderboard_summary;
  const currentEmployeeRank = leaderboardSummary?.current_employee_rank;

  // Get rank from API (prefer ranking from latest_attempt, fallback to leaderboard_summary)
  const employeeRank = ranking?.rank || currentEmployeeRank?.rank || null;
  
  // Get total participants from API (prefer ranking from latest_attempt, fallback to leaderboard_summary)
  const totalParticipants = ranking?.total_participants || leaderboardSummary?.total_participants || null;

  // Default data
  const defaultResults = {
    quizTitle: quizAttempts?.quiz_title || quizData?.quizTitle || "Quiz",
    dateCompleted: latestAttempt?.completed_at_formatted || quizData?.dateCompleted || "N/A",
    totalQuestions: scoreDetails?.total_questions || quizData?.totalQuestions || 0,
    correctAnswers: scoreDetails?.correct_answers || quizData?.correctAnswers || 0,
    wrongAnswers: scoreDetails?.incorrect_answers || quizData?.wrongAnswers || 0,
    score: parseFloat(scoreDetails?.percentage) || quizData?.score || 0,
    teamPosition: employeeRank || quizData?.teamPosition || null,
    totalParticipants: totalParticipants || quizData?.totalParticipants || null,
    timeTaken: latestAttempt?.time_spent || quizData?.timeTaken || "N/A",
  };

  // Merge with provided data (props take precedence if API data not available)
  const results = {
    ...defaultResults,
    ...(quizData && !latestAttempt ? quizData : {}),
  };

  // Calculate percentages
  const correctPercentage = Math.round((results.correctAnswers / results.totalQuestions) * 100);
  const wrongPercentage = Math.round((results.wrongAnswers / results.totalQuestions) * 100);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={onClose}
        />

        {/* Modal */}
        <div
          className={`relative w-full max-w-lg bg-white rounded-xl shadow-xl transform transition-all duration-300 ${fadeIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#5b59bb] to-[#6b69cb] px-5 py-3 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Quiz Results</h2>
                  <p className="text-white/90 text-xs">{results.quizTitle}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white/10 rounded transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-5">
            {/* Loading State */}
            {attemptsLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="text-gray-500 text-lg">Loading results...</div>
              </div>
            )}

            {/* Error State */}
            {attemptsError && !attemptsLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="text-red-500 text-lg">{attemptsError.message || 'Failed to load results'}</div>
              </div>
            )}

            {/* Results Display */}
            {!attemptsLoading && !attemptsError && (
              <>
                {/* Score Display */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="relative w-40 h-40 mx-auto mb-4">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                      {/* Score circle */}
                      <circle
                        cx="50" cy="50" r="45" fill="none"
                        stroke="#5b59bb" strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={`${scoreProgress * 2.827} 282.7`}
                        transform="rotate(-90 50 50)"
                        className="transition-all duration-1500 ease-out"
                      />
                    </svg>
                    {/* <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-[#5b59bb]">{results.score}%</span>
                      <span className="text-gray-600 font-medium text-xs mt-2">Overall Score</span>
                    </div> */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-semibold text-[#5b59bb]">{parseFloat(results.score).toFixed(1)}%</span>
                      <span className="text-gray-600 font-medium text-sm mt-2">Overall Score</span>
                    </div>
                  </div>

                  {/* Team Position */}
                  <div className="bg-gray-50 rounded-lg p-2 border-2 border-gray-200 w-48">
                    <div className="flex items-center gap-2 mb-2 justify-center">
                      <div className="p-1.5 bg-[#5b59bb]/10 rounded">
                        <Users className="w-4 h-4 text-[#5b59bb]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#5b59bb]">Ranking</h3>
                        <p className="text-xs text-gray-600">Your position</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#5b59bb]">
                        {results.teamPosition !== null && results.teamPosition !== undefined 
                          ? `#${results.teamPosition}` 
                          : 'N/A'}
                      </div>
                      <p className="text-xs text-gray-600 mt-1 ml-2">
                        of <span className='font-semibold text-lg ml-1.5 text-gray-700'>
                          {results.totalParticipants !== null && results.totalParticipants !== undefined 
                            ? results.totalParticipants 
                            : 'N/A'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Correct Answers Card */}
                  <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-emerald-100 rounded-full">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Correct Answers</span>
                      </div>
                      {/* <button
                    onClick={() => setShowCorrectQuestions(true)}
                    className="p-1.5 hover:bg-emerald-100 rounded-full transition-colors duration-200 group"
                    aria-label="View correct questions"
                    title="View correct questions"
                  >
                    <BookmarkCheck className="size-7 text-emerald-600 group-hover:text-emerald-700" />
                  </button> */}
                    </div>
                    <div className="mb-1 text-center">
                      <span className="text-2xl font-bold text-emerald-700">
                        {results.correctAnswers}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">/ {results.totalQuestions}</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-1000"
                        style={{ width: `${correctPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Wrong Answers Card */}
                  <div className="bg-rose-50 rounded-lg p-3 border border-rose-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-rose-100 rounded-full">
                          <XCircle className="w-4 h-4 text-rose-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Incorrect Answers</span>
                      </div>

                    </div>
                    <div className="mb-1 text-center">
                      <span className="text-2xl font-bold text-rose-700">
                        {results.wrongAnswers}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">/ {results.totalQuestions}</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-600 rounded-full transition-all duration-1000 delay-300"
                        style={{ width: `${wrongPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {(questionsData.incorrectQuestions.length > 0 || questionsData.correctQuestions.length > 0) && (
                  <div className={`flex gap-2 pt-4 border-t-2 border-gray-200 ${questionsData.incorrectQuestions.length > 0 && questionsData.correctQuestions.length > 0
                      ? ''
                      : 'justify-center'
                    }`}>
                    {questionsData.correctQuestions.length > 0 && (
                      <button
                        onClick={() => setShowCorrectQuestions(true)}
                        className={`py-2 px-3 bg-emerald-200 border-emerald-400/40 border-2 text-emerald-700 text-sm font-semibold rounded hover:bg-emerald-100 transition-colors duration-200 flex items-center justify-center gap-1.5 ${questionsData.incorrectQuestions.length > 0 && questionsData.correctQuestions.length > 0
                            ? 'w-1/2'
                            : 'w-full max-w-xs'
                          }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Review Correct ({questionsData.correctQuestions.length})
                      </button>
                    )}
                    {questionsData.incorrectQuestions.length > 0 && (
                      <button
                        onClick={() => setShowIncorrectQuestions(true)}
                        className={`py-2 px-3 bg-red-200 border-red-400/40 border-2 text-rose-700 text-sm font-semibold rounded hover:bg-rose-100 transition-colors duration-200 flex items-center justify-center gap-1.5 ${questionsData.incorrectQuestions.length > 0 && questionsData.correctQuestions.length > 0
                            ? 'w-1/2'
                            : 'w-[40%] max-w-xs'
                          }`}
                      >
                        <AlertCircle className="w-4 h-4" />
                        Review Mistakes ({questionsData.incorrectQuestions.length})
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>


      <QuestionsModal
        isOpen={showIncorrectQuestions}
        onClose={() => setShowIncorrectQuestions(false)}
        questions={questionsData.incorrectQuestions}
        title="Review Incorrect Answers"
        type="incorrect"
      />

      <QuestionsModal
        isOpen={showCorrectQuestions}
        onClose={() => setShowCorrectQuestions(false)}
        questions={questionsData.correctQuestions}
        title="Review Correct Answers"
        type="correct"
      />
    </>
  );
};

export default QuizResultsModal;