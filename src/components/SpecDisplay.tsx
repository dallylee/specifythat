'use client';

import { useState, useRef, useEffect } from 'react';
import { PartyPopper, Check, Lightbulb } from 'lucide-react';

interface SpecDisplayProps {
  spec: string;
  onStartOver: () => void;
  projectName?: string;
}

export function SpecDisplay({ spec, onStartOver, projectName = 'project' }: SpecDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(spec);
      setCopied(true);
      setDropdownOpen(false);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    try {
      // Create a sanitized filename from project name
      const sanitizedName = projectName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      const filename = `${sanitizedName}-spec.md`;

      // Create blob and download
      const blob = new Blob([spec], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setDropdownOpen(false);
    } catch (err) {
      console.error('Failed to download:', err);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [dropdownOpen]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0A2540] flex items-center gap-2">
            Your Spec is Ready! <PartyPopper className="w-8 h-8 text-purple-600" />
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Copy it and paste into ChatGPT, Claude, or your favorite AI to start building.
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative" ref={dropdownRef}>
            <div className="flex">
              <button
                onClick={handleCopy}
                className={`px-6 py-3 rounded-l-xl font-bold transition-all ${
                  copied
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-gradient-to-r from-[#1E4D8B] to-[#3B82F6] text-white hover:shadow-xl hover:shadow-blue-500/30'
                }`}
              >
                {copied ? (
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> Copied!
                  </span>
                ) : 'Copy'}
              </button>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`px-3 py-3 rounded-r-xl font-bold transition-all border-l border-white/20 ${
                  copied
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
                    : 'bg-gradient-to-r from-[#1E4D8B] to-[#3B82F6] text-white hover:shadow-xl hover:shadow-blue-500/30'
                }`}
                aria-label="More options"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-2xl border border-gray-200 py-2 z-10">
                <button
                  onClick={handleDownload}
                  className="w-full text-left px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Download as Markdown
                </button>
              </div>
            )}
          </div>
          
          <button
            onClick={onStartOver}
            className="px-6 py-3 text-[#0A2540] border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-bold"
          >
            Start Over
          </button>
        </div>
      </div>

      <div className="bg-[#0A2540] rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-3 bg-[#061829] border-b border-gray-700">
          <span className="text-sm text-gray-300 font-mono font-medium">project-spec.md</span>
          <button
            onClick={handleCopy}
            className="text-gray-300 hover:text-white transition-colors text-sm font-medium flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" /> Copied
              </>
            ) : 'Copy'}
          </button>
        </div>
        
        <div className="p-6 md:p-8 overflow-x-auto max-h-[60vh] overflow-y-auto">
          <pre className="text-gray-100 text-sm md:text-base whitespace-pre-wrap font-mono leading-relaxed">
            {spec}
          </pre>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6 md:p-8">
        <h3 className="font-bold text-[#0A2540] mb-4 text-xl flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-600" /> What's Next?
        </h3>
        <ol className="text-gray-700 space-y-2 list-decimal list-inside text-base font-medium">
          <li>Copy the spec above</li>
          <li>Paste it into ChatGPT, Claude, or Cursor</li>
          <li>Say: "Help me build this following the spec exactly"</li>
          <li>Start coding with clear direction</li>
        </ol>
      </div>
    </div>
  );
}
