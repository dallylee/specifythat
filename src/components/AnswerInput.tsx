'use client';

import { useState, useRef, useEffect } from 'react';

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  onIDontKnow: () => void;
  onBack?: () => void;
  isLoading: boolean;
  canGoBack: boolean;
  aiGeneratedAnswer?: string | null;
  onAcceptAI?: (answer: string) => void;
}

export function AnswerInput({ 
  onSubmit, 
  onIDontKnow, 
  onBack,
  isLoading, 
  canGoBack,
  aiGeneratedAnswer,
  onAcceptAI,
}: AnswerInputProps) {
  const [answer, setAnswer] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // If AI generated an answer, pre-fill it for editing
  useEffect(() => {
    if (aiGeneratedAnswer) {
      setAnswer(aiGeneratedAnswer);
    }
  }, [aiGeneratedAnswer]);

  // Focus textarea on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim() && !isLoading) {
      onSubmit(answer.trim());
      setAnswer('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (answer.trim() && !isLoading) {
        onSubmit(answer.trim());
        setAnswer('');
      }
    }
  };

  const handleAcceptAI = () => {
    if (aiGeneratedAnswer && onAcceptAI) {
      onAcceptAI(answer || aiGeneratedAnswer);
      setAnswer('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your answer here..."
          disabled={isLoading}
          rows={5}
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] resize-none disabled:bg-gray-50 disabled:text-gray-500 text-[#0A2540] placeholder-gray-400 font-medium transition-all duration-200"
        />
        {aiGeneratedAnswer && (
          <div className="absolute top-3 right-3">
            <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              ✨ AI Suggested
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {canGoBack && (
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="px-5 py-3 text-gray-600 hover:text-[#0A2540] hover:bg-gray-100 rounded-xl transition-all duration-200 disabled:opacity-50 font-medium"
          >
            ← Back
          </button>
        )}
        
        <div className="flex-1" />
        
        {aiGeneratedAnswer ? (
          <button
            type="button"
            onClick={handleAcceptAI}
            disabled={isLoading}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 font-bold"
          >
            Accept & Continue
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={onIDontKnow}
              disabled={isLoading || answer.trim().length > 0}
              className="px-5 py-3 text-purple-600 border-2 border-purple-300 rounded-xl hover:bg-purple-50 hover:border-purple-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <LoadingDots />
                  Thinking...
                </span>
              ) : (
                "I don't know"
              )}
            </button>
            
            <button
              type="submit"
              disabled={isLoading || !answer.trim()}
              className="group px-8 py-3 bg-gradient-to-r from-[#1E4D8B] to-[#3B82F6] text-white rounded-xl hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
            >
              Next <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>
          </>
        )}
      </div>

      <p className="text-sm text-gray-500 text-center font-medium">
        Press <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-bold">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-bold">Enter</kbd> to submit
      </p>
    </form>
  );
}

function LoadingDots() {
  return (
    <span className="inline-flex gap-1">
      <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </span>
  );
}
