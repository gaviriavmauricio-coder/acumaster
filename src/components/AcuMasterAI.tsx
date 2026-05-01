import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Trophy, 
  Zap, 
  ChevronRight, 
  Lock, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  ArrowRight,
  Library,
  Dumbbell,
  Info,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Challenge, Mission, UserProgress, CompendiumEntry } from '../types';
import { INITIAL_MISSIONS, COMPENDIUM_DATA } from '../constants';
import { 
  generateChallenge, 
  evaluateAnswer, 
  getChatResponse 
} from '../services/gemini';

const AcuMasterAI: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('acu-progress');
    return saved ? JSON.parse(saved) : {
      level: 1,
      xp: 0,
      completedMissions: []
    };
  });
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('missions');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const currentChallenge = challenges[currentChallengeIndex] || null;

  // Save progress
  useEffect(() => {
    localStorage.setItem('acu-progress', JSON.stringify(progress));
  }, [progress]);

  // Update mission status (all available now as per user request)
  useEffect(() => {
    setMissions(prev => prev.map(m => {
      if (progress.completedMissions.includes(m.id)) {
        return { ...m, status: 'completed' };
      }
      return { ...m, status: 'available' };
    }));
  }, [progress]);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleStartMission = async (mission: Mission) => {
    setLoading(true);
    setFeedback(null);
    setSelectedOption(null);
    setChallenges([]);
    setCurrentChallengeIndex(0);
    setErrorMsg(null);
    try {
      const generatedChallenges = await generateChallenge(mission.level, mission.category);
      if (generatedChallenges.length === 0) {
        setErrorMsg("El motor de sabiduría no pudo generar los desafíos en este momento. Inténtalo de nuevo.");
      } else {
        setChallenges(generatedChallenges);
      }
    } catch (error) {
      console.error("Error generating challenges:", error);
      setErrorMsg("Error de conexión con los clásicos. Intenta limpiar tus meridianos.");
    } finally {
      setLoading(false);
    }
  };

  const handlePractice = async () => {
    setLoading(true);
    setFeedback(null);
    setSelectedOption(null);
    setChallenges([]);
    setCurrentChallengeIndex(0);
    setErrorMsg(null);
    try {
      const generatedChallenges = await generateChallenge(selectedLevel);
      if (generatedChallenges.length === 0) {
        setErrorMsg("El oráculo está meditando. No se han podido generar los desafíos de este nivel.");
      } else {
        setChallenges(generatedChallenges);
      }
    } catch (error) {
      console.error("Error generating practice challenges:", error);
      setErrorMsg("Error de conexión interna. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (option: string) => {
    if (!currentChallenge || feedback) return;
    setSelectedOption(option);
    setLoading(true);
    try {
      const result = await evaluateAnswer(currentChallenge.descripcion, option, currentChallenge.respuesta_correcta);
      setFeedback({ isCorrect: result.isCorrect, text: result.feedback });
      
      if (result.isCorrect) {
        const xpGain = 25;
        
        setProgress(prev => {
          const newXp = prev.xp + xpGain;
          
          // Level up logic
          let newLevel = prev.level;
          if (newXp >= 300 && prev.level === 1) newLevel = 2;
          if (newXp >= 800 && prev.level === 2) newLevel = 3;
          if (newXp >= 1500 && prev.level === 3) newLevel = 4;
          
          return {
            ...prev,
            xp: newXp,
            level: newLevel
          };
        });
      }
    } catch (error) {
      console.error("Error evaluating answer:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextChallenge = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      setFeedback(null);
      setSelectedOption(null);
    } else {
      // Finished the set
      setChallenges([]);
      setCurrentChallengeIndex(0);
      setFeedback(null);
      setSelectedOption(null);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    
    const userMsg = chatInput.trim();
    const newMessages = [...chatMessages, { role: 'user' as const, text: userMsg }];
    setChatMessages(newMessages);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const history = chatMessages.map(m => ({
        role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
        parts: [{ text: m.text }]
      }));

      const aiText = await getChatResponse(history, userMsg);
      setChatMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("Error in chat:", error);
      setChatMessages(prev => [...prev, { role: 'ai', text: "Hubo un error al conectar con el motor de sabiduría. La energía no fluye correctamente." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#1A1A1A] font-sans selection:bg-[#5A5A40]/20 pb-24">
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-10">
        {/* Header Section - Vertical Hierarchy */}
        <header className="flex flex-col items-center text-center space-y-6">
          <div 
            className="cursor-pointer space-y-3 flex flex-col items-center" 
            onClick={() => { setChallenges([]); setActiveTab('missions'); }}
          >
            <div className="w-16 h-16 bg-[#5A5A40] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#5A5A40]/20">
              <Sparkles size={32} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#5A5A40]">AcuMaster AI</h1>
              <p className="text-[#1A1A1A]/40 text-sm font-medium italic mt-1 tracking-wide">Motor Lógico de MTC</p>
            </div>
          </div>

          <div className="w-full max-w-sm bg-white p-4 rounded-3xl border border-[#1A1A1A]/5 shadow-sm flex items-center gap-6">
            <div className="flex flex-col items-center px-2">
              <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 font-bold leading-none mb-1">Nivel</span>
              <span className="text-3xl font-serif font-bold text-[#5A5A40] leading-none">{progress.level}</span>
            </div>
            <div className="h-10 w-px bg-[#1A1A1A]/10" />
            <div className="flex flex-col gap-1.5 flex-1 p-1">
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest">
                <span className="text-[#1A1A1A]/40">Experiencia</span>
                <span className="text-[#5A5A40] font-black">{progress.xp}</span>
              </div>
              <div className="relative h-2 w-full bg-[#1A1A1A]/5 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-[#5A5A40]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(progress.xp % 500) / 5}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </header>

        <main className="w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            {challenges.length === 0 ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="w-full space-y-10"
              >
                <div className="w-full flex flex-col items-center space-y-10">
                  <div className="relative w-full max-w-xs">
                    <button 
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="w-full h-16 bg-white rounded-2xl border border-[#1A1A1A]/10 shadow-lg flex items-center justify-between px-8 text-[#5A5A40] font-black uppercase tracking-widest hover:bg-[#F5F2ED] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Menu size={20} />
                        <span>
                          {activeTab === 'missions' && "Temas de Estudio"}
                          {activeTab === 'compendium' && "Compendio Sagrado"}
                          {activeTab === 'practice' && "Torneo de Niveles"}
                        </span>
                      </div>
                      <ChevronDown size={20} className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute top-20 left-0 w-full bg-white rounded-3xl border border-[#1A1A1A]/10 shadow-2xl z-[100] overflow-hidden p-2"
                        >
                          <button 
                            onClick={() => { setActiveTab('missions'); setIsMenuOpen(false); }}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'missions' ? 'bg-[#5A5A40] text-white' : 'hover:bg-[#F5F2ED] text-[#1A1A1A]/60'}`}
                          >
                            <Zap size={20} />
                            <span className="font-bold uppercase tracking-widest text-xs">Temas</span>
                          </button>
                          <button 
                            onClick={() => { setActiveTab('compendium'); setIsMenuOpen(false); }}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'compendium' ? 'bg-[#5A5A40] text-white' : 'hover:bg-[#F5F2ED] text-[#1A1A1A]/60'}`}
                          >
                            <Library size={20} />
                            <span className="font-bold uppercase tracking-widest text-xs">Compendio</span>
                          </button>
                          <button 
                            onClick={() => { setActiveTab('practice'); setIsMenuOpen(false); }}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'practice' ? 'bg-[#5A5A40] text-white' : 'hover:bg-[#F5F2ED] text-[#1A1A1A]/60'}`}
                          >
                            <Dumbbell size={20} />
                            <span className="font-bold uppercase tracking-widest text-xs">Niveles</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Tabs value={activeTab} className="w-full flex flex-col items-center">
                    {errorMsg && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-sm p-4 mb-6 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium"
                      >
                        <AlertCircle size={18} />
                        {errorMsg}
                      </motion.div>
                    )}
                    <TabsContent value="missions" className="mt-0 outline-none w-full space-y-10">
                    {/* Stats Summary - Now Vertical on small, horizontal on medium */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border-none shadow-sm bg-white rounded-[32px] overflow-hidden">
                        <CardContent className="p-8 flex items-center gap-6">
                          <div className="w-16 h-16 bg-[#F5F2ED] rounded-2xl flex items-center justify-center text-[#5A5A40] shadow-inner">
                            <Trophy size={32} />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-[#1A1A1A]/40 tracking-widest mb-1">Rango del Alquimista</p>
                            <p className="text-xl font-serif font-bold text-[#5A5A40]">
                              {progress.level === 1 && "Iniciado en Fundamientos"}
                              {progress.level === 2 && "Viajero de Meridianos"}
                              {progress.level === 3 && "Guardián de los Zang-Fu"}
                              {progress.level === 4 && "Maestro de la Aguja"}
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-none shadow-sm bg-white rounded-[32px] overflow-hidden">
                        <CardContent className="p-8 flex items-center justify-around">
                          <div className="text-center">
                            <p className="text-[10px] uppercase font-bold text-[#1A1A1A]/40 tracking-widest mb-1">Misiones</p>
                            <p className="text-3xl font-serif font-bold text-[#5A5A40]">{progress.completedMissions.length}</p>
                          </div>
                          <div className="h-12 w-px bg-[#1A1A1A]/10" />
                          <div className="text-center">
                            <p className="text-[10px] uppercase font-bold text-[#1A1A1A]/40 tracking-widest mb-1">Maestría</p>
                            <p className="text-3xl font-serif font-bold text-[#5A5A40]">{(progress.xp / 25).toFixed(0)}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="border-none shadow-sm bg-[#5A5A40] text-white rounded-[32px] overflow-hidden relative w-full">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                      <CardContent className="p-8 flex items-center gap-6 relative z-10">
                        <div className="shrink-0 text-[#F27D26]">
                          <Info size={40} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold opacity-50 tracking-widest mb-1">Sabiduría de los Clásicos</p>
                          <p className="italic text-xl leading-relaxed font-serif">
                            "El buen médico trata antes de que aparezca la enfermedad, despejando los caminos del Qi."
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Missions Grid - Purely Vertical */}
                    <div className="space-y-6 flex flex-col items-center">
                      <div className="w-full flex items-center justify-between px-4">
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#1A1A1A]/50 flex items-center gap-3">
                          <BookOpen size={18} />
                          Misiones de Aprendizaje
                        </h2>
                        <Badge variant="outline" className="rounded-full border-[#1A1A1A]/10 text-[10px] font-black py-1">
                          {missions.length} CATEGORÍAS
                        </Badge>
                      </div>
                      
                      <div className="w-full space-y-6">
                        {missions.map((mission) => (
                          <motion.div
                            key={mission.id}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full"
                          >
                            <Card 
                              className={`
                                group border-none shadow-sm transition-all bg-white hover:shadow-xl cursor-pointer rounded-[32px] overflow-hidden w-full
                                ${mission.status === 'completed' ? 'ring-4 ring-green-500/10' : ''}
                              `}
                              onClick={() => handleStartMission(mission)}
                            >
                              <CardContent className="p-8 flex flex-col md:flex-row md:items-center gap-6">
                                <div className={`
                                  w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shrink-0 shadow-sm
                                  ${mission.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-[#F5F2ED] text-[#5A5A40] group-hover:bg-[#5A5A40] group-hover:text-white'}
                                `}>
                                  {mission.status === 'completed' ? <CheckCircle2 size={24} /> : <Zap size={24} />}
                                </div>
                                <div className="flex-1 space-y-1 text-center md:text-left">
                                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
                                    <Badge className="bg-[#F5F2ED] text-[#1A1A1A]/60 rounded-full text-[9px] font-bold w-fit mx-auto md:mx-0">
                                      NIVEL {mission.level}
                                    </Badge>
                                    <span className="text-[10px] font-black text-[#5A5A40]/40 uppercase tracking-widest">{mission.category}</span>
                                  </div>
                                  <h3 className="font-serif text-2xl font-bold group-hover:text-[#5A5A40] transition-colors leading-tight">{mission.title}</h3>
                                  <p className="text-sm text-[#1A1A1A]/50 font-medium leading-relaxed">{mission.description}</p>
                                </div>
                                <div className="flex justify-center md:justify-end">
                                  <div className="w-12 h-12 rounded-full bg-[#F5F2ED] flex items-center justify-center group-hover:bg-[#5A5A40] group-hover:text-white transition-all">
                                    <ChevronRight size={20} />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="compendium" className="mt-10 outline-none w-full">
                    <div className="w-full space-y-8 pb-12">
                      {COMPENDIUM_DATA.map((entry) => (
                        <Card key={entry.id} className="border-none shadow-sm bg-white rounded-[32px] overflow-hidden w-full">
                          <CardHeader className="p-8 pb-4">
                            <div className="flex justify-between items-start mb-4">
                              <Badge variant="outline" className="rounded-full border-[#5A5A40]/20 text-[#5A5A40] text-[10px] font-bold uppercase tracking-widest px-4">
                                {entry.category}
                              </Badge>
                            </div>
                            <CardTitle className="font-serif text-3xl md:text-4xl text-[#5A5A40]">{entry.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-8 pt-0 space-y-8">
                            <p className="text-xl text-[#1A1A1A]/80 leading-relaxed font-serif">
                              {entry.content}
                            </p>
                            {entry.metaphor && (
                              <div className="p-8 bg-[#F5F2ED] rounded-[24px] border-l-8 border-[#5A5A40] relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-5">
                                  <Sparkles size={60} />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#5A5A40] mb-3 flex items-center gap-2">
                                  <Info size={16} /> Metáfora Sagrada
                                </p>
                                <p className="text-xl italic font-serif text-[#1A1A1A]/70 leading-relaxed">
                                  "{entry.metaphor}"
                                </p>
                              </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              {entry.example && (
                                <div className="p-6 bg-white border border-[#1A1A1A]/5 rounded-[24px] shadow-sm">
                                  <p className="text-[10px] font-black uppercase tracking-widest text-[#5A5A40] mb-3">Estudio de Caso</p>
                                  <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-medium">{entry.example}</p>
                                </div>
                              )}
                              {entry.exercise && (
                                <div className="p-6 bg-[#5A5A40]/5 border border-[#5A5A40]/10 rounded-[24px]">
                                  <p className="text-[10px] font-black uppercase tracking-widest text-[#5A5A40] mb-3">Reto de Maestría</p>
                                  <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-bold">{entry.exercise}</p>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="practice" className="mt-10 outline-none w-full">
                    <div className="w-full py-12 flex flex-col items-center">
                      <div className="max-w-2xl w-full flex flex-col items-center text-center space-y-12">
                        <div className="relative">
                          <div className="absolute inset-0 bg-[#F27D26]/20 blur-[100px] rounded-full" />
                          <div className="relative w-40 h-40 bg-white rounded-[40px] shadow-2xl flex items-center justify-center text-[#F27D26] border border-[#F27D26]/10">
                            <Dumbbell size={80} />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A]">Torneo de Sabiduría</h2>
                          <p className="text-xl text-[#1A1A1A]/60 font-medium">
                            Pon a prueba tus fundamentos con 20 desafíos generados dinámicamente.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                          {[1, 2, 3, 4].map((lvl) => (
                            <motion.div key={lvl} whileHover={{ y: -8 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="outline"
                                className={`
                                  w-full h-44 rounded-[32px] flex flex-col items-center justify-center gap-4 transition-all border-4
                                  ${selectedLevel === lvl 
                                    ? "bg-[#5A5A40] border-[#5A5A40] text-white shadow-2xl shadow-[#5A5A40]/30" 
                                    : "bg-white border-[#1A1A1A]/5 hover:border-[#5A5A40]/20 hover:bg-[#F5F2ED]"}
                                `}
                                onClick={() => setSelectedLevel(lvl)}
                              >
                                <span className={`text-3xl font-serif font-bold ${selectedLevel === lvl ? "text-white" : "text-[#5A5A40]"}`}>
                                  Grado {lvl}
                                </span>
                                <div className="h-0.5 w-10 bg-current opacity-20" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
                                  {lvl === 1 && "Fundamentos (Yin/Yang)"}
                                  {lvl === 2 && "Meridianos (Flujo)"}
                                  {lvl === 3 && "Órganos (Sustancia)"}
                                  {lvl === 4 && "Diagnóstico (Pulsos)"}
                                </span>
                              </Button>
                            </motion.div>
                          ))}
                        </div>

                        <Button 
                          onClick={handlePractice} 
                          className="h-24 px-20 rounded-[32px] bg-[#F27D26] hover:bg-[#D96A1F] text-white text-2xl font-black shadow-2xl shadow-[#F27D26]/40 transition-all hover:scale-105 active:scale-95 mt-8 w-full"
                        >
                          Invocar Desafíos
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="chat" className="mt-10 outline-none w-full">
                    <div className="w-full space-y-6">
                      <Card className="border-none shadow-xl bg-white rounded-[40px] overflow-hidden flex flex-col h-[65vh]">
                        <CardHeader className="p-8 border-b border-[#1A1A1A]/5 text-center">
                          <CardTitle className="font-serif text-2xl flex items-center gap-3 justify-center">
                            <Sparkles className="text-[#5A5A40]" size={28} />
                            El Oráculo Maestro
                          </CardTitle>
                          <CardDescription>Consulta tus dudas sobre MTC y recibe sabiduría instantánea.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-hidden p-0">
                          <ScrollArea className="h-full p-8">
                            <div className="space-y-6">
                              {chatMessages.length === 0 && (
                                <div className="text-center py-20 space-y-6">
                                  <div className="w-20 h-20 bg-[#F5F2ED] rounded-full flex items-center justify-center mx-auto text-[#5A5A40] shadow-inner">
                                    <Info size={40} />
                                  </div>
                                  <p className="text-[#1A1A1A]/40 font-medium italic text-lg max-w-sm mx-auto leading-relaxed">
                                    "El silencio es el espacio donde el Qi resuena."<br/>
                                    Comparte tu duda para iniciar el flujo.
                                  </p>
                                </div>
                              )}
                              {chatMessages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                  <div className={`max-w-[85%] p-5 rounded-[24px] shadow-sm ${
                                    msg.role === 'user' 
                                      ? 'bg-[#5A5A40] text-white rounded-tr-none' 
                                      : 'bg-[#F5F2ED] text-[#1A1A1A] rounded-tl-none border border-[#1A1A1A]/5'
                                  }`}>
                                    <p className="text-base leading-relaxed font-serif">{msg.text}</p>
                                  </div>
                                </div>
                              ))}
                              {isChatLoading && (
                                <div className="flex justify-start">
                                  <div className="bg-[#F5F2ED] p-5 rounded-[24px] rounded-tl-none border border-[#1A1A1A]/5 flex gap-3 items-center">
                                    <div className="w-2 h-2 bg-[#5A5A40] rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-[#5A5A40] rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-2 h-2 bg-[#5A5A40] rounded-full animate-bounce [animation-delay:0.4s]" />
                                  </div>
                                </div>
                              )}
                            </div>
                          </ScrollArea>
                        </CardContent>
                        <CardFooter className="p-6 border-t border-[#1A1A1A]/5 gap-3 bg-[#F5F2ED]/30">
                          <input 
                            type="text" 
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Interroga al maestro sobre meridianos, puntos o el Tao..."
                            className="flex-1 bg-white border-2 border-[#1A1A1A]/5 rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-[#5A5A40]/10 focus:border-[#5A5A40] shadow-inner outline-none transition-all"
                          />
                          <Button 
                            onClick={handleSendMessage} 
                            disabled={isChatLoading || !chatInput.trim()}
                            className="bg-[#5A5A40] hover:bg-[#4A4A30] text-white rounded-2xl h-14 w-14 shadow-lg shadow-[#5A5A40]/20 transition-transform active:scale-90"
                          >
                            <ArrowRight size={24} />
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
            ) : (
              <motion.div
                key="challenge"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="max-w-3xl mx-auto space-y-8"
              >
                <div className="flex items-center justify-between px-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => setChallenges([])} 
                    className="rounded-xl hover:bg-white text-[#1A1A1A]/60 font-bold text-xs uppercase tracking-widest"
                  >
                    Abandonar Sesión
                  </Button>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="rounded-full border-[#1A1A1A]/10 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest">
                      Pregunta {currentChallengeIndex + 1} / {challenges.length}
                    </Badge>
                    <Badge className="rounded-full bg-[#5A5A40] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest">
                      {currentChallenge.desafio}
                    </Badge>
                  </div>
                </div>

                <Card className="border-none shadow-2xl bg-white rounded-[40px] overflow-hidden">
                  <div className="h-3 bg-[#F5F2ED]">
                    <motion.div 
                      key={currentChallengeIndex}
                      className="h-full bg-[#5A5A40]"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 20, ease: "linear" }}
                    />
                  </div>
                  
                  <div className="p-8 md:p-12 space-y-10">
                    <div className="space-y-4">
                      <div className="w-12 h-1 w-24 bg-[#5A5A40]/20 rounded-full" />
                      <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight text-[#1A1A1A]">
                        {currentChallenge.descripcion}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {currentChallenge.opciones.map((option, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <Button
                            variant="outline"
                            className={`
                              w-full h-auto py-6 px-8 justify-start text-left text-xl font-serif font-medium border-2 rounded-3xl transition-all
                              ${!selectedOption && "hover:border-[#5A5A40] hover:bg-[#F5F2ED] hover:translate-x-2"}
                              ${selectedOption === option ? (feedback?.isCorrect ? "bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/20" : "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20") : "bg-white border-[#1A1A1A]/5"}
                              ${selectedOption && option !== selectedOption && "opacity-40 scale-95"}
                            `}
                            disabled={!!feedback || loading}
                            onClick={() => handleAnswer(option)}
                          >
                            <span className={`
                              w-10 h-10 rounded-2xl flex items-center justify-center mr-6 text-sm font-bold transition-colors
                              ${selectedOption === option ? "bg-white/20 text-white" : "bg-[#F5F2ED] text-[#5A5A40]"}
                            `}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            {option}
                          </Button>
                        </motion.div>
                      ))}
                    </div>

                    <AnimatePresence>
                      {feedback && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-8 rounded-[32px] border-2 flex flex-col md:flex-row gap-6 items-start ${
                            feedback.isCorrect ? "bg-green-50 border-green-100 text-green-900" : "bg-red-50 border-red-100 text-red-900"
                          }`}
                        >
                          <div className={`
                            w-16 h-16 rounded-2xl flex items-center justify-center shrink-0
                            ${feedback.isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"}
                          `}>
                            {feedback.isCorrect ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
                          </div>
                          <div className="space-y-4 flex-1">
                            <div>
                              <p className="font-serif text-2xl font-bold mb-1">
                                {feedback.isCorrect ? "¡Excelente Sabiduría!" : "El Qi está bloqueado..."}
                              </p>
                              <p className="text-lg italic font-serif leading-relaxed opacity-80">
                                {feedback.text}
                              </p>
                            </div>
                            <Button 
                              onClick={nextChallenge} 
                              className={`
                                h-14 px-10 rounded-2xl text-lg font-bold shadow-xl transition-all hover:scale-105 active:scale-95
                                ${feedback.isCorrect ? "bg-green-600 hover:bg-green-700 shadow-green-600/20" : "bg-red-600 hover:bg-red-700 shadow-red-600/20"}
                              `}
                            >
                              {currentChallengeIndex < challenges.length - 1 ? "Siguiente Desafío" : "Finalizar Sesión"}
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="pt-12 pb-12 flex flex-col items-center gap-6">
          <div className="h-px w-32 bg-[#1A1A1A]/10" />
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-[#1A1A1A]/20 hover:text-red-400 transition-colors font-bold text-[10px] uppercase tracking-[0.3em]"
            onClick={() => {
              if (confirm("¿Estás seguro de que quieres reiniciar todo tu progreso?")) {
                localStorage.removeItem('acu-progress');
                window.location.reload();
              }
            }}
          >
            Reiniciar Camino de Sabiduría
          </Button>
        </footer>
      </div>

      {/* Floating Action Button for AI Chat */}
      {challenges.length === 0 && (
        <motion.div 
          className="fixed bottom-6 right-6 z-[60]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={() => setActiveTab('chat')}
            className={`
              w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all
              ${activeTab === 'chat' 
                ? 'bg-[#5A5A40] text-white ring-4 ring-[#5A5A40]/20' 
                : 'bg-[#F27D26] text-white hover:bg-[#D96A1F] shadow-[#F27D26]/40'}
            `}
          >
            <Sparkles size={28} />
          </Button>
          <div className="absolute -top-12 right-0 bg-white px-3 py-1.5 rounded-xl border border-[#1A1A1A]/10 shadow-sm whitespace-nowrap hidden md:block">
            <p className="text-[10px] font-bold text-[#5A5A40] uppercase tracking-widest">Consultar Maestro AI</p>
          </div>
        </motion.div>
      )}

      {loading && (

        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="p-8 flex flex-col items-center gap-4 bg-white shadow-2xl border-none">
            <div className="w-12 h-12 border-4 border-[#5A5A40] border-t-transparent rounded-full animate-spin" />
            <p className="font-serif italic text-lg text-[#5A5A40]">Consultando los clásicos...</p>
          </Card>
        </div>
      )}
    </div>
  );
};


export default AcuMasterAI;
