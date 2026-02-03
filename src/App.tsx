import { useState, useEffect } from 'react';
import { Smartphone, Zap, Cpu, ShieldCheck, Activity, LogOut, FileText, Settings, Database, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [diagForm, setDiagForm] = useState({ cliente: '', imei: '', modelo: 'iphone_11', consumo: '' });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const handleAnalizar = async () => {
    setLoading(true);
    try {
      // Conexión con el backend de Python
      const resp = await fetch(`http://localhost:5000/api/analizar?modelo=${diagForm.modelo}&consumo=${diagForm.consumo}`);
      const data = await resp.json();
      setResult(data);
    } catch (e) {
      alert("⚠️ Error: El servidor Python no responde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030708] text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans">
      {/* Glow Effect */}
      <div className="fixed inset-0 pointer-events-none z-0" 
           style={{ background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 242, 255, 0.07), transparent 40%)` }} />

      {/* HEADER PROFESIONAL */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-xl px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Zap className="text-cyan-400" fill="currentColor" size={20}/>
          <span className="text-xl font-black tracking-tighter italic uppercase">Shark<span className="text-cyan-400">Unlock</span></span>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <button onClick={() => setActiveSection('hero')} className="hover:text-cyan-400 transition">Inicio</button>
          <button className="hover:text-cyan-400 transition">Servicios</button>
          <button className="hover:text-cyan-400 transition">Documentación</button>
        </div>

        {isLoggedIn ? (
          <button onClick={() => setIsLoggedIn(false)} className="bg-white/5 border border-white/10 px-5 py-2 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-red-500/20 transition">
            <LogOut size={14}/> SALIR
          </button>
        ) : (
          <button onClick={() => setIsLoggedIn(true)} className="bg-cyan-500 text-black px-6 py-2 rounded-full font-bold text-xs hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition">ACCEDER AL LAB</button>
        )}
      </nav>

      <main className="relative z-10 pt-32 px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <motion.section key="hero" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                v1.8 — Motor de Diagnóstico Actualizado
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">LABORATORIO DE<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">REPARACIÓN MÓVIL</span></h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-12">
                Plataforma profesional de diagnóstico con motor de IA. Analiza consumo, detecta fallos y genera reportes en segundos.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={() => setIsLoggedIn(true)} className="bg-white text-black px-10 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all">
                  COMENZAR AHORA <ArrowRight size={20}/>
                </button>
                <button className="bg-white/5 border border-white/10 px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition">
                  <FileText size={20}/> VER DOCUMENTACIÓN
                </button>
              </div>

              {/* Stats del código original */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 border-t border-white/5 pt-12">
                <div><h4 className="text-3xl font-bold text-cyan-400 tracking-tighter">15K+</h4><p className="text-gray-500 text-xs uppercase font-bold">Analizados</p></div>
                <div><h4 className="text-3xl font-bold text-cyan-400 tracking-tighter">99.8%</h4><p className="text-gray-500 text-xs uppercase font-bold">Precisión</p></div>
                <div><h4 className="text-3xl font-bold text-cyan-400 tracking-tighter">&lt; 3s</h4><p className="text-gray-500 text-xs uppercase font-bold">Tiempo</p></div>
                <div><h4 className="text-3xl font-bold text-cyan-400 tracking-tighter">24/7</h4><p className="text-gray-500 text-xs uppercase font-bold">Disponibilidad</p></div>
              </div>
            </motion.section>
          ) : (
            <motion.section key="dashboard" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="grid md:grid-cols-12 gap-8">
              {/* Sidebar Info */}
              <div className="md:col-span-4 space-y-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-3xl shadow-2xl">
                  <div className="flex items-center gap-3 mb-8 text-cyan-400">
                    <div className="p-2 bg-cyan-400/10 rounded-xl"><Activity size={24}/></div>
                    <h3 className="text-xl font-black uppercase tracking-tight">Diagnóstico</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 ml-1 uppercase">Cliente</label>
                      <input type="text" className="w-full bg-black border border-white/10 p-4 rounded-2xl focus:border-cyan-500 outline-none transition" placeholder="Nombre completo" onChange={e => setDiagForm({...diagForm, cliente: e.target.value})}/>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 ml-1 uppercase">IMEI / Serial</label>
                      <input type="text" className="w-full bg-black border border-white/10 p-4 rounded-2xl focus:border-cyan-500 outline-none transition" placeholder="0000000000000" onChange={e => setDiagForm({...diagForm, imei: e.target.value})}/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 ml-1 uppercase">Modelo</label>
                        <select className="w-full bg-black border border-white/10 p-4 rounded-2xl outline-none" onChange={e => setDiagForm({...diagForm, modelo: e.target.value})}>
                          <option value="iphone_11">iPhone 11</option>
                          <option value="iphone_12">iPhone 12</option>
                          <option value="iphone_13">iPhone 13</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 ml-1 uppercase text-cyan-400">Consumo mA</label>
                        <input type="number" className="w-full bg-cyan-400/5 border border-cyan-400/30 p-4 rounded-2xl outline-none text-cyan-400 font-black text-xl" placeholder="0" onChange={e => setDiagForm({...diagForm, consumo: e.target.value})}/>
                      </div>
                    </div>
                  </div>

                  <button onClick={handleAnalizar} disabled={loading} className="w-full mt-8 bg-cyan-500 text-black font-black py-5 rounded-2xl shadow-[0_10px_30px_rgba(6,182,212,0.3)] hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2">
                    {loading ? "ESCANEANDO..." : "EJECUTAR DIAGNÓSTICO IA"}
                  </button>
                </div>
                
                {/* Mini Cards Estilo Código Original */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-3xl flex items-center gap-3">
                    <Database className="text-purple-400" size={20}/>
                    <div><p className="text-[10px] text-gray-500 font-bold uppercase">DB Link</p><p className="text-xs font-bold">Activa</p></div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-3xl flex items-center gap-3">
                    <ShieldCheck className="text-green-400" size={20}/>
                    <div><p className="text-[10px] text-gray-500 font-bold uppercase">Seguridad</p><p className="text-xs font-bold">Cifrada</p></div>
                  </div>
                </div>
              </div>

              {/* Boardview Visualizer */}
              <div className="md:col-span-8">
                <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-3xl h-full flex flex-col relative overflow-hidden">
                  {!result ? (
                    <div className="flex-1 flex flex-col justify-center items-center text-gray-700">
                      <div className="relative">
                        <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full animate-pulse"></div>
                        <Cpu size={80} className="relative z-10 opacity-20"/>
                      </div>
                      <p className="mt-4 font-mono text-xs tracking-[0.3em] uppercase">Telemetría desconectada</p>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col">
                      <div className="mb-8">
                        <span className="bg-cyan-500 text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest mb-2 inline-block">Diagnóstico Finalizado</span>
                        <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">{result.diagnostico}</h2>
                      </div>

                      <div className="flex-1 relative bg-black/80 rounded-[2.5rem] border border-white/5 overflow-hidden shadow-inner flex items-center justify-center">
                        {/* Grid de Fondo */}
                        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#1e293b_1px,transparent_1px),linear-gradient(90deg,#1e293b_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                        
                        {/* Radar de Falla */}
                        <motion.div 
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          className="absolute z-20"
                          style={{ left: `${result.x}%`, top: `${result.y}%`, transform: 'translate(-50%, -50%)' }}
                        >
                          <div className="w-16 h-16 bg-red-600/30 rounded-full animate-ping absolute -inset-6"></div>
                          <div className="w-6 h-6 bg-red-600 rounded-full border-4 border-white shadow-[0_0_30px_red]"></div>
                        </motion.div>

                        <div className="absolute bottom-6 left-8 font-mono text-[10px] text-gray-700 tracking-[1em] uppercase">Boardview Hardware Map</div>
                        <Settings className="absolute top-6 right-8 text-gray-800 animate-spin-slow" size={40}/>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}