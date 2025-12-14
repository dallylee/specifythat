'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useInterviewSession } from '@/hooks/useInterviewSession';
import { QuestionCard } from '@/components/QuestionCard';
import { AnswerInput } from '@/components/AnswerInput';
import { ProgressBar } from '@/components/ProgressBar';
import { LoadingScreen } from '@/components/LoadingSpinner';
import { SpecDisplay } from '@/components/SpecDisplay';

export default function InterviewPage() {
  const router = useRouter();
  const {
    session,
    currentQuestion,
    isComplete,
    progress,
    isLoading,
    error,
    saveAnswer,
    generateAIAnswer,
    reset,
    goBack,
    totalQuestions,
  } = useInterviewSession();

  const [aiGeneratedAnswer, setAiGeneratedAnswer] = useState<string | null>(null);
  const [isGeneratingSpec, setIsGeneratingSpec] = useState(false);
  const [generatedSpec, setGeneratedSpec] = useState<string | null>(null);
  const [specError, setSpecError] = useState<string | null>(null);

  const handleSubmit = (answer: string) => {
    saveAnswer(answer, false);
    setAiGeneratedAnswer(null);
  };

  const handleIDontKnow = async () => {
    try {
      const answer = await generateAIAnswer("I don't know");
      setAiGeneratedAnswer(answer);
    } catch {
      // Error is handled in the hook
    }
  };

  const handleAcceptAI = (answer: string) => {
    saveAnswer(answer, true);
    setAiGeneratedAnswer(null);
  };

  const handleGenerateSpec = async () => {
    setIsGeneratingSpec(true);
    setSpecError(null);

    try {
      const response = await fetch('/api/generate-spec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: session.answers,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate spec');
      }

      const data = await response.json();
      setGeneratedSpec(data.spec);
    } catch (err) {
      setSpecError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsGeneratingSpec(false);
    }
  };

  const handleStartOver = () => {
    reset();
    setGeneratedSpec(null);
    setSpecError(null);
    setAiGeneratedAnswer(null);
  };

  // Show generated spec
  if (generatedSpec) {
    // Extract project name from first answer (question 1 is always the project name)
    const projectNameAnswer = session.answers.find(a => a.question === "What's the name of your project?");
    const projectName = projectNameAnswer?.answer || 'project';

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <header className="border-b border-gray-100 bg-white/90 backdrop-blur-md sticky top-0 z-10 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-5">
            <Link href="/">
              <Image 
                src="/specifythat-logo.png" 
                alt="SpecifyThat" 
                width={160} 
                height={36}
                style={{ height: '36px', width: 'auto' }}
              />
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <SpecDisplay spec={generatedSpec} onStartOver={handleStartOver} projectName={projectName} />
        </main>
      </div>
    );
  }

  // Show loading screen while generating spec
  if (isGeneratingSpec) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <header className="border-b border-gray-100 bg-white/90 backdrop-blur-md sticky top-0 z-10 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-5">
            <Image 
              src="/specifythat-logo.png" 
              alt="SpecifyThat" 
              width={160} 
              height={36}
              style={{ height: '36px', width: 'auto' }}
            />
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <LoadingScreen message="Generating your spec... This may take a moment." />
        </main>
      </div>
    );
  }

  // Show completion screen
  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <header className="border-b border-gray-100 bg-white/90 backdrop-blur-md sticky top-0 z-10 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-5">
            <Link href="/">
              <Image 
                src="/specifythat-logo.png" 
                alt="SpecifyThat" 
                width={160} 
                height={36}
                style={{ height: '36px', width: 'auto' }}
              />
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center space-y-10">
            <div className="space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/25">
                <span className="text-5xl text-white">✓</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#0A2540]">
                Interview Complete!
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                You&apos;ve answered all {totalQuestions} questions. Ready to generate your project spec?
              </p>
            </div>

            {specError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-5 max-w-lg mx-auto">
                <p className="text-red-800 font-medium">{specError}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={handleGenerateSpec}
                className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-[#1E4D8B] to-[#3B82F6] text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                Generate My Spec
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </button>
              <button
                onClick={handleStartOver}
                className="px-10 py-5 text-[#0A2540] border-2 border-gray-300 rounded-2xl font-bold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                Start Over
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Show current question
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <header className="border-b border-gray-100 bg-white/90 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image 
                src="/specifythat-logo.png" 
                alt="SpecifyThat" 
                width={160} 
                height={36}
                style={{ height: '36px', width: 'auto' }}
              />
            </Link>
            <button
              onClick={handleStartOver}
              className="text-sm font-medium text-gray-600 hover:text-[#0A2540] transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 space-y-10">
        <ProgressBar
          progress={progress}
          currentQuestion={session.currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
        />

        {currentQuestion && (
          <>
            <QuestionCard
              question={currentQuestion}
              questionNumber={session.currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
            />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <AnswerInput
              onSubmit={handleSubmit}
              onIDontKnow={handleIDontKnow}
              onBack={goBack}
              isLoading={isLoading}
              canGoBack={session.currentQuestionIndex > 0}
              aiGeneratedAnswer={aiGeneratedAnswer}
              onAcceptAI={handleAcceptAI}
            />
          </>
        )}
      </main>
    </div>
  );
}
