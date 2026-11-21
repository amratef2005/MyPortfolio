import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Terminal, CornerDownLeft, Play, Sparkles } from 'lucide-react';

interface CommandOutput {
  command: string;
  output: string | React.ReactNode;
}

export const TerminalSandbox: React.FC = () => {
  const { profile, projects, lang } = usePortfolio();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'dotnet --info',
      output: (
        <div className="text-slate-300 font-mono text-xs space-y-1">
          <p className="text-cyan-400 font-bold">.NET SDK Version: 10.0.100-preview.2</p>
          <p>Host Architecture: x64 | OS: Windows & Linux Multi-Platform</p>
          <p>Active Profiles: Clean Architecture, CQRS, PostgreSQL, Redis</p>
          <p className="text-emerald-400 font-semibold">✓ Test Suite: All 49 Tests Passing (100% Zero-Defect)</p>
          <p className="text-slate-400">Type or tap a command below to explore.</p>
        </div>
      )
    }
  ]);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTo({
        top: terminalBodyRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history]);

  const runCommandDirect = (cmdText: string) => {
    const cmd = cmdText.trim().toLowerCase();
    let response: React.ReactNode;

    switch (cmd) {
      case 'help':
        response = (
          <div className="space-y-1 text-slate-300 text-xs">
            <p className="text-cyan-400 font-bold">Available Commands:</p>
            <p><span className="text-indigo-400 font-mono">dotnet run</span> - Simulate running MOT7KM and StudySync systems</p>
            <p><span className="text-indigo-400 font-mono">projects</span> - List enterprise systems and architecture metrics</p>
            <p><span className="text-indigo-400 font-mono">iti</span> - View ITI certification details</p>
            <p><span className="text-indigo-400 font-mono">contact</span> - Show developer communication channels</p>
            <p><span className="text-indigo-400 font-mono">clear</span> - Clear terminal screen</p>
          </div>
        );
        break;

      case 'dotnet run':
      case 'run':
        response = (
          <div className="space-y-1 text-xs">
            <p className="text-yellow-400">[1/2] Building MOT7KM (Clean Architecture)... Done (0 Errors, 0 Warnings)</p>
            <p className="text-cyan-400">[2/2] Running StudySync test suite: 49/49 PASSED (100%)</p>
            <p className="text-emerald-400 font-bold">✓ Kestrel listening on https://localhost:5001 & Swagger UI ready!</p>
          </div>
        );
        break;

      case 'projects':
        response = (
          <div className="space-y-1 text-xs">
            {projects.map((p, idx) => (
              <p key={idx} className="text-slate-200">
                <span className="text-cyan-400 font-bold">• {p.title}:</span> {p.badge} ({p.metrics[0]?.label}: {p.metrics[0]?.value})
              </p>
            ))}
          </div>
        );
        break;

      case 'iti':
        response = (
          <p className="text-emerald-400 text-xs">
            🎓 Ministry of Communications & IT (ITI) - Professional Software Engineering Diploma (Accredited).
          </p>
        );
        break;

      case 'contact':
        response = (
          <div className="space-y-1 text-xs text-slate-300">
            <p>Email: <span className="text-cyan-400">{profile.email}</span></p>
            <p>GitHub: <span className="text-indigo-400">{profile.github}</span></p>
            <p>LinkedIn: <span className="text-indigo-400">{profile.linkedin}</span></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        response = (
          <p className="text-red-400 text-xs">
            Command '{cmdText}' not recognized. Type <span className="underline font-bold text-white">'help'</span> for instructions.
          </p>
        );
    }

    setHistory(prev => [...prev, { command: cmdText, output: response }]);
    setInputVal('');
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    runCommandDirect(inputVal);
  };

  const quickPills = ['dotnet run', 'projects', 'iti', 'help', 'contact', 'clear'];

  return (
    <section id="terminal" className="py-16 sm:py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'ar' ? 'منصة الأوامر البرمجية المباشرة' : 'Interactive CLI Terminal'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            {lang === 'ar' ? 'جرّب التفاعل المباشر مع بيئة .NET 10' : 'Experience the .NET 10 Environment Live'}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            {lang === 'ar' ? 'اضغط على أي زر سريع أدناه أو اكتب الأمر مباشرة' : 'Click any quick command below or type directly in the prompt'}
          </p>
        </div>

        {/* Quick Action Pills for Mobile & Desktop */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          {quickPills.map((pill) => (
            <button
              key={pill}
              type="button"
              onClick={() => runCommandDirect(pill)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 text-xs font-mono flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Play className="w-2.5 h-2.5 text-cyan-400" />
              <span>{pill}</span>
            </button>
          ))}
        </div>

        {/* Terminal Window Frame */}
        <div className="rounded-2xl bg-[#070b14] border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden font-mono text-sm">
          {/* Top Bar */}
          <div className="px-4 py-3 bg-[#0d121f] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-xs text-slate-400">bash: dot-net-10-core-terminal</span>
            <span className="text-[11px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
              Active Session
            </span>
          </div>

          {/* Terminal Body */}
          <div ref={terminalBodyRef} className="p-4 sm:p-6 space-y-4 max-h-80 overflow-y-auto">
            {history.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center gap-2 text-cyan-400 text-xs">
                  <span className="text-emerald-400 font-bold">engineer@portfolio:~$</span>
                  <span className="text-white">{item.command}</span>
                </div>
                <div className="pr-4">{item.output}</div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleCommand} className="p-3 bg-[#0a0e1a] border-t border-slate-800 flex items-center gap-2">
            <span className="text-emerald-400 font-bold text-xs shrink-0">engineer@portfolio:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type 'dotnet run', 'projects', 'iti', or 'help'..."
              className="flex-1 bg-transparent border-none outline-none text-white text-xs font-mono placeholder:text-slate-600"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 text-xs rounded-lg border border-cyan-500/30 flex items-center gap-1 shrink-0"
            >
              <CornerDownLeft className="w-3 h-3" />
              <span>Enter</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
