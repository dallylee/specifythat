'use client';

import { Question } from '@/lib/types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({ question, questionNumber, totalQuestions }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-8 md:p-10">
      <div className="flex items-center gap-3 text-sm mb-6">
        <span className="bg-gradient-to-r from-[#1E4D8B] to-[#3B82F6] text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
          {question.section}
        </span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-600 font-medium">Question {questionNumber} of {totalQuestions}</span>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-[#0A2540] leading-snug">
        {question.text}
      </h2>
    </div>
  );
}
