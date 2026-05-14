import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Trophy, ShieldAlert, ShieldCheck } from 'lucide-react';
import { QUESTIONS } from './constants';
import { QuizState } from './types';

export default function App() {
  const [state, setState] = useState<QuizState>({
    currentStep: 0,
    selectedOptions: [],
    isSubmitted: false,
    score: 0,
    isFinished: false,
  });

  const currentQuestion = QUESTIONS[state.currentStep];

  const handleOptionToggle = (optionId: string) => {
    if (state.isSubmitted) return;

    setState((prev) => {
      if (currentQuestion.type === 'single') {
        return { ...prev, selectedOptions: [optionId] };
      }

      const isSelected = prev.selectedOptions.includes(optionId);
      const newSelected = isSelected
        ? prev.selectedOptions.filter((id) => id !== optionId)
        : [...prev.selectedOptions, optionId];

      return { ...prev, selectedOptions: newSelected };
    });
  };

  const handleSubmit = () => {
    const correctIds = currentQuestion.options
      .filter((opt) => opt.isCorrect)
      .map((opt) => opt.id);
    
    let isCorrect = false;
    if (currentQuestion.type === 'single') {
      isCorrect = state.selectedOptions[0] === correctIds[0];
    } else {
      // Multiple: must select all correct and NO incorrect
      const allCorrectSelected = correctIds.every(id => state.selectedOptions.includes(id));
      const noIncorrectSelected = state.selectedOptions.every(id => correctIds.includes(id));
      isCorrect = allCorrectSelected && noIncorrectSelected;
    }

    setState((prev) => ({
      ...prev,
      isSubmitted: true,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
  };

  const handleNext = () => {
    if (state.currentStep < QUESTIONS.length - 1) {
      setState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
        selectedOptions: [],
        isSubmitted: false,
      }));
    } else {
      setState((prev) => ({ ...prev, isFinished: true }));
    }
  };

  const resetQuiz = () => {
    setState({
      currentStep: 0,
      selectedOptions: [],
      isSubmitted: false,
      score: 0,
      isFinished: false,
    });
  };

  const isLastQuestion = state.currentStep === QUESTIONS.length - 1;

  if (state.isFinished) {
    const percentage = Math.round((state.score / QUESTIONS.length) * 100);
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 antialiased">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-md w-full text-center space-y-8 border border-slate-100"
        >
          <div className="flex justify-center pt-4">
            <div className="bg-indigo-50 p-6 rounded-full relative">
              <Trophy className="w-16 h-16 text-indigo-600 relative z-10" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-indigo-200 rounded-full blur-xl"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-slate-800 tracking-tight">Resultado Final</h2>
            <p className="text-slate-500 font-medium italic">Você concluiu o treinamento de privacidade.</p>
          </div>
          
          <div className="relative py-4">
            <div className="text-7xl font-black text-indigo-600 leading-none drop-shadow-sm">{percentage}%</div>
            <p className="text-xs font-bold text-slate-400 mt-4 uppercase tracking-[0.2em]">Desempenho Global</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-3xl p-6 text-center border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Acertos</div>
              <div className="text-2xl font-black text-slate-700">{state.score} / {QUESTIONS.length}</div>
            </div>
            <div className="bg-slate-50 rounded-3xl p-6 text-center border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Status</div>
              <div className={`text-2xl font-black ${percentage >= 70 ? 'text-emerald-500' : 'text-amber-500'}`}>
                {percentage >= 70 ? 'Aprovado' : 'Revisar'}
              </div>
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="w-full flex items-center justify-center gap-3 py-5 bg-indigo-600 text-white rounded-3xl font-bold text-lg hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 active:scale-95"
          >
            <RotateCcw className="w-5 h-5" />
            Tentar Novamente
          </button>
        </motion.div>
      </div>
    );
  }

  const isSelectionCorrect = () => {
    const correctIds = currentQuestion.options.filter(o => o.isCorrect).map(o => o.id);
    if (currentQuestion.type === 'single') {
      return state.selectedOptions[0] === correctIds[0];
    }
    const allCorrectSelected = correctIds.every(id => state.selectedOptions.includes(id));
    const noIncorrectSelected = state.selectedOptions.every(id => correctIds.includes(id));
    return allCorrectSelected && noIncorrectSelected;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans select-none antialiased">
      <div className="max-w-3xl w-full space-y-10">
        
        {/* Progress Header */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Progresso do Exercício
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-indigo-600 leading-none">{state.currentStep + 1}</span>
                <span className="text-slate-300 font-bold">/ {QUESTIONS.length}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              {QUESTIONS.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-700 ease-out ${
                    idx === state.currentStep 
                      ? 'w-12 bg-indigo-600 shadow-lg shadow-indigo-100' 
                      : idx < state.currentStep 
                        ? 'w-4 bg-emerald-400' 
                        : 'w-4 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          key={state.currentStep}
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-8 md:p-14 border border-white/50 relative overflow-hidden"
        >
          {/* Background Gradients */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-50/50 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-50/30 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 space-y-10">
            <div className="space-y-2">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] uppercase font-bold tracking-widest inline-block mb-2">
                {currentQuestion.type === 'multiple' ? 'Múltipla Escolha (Várias certas)' : 'Questão Única'}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 leading-[1.1] tracking-tight">
                {currentQuestion.question}
              </h1>
            </div>

            <div className="grid gap-4">
              {currentQuestion.options.map((option) => {
                const isSelected = state.selectedOptions.includes(option.id);
                const showStatus = state.isSubmitted;
                const isCorrect = option.isCorrect;
                
                let borderColor = 'border-slate-100';
                let bgColor = 'bg-slate-50/50';
                let iconColor = 'text-slate-300';
                
                if (isSelected) {
                  borderColor = 'border-indigo-600 shadow-[0_8px_30px_rgb(79,70,229,0.1)]';
                  bgColor = 'bg-white';
                  iconColor = 'text-indigo-600';
                }
                
                if (showStatus) {
                  if (isCorrect) {
                    borderColor = 'border-emerald-500 shadow-[0_8px_30px_rgb(16,185,129,0.1)]';
                    bgColor = isSelected ? 'bg-emerald-50/30' : 'bg-white';
                    iconColor = 'text-emerald-500';
                  } else if (isSelected && !isCorrect) {
                    borderColor = 'border-rose-500 shadow-[0_8px_30px_rgb(244,63,94,0.1)]';
                    bgColor = 'bg-rose-50/30';
                    iconColor = 'text-rose-500';
                  } else {
                    bgColor = 'bg-white opacity-40';
                    borderColor = 'border-slate-100';
                  }
                }

                return (
                  <motion.button
                    key={option.id}
                    whileHover={!state.isSubmitted ? { x: 4 } : {}}
                    whileTap={!state.isSubmitted ? { scale: 0.99 } : {}}
                    disabled={state.isSubmitted}
                    onClick={() => handleOptionToggle(option.id)}
                    className={`group w-full text-left p-6 rounded-[1.75rem] border-2 transition-all duration-300 flex items-center justify-between cursor-pointer ${borderColor} ${bgColor}`}
                  >
                    <span className={`text-xl transition-all ${isSelected ? 'text-slate-900 font-semibold' : 'text-slate-500 font-medium'}`}>
                      {option.text}
                    </span>
                    
                    <div className="flex-shrink-0 ml-4">
                      {showStatus ? (
                        isCorrect ? (
                          <div className="bg-emerald-100 p-1.5 rounded-full">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          </div>
                        ) : isSelected ? (
                          <div className="bg-rose-100 p-1.5 rounded-full">
                            <XCircle className="w-5 h-5 text-rose-600" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full border-2 border-slate-50" />
                        )
                      ) : (
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isSelected ? 'border-indigo-600 bg-indigo-600 scale-110' : 'border-slate-200 group-hover:border-indigo-300'}`}>
                          {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full shadow-sm" />}
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {state.isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-8 rounded-[2rem] flex flex-col md:flex-row gap-6 relative overflow-hidden ${isSelectionCorrect() ? 'bg-emerald-50/50 text-emerald-900 border border-emerald-100/50' : 'bg-amber-50/50 text-amber-900 border border-amber-100/50'}`}
                >
                  {/* Decorative background for feedback */}
                  <div className={`absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 blur-3xl opacity-20 pointer-events-none ${isSelectionCorrect() ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  
                  <div className="flex-shrink-0">
                    <div className={`p-4 rounded-3xl inline-block ${isSelectionCorrect() ? 'bg-white shadow-emerald-100 shadow-md' : 'bg-white shadow-amber-100 shadow-md'}`}>
                      {isSelectionCorrect() ? <ShieldCheck className="w-8 h-8 text-emerald-600" /> : <ShieldAlert className="w-8 h-8 text-amber-600" />}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="font-extrabold text-2xl tracking-tight">
                      {isSelectionCorrect() ? 'Exatamente!' : 'Vamos revisar...'}
                    </p>
                    <p className="text-lg opacity-80 leading-relaxed font-medium italic">
                      {isSelectionCorrect() ? currentQuestion.correctFeedback : currentQuestion.incorrectFeedback}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-6">
              {!state.isSubmitted ? (
                <button
                  disabled={state.selectedOptions.length === 0}
                  onClick={handleSubmit}
                  className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-1 active:translate-y-0 disabled:opacity-30 disabled:shadow-none disabled:translate-y-0 transition-all duration-300"
                >
                  Verificar Respostas
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all duration-300 active:scale-95"
                >
                  {isLastQuestion ? 'Ver Meu Resultado' : 'Continuar Jornada'}
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Footer info */}
        <p className="text-center text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em] pt-4">
          Training Hub &copy; 2024 • Privacidade e Dados
        </p>
      </div>
    </div>
  );
}
