import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import clubData from '../data/clubData.json';

// Helper function to resolve icon strings to Custom Cyber SVGs
const CyberIcon = ({ name, className = "w-6 h-6" }) => {
  switch (name) {
    case 'microchip':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect x="5" y="5" width="14" height="14" rx="2" />
          <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" />
        </svg>
      );
    case 'code':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case 'bezier-curve':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 019-9m9 9a9 9 0 01-9 9m0-18v18m-9-9h18" />
        </svg>
      );
    case 'astronaut':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
    case 'ninja':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case 'tie':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M12 2L9 7h6l-3-5zM9 8h6l-2 11h-2L9 8z" />
        </svg>
      );
    case 'graduation-cap':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479L12 20l-6.825-3.943a12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      );
    default:
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
};

// Animated SVG Fallback for Missing Photos (Robotic Wireframe Grid)
function AnimatedSchematicFallback({ title }) {
  return (
    <div className="relative w-full h-48 bg-[#09090c] border border-brand-cyan/20 rounded-xl overflow-hidden flex items-center justify-center group">
      {/* Moving Matrix grid lines */}
      <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(to_right,#00f5ff_1px,transparent_1px),linear-gradient(to_bottom,#00f5ff_1px,transparent_1px)] bg-[size:16px_16px] animate-pulse" />
      
      {/* Circulatory lines */}
      <svg className="absolute w-full h-full text-brand-cyan/35" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M 10 50 L 40 50 L 50 40 L 70 40 L 80 50 L 95 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 20 20 L 35 35 L 65 35 L 80 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
        />
        <circle cx="50" cy="40" r="1.5" className="fill-brand-pink animate-ping" />
        <circle cx="35" cy="35" r="1" className="fill-brand-cyan" />
      </svg>

      {/* Floating abstract hardware core */}
      <motion.div 
        className="relative z-10 p-4 bg-[#121215]/80 border border-brand-cyan/30 rounded-lg text-center"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] font-mono text-brand-cyan uppercase tracking-widest block mb-1">NO IMAGE ARCHIVE</span>
        <span className="text-xs font-bold text-slate-100 uppercase block">{title} SCHEMA</span>
      </motion.div>
    </div>
  );
}

// 3D Tilt Member Pass Card
function MemberPassCard({ membership, onJoin }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full max-w-sm rounded-2xl bg-[#121215]/90 border border-brand-pink/30 hover:border-brand-pink/60 shadow-2xl p-6 md:p-8 cursor-pointer transition-colors duration-300"
    >
      {/* Glow overlays */}
      <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-brand-pink/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-brand-orange/10 blur-2xl pointer-events-none" />

      {/* Popular tag */}
      <div className="absolute right-0 top-0 overflow-hidden rounded-tr-2xl">
        <div className="absolute h-20 w-20 bg-gradient-to-r from-brand-pink to-brand-orange" />
        <div className="absolute h-20 w-20 bg-[#121215]/95" />
        <div className="absolute right-0 top-[22px] h-[2px] w-[56px] rotate-45 bg-gradient-to-r from-brand-pink to-brand-orange" />
        <span className="absolute right-1 top-1 text-[9px] font-semibold text-white tracking-widest uppercase">POPULAR</span>
      </div>

      <div className="relative text-left">
        <span className="text-xs font-mono font-bold tracking-widest text-brand-pink uppercase block mb-1">ACCESS TOKEN</span>
        <h3 className="text-2xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-orange to-[#ff8e53] drop-shadow-[0_0_12px_rgba(255,75,139,0.3)]">
          {membership.passType}
        </h3>
        
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] via-white to-[#00f5ff] drop-shadow-[0_0_15px_rgba(0,245,255,0.4)]">
            {membership.price}
          </span>
          <span className="text-xs font-mono font-bold text-slate-100 tracking-wider">/ {membership.period}</span>
        </div>

        <p className="mt-4 text-xs text-slate-300 font-mono leading-relaxed">
          {membership.description}
        </p>
      </div>

      {/* Perks checklist */}
      <div className="relative mt-6 space-y-4 text-left border-t border-white/5 pt-6">
        {membership.perks.map((perk, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-pink/10 mt-0.5">
              <svg className="w-3.5 h-3.5 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-100 leading-none">{perk.title}</p>
              <p className="text-[10px] text-slate-400 mt-1">{perk.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Glow Join button */}
      <div className="relative mt-8">
        <button
          onClick={onJoin}
          className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-brand-orange to-[#ff8e53] p-px font-semibold text-white transition-all shadow-[0_0_20px_rgba(255,107,53,0.15)] hover:shadow-[0_0_30px_rgba(255,107,53,0.35)]"
        >
          <div className="relative rounded-xl bg-slate-950/80 px-4 py-3 transition-colors group-hover/btn:bg-transparent">
            <span className="relative flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-mono">
              Engage Terminal Pass
              <svg className="h-4.5 w-4.5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{membership.disclaimer}</span>
      </div>
    </motion.div>
  );
}

// Live Interactive Terminal Logs widget for No Old Photos Workaround
function TerminalConsole() {
  const [logs, setLogs] = useState([
    ">> System startup sequence initiated...",
    ">> Calibrating hardware-in-the-loop interfaces...",
    ">> ESTABLISHING LAB CONNECTION: OK",
    ">> Verified 250+ student certificates via central vault node."
  ]);
  const consoleEndRef = useRef(null);

  const mockCommands = [
    "git pull origin main",
    "ros2 launch uce_rob_nav waypoint_navigation.launch.py",
    "python3 -m uce_rob.edge_detection --device /dev/video0",
    "curl -X GET https://api.uce.robotics/v2/credentials/lookup",
    "marlin-flash --firmware mega2560_skr_1.4.bin",
    "esptool.py --chip esp32s3 write_flash -z 0x10000 uce_node.bin"
  ];

  const mockLogs = [
    "[INFO] ESP32 node paired. SSID: UCE_Robotics_Grid",
    "[SUCCESS] PID calibration complete. Error threshold: <0.02%",
    "[LOG] Maze algorithm updated. Node backtracking optimized.",
    "[STATUS] Remote compute node engaged. GPU rendering active.",
    "[COMPILER] ROS2 workspace build finished. 0 errors, 4 warnings."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const isCmd = Math.random() > 0.4;
      let newLog = "";
      if (isCmd) {
        newLog = `> ${mockCommands[Math.floor(Math.random() * mockCommands.length)]}`;
      } else {
        newLog = mockLogs[Math.floor(Math.random() * mockLogs.length)];
      }

      setLogs((prev) => {
        const current = [...prev, newLog];
        return current.slice(-12); // keep last 12 entries
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <div className="w-full bg-slate-950/90 border border-[#00f5ff]/20 rounded-xl p-4 font-mono text-[11px] leading-relaxed shadow-xl text-slate-300">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest">LIVE_OPERATIONS_TERMINAL</span>
      </div>
      <div className="h-44 overflow-y-auto space-y-1.5 custom-scrollbar">
        {logs.map((log, idx) => (
          <div key={idx} className={log.startsWith('>') ? 'text-[#00f5ff]' : log.startsWith('[SUCCESS]') ? 'text-green-400' : 'text-slate-300'}>
            {log}
          </div>
        ))}
        <div ref={consoleEndRef} />
      </div>
    </div>
  );
}

// 3D Perspective Event Ticket Component
function EventTicket({ ticket }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const borderThemes = {
    pink: 'border-brand-pink/35 shadow-brand-pink/5 hover:border-brand-pink/60',
    cyan: 'border-[#00f5ff]/35 shadow-brand-cyan/5 hover:border-[#00f5ff]/60',
    orange: 'border-brand-orange/35 shadow-brand-orange/5 hover:border-brand-orange/60'
  };

  const textThemes = {
    pink: 'text-brand-pink',
    cyan: 'text-[#00f5ff]',
    orange: 'text-brand-orange'
  };

  const barcodeIdClass = ticket.colorTheme === 'pink' ? 'bg-brand-pink' : ticket.colorTheme === 'cyan' ? 'bg-brand-cyan' : 'bg-brand-orange';

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative w-full rounded-2xl bg-[#121215]/90 border ${borderThemes[ticket.colorTheme]} shadow-2xl flex flex-col pointer-events-auto transition-colors duration-300 overflow-hidden`}
    >
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-mono mb-6">
          <div className="flex items-center gap-1.5">
            <svg className={`w-4 h-4 ${textThemes[ticket.colorTheme]}`} fill="currentColor" viewBox="0 0 24 24">
              <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <span className="font-bold text-slate-100">ROB_UCE</span>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold bg-white/5 border border-white/10 ${textThemes[ticket.colorTheme]}`}>
            {ticket.type}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-mono font-black text-white tracking-wider uppercase mb-1">
            {ticket.title}
          </h3>
          <p className="text-xs text-slate-400 font-mono mb-6">
            {ticket.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 font-mono text-[10px]">
          <div>
            <span className="text-slate-500 uppercase block tracking-wider">Date</span>
            <span className="text-slate-100 font-bold">{ticket.date}</span>
          </div>
          <div>
            <span className="text-slate-500 uppercase block tracking-wider">Location</span>
            <span className="text-slate-100 font-bold">{ticket.location}</span>
          </div>
        </div>
      </div>

      {/* Perforation line */}
      <div className="relative flex items-center justify-between px-6 py-2">
        <span className="absolute left-[-6px] w-3 h-3 rounded-full bg-[#09090b] border-r border-white/5" />
        <span className="w-full border-t border-dashed border-white/15" />
        <span className="absolute right-[-6px] w-3 h-3 rounded-full bg-[#09090b] border-l border-white/5" />
      </div>

      {/* Ticket Stub */}
      <div className="px-6 pb-6 pt-2 flex items-center justify-between font-mono">
        <div className="flex flex-col gap-1">
          {/* Mock barcode lines */}
          <div className="flex gap-[2px] h-6 items-end opacity-75">
            {[1, 3, 2, 4, 1, 3, 2, 1, 4, 2].map((w, idx) => (
              <span key={idx} className={`w-[2px] h-full ${barcodeIdClass}`} style={{ transform: `scaleY(${w / 4})` }} />
            ))}
          </div>
          <span className="text-[9px] text-slate-500">{ticket.id}</span>
        </div>
        <div className="text-right">
          <span className="text-[9px] text-slate-500 uppercase block tracking-wider">Admit</span>
          <span className="text-lg font-black text-white leading-none">{ticket.admitNum}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function RoboticsClub() {
  const [activeTab, setActiveTab] = useState('home');
  const [showModal, setShowModal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  
  // Certificate verification states
  const [certInput, setCertInput] = useState('');
  const [certStatus, setCertStatus] = useState(null); // 'loading', 'success', 'error'
  const [certFeedback, setCertFeedback] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  // Auto-scroll-to elements when activeTab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  function triggerToast(msg) {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg('');
    }, 4000);
  }

  // Handle cadet registration enrollment submission
  function handleSubmitEnrollment(e) {
    e.preventDefault();
    setShowModal(false);
    triggerToast("Intake Successful! Welcome to the UCE Robotics grid.");
    e.target.reset();
  }

  // Handle Certificate verification simulation
  async function handleVerifyCertificate() {
    if (!certInput.trim()) {
      setCertStatus('error');
      setCertFeedback('Certificate ID cannot be empty. Please enter a valid identifier.');
      return;
    }

    setCertStatus('loading');
    setCertFeedback('Searching certificate database...');
    setDownloadUrl('');

    // Simulate database lookup delay
    setTimeout(() => {
      if (certInput.trim() === 'UCE-ROB-2026-081') {
        setCertStatus('success');
        setCertFeedback('Certificate record authenticated successfully!');
        setDownloadUrl('https://example.com/certificates/verified-path.pdf');
      } else {
        setCertStatus('error');
        setCertFeedback('No certificate matching this ID was found.');
      }
    }, 1500);
  }

  return (
    <div className="text-slate-300 font-sans antialiased min-h-screen flex flex-col justify-between relative z-10 select-none pb-12">
      
      {/* FLOATING NAVBAR */}
      <div className="sticky top-4 z-40 w-full max-w-6xl mx-auto px-4">
        <header className="bg-slate-900/75 border border-white/10 rounded-full px-6 md:px-8 py-3.5 flex items-center justify-between shadow-2xl backdrop-blur-md">
          {/* Logo */}
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-2 focus:outline-none">
            <span className="font-mono text-lg font-black tracking-widest text-white">ROB_UCE</span>
          </button>

          {/* Nav buttons */}
          <nav className="hidden md:flex items-center gap-8 font-semibold text-[14px]">
            {['about', 'team', 'events', 'certificates'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`transition-colors uppercase tracking-wider font-mono font-bold text-xs ${activeTab === tab ? 'text-white drop-shadow-[0_0_8px_#00f5ff]' : 'text-slate-400 hover:text-white'}`}
              >
                {tab === 'certificates' ? 'Certificate' : tab.replace('-', ' ')}
              </button>
            ))}
          </nav>

          {/* Social action */}
          <div className="flex items-center gap-3">
            <a 
              href="https://instagram.com/uce_robotics" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-mono font-bold text-slate-200 transition-colors"
            >
              <span>@uce_robotics</span>
            </a>
            <button 
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-brand-orange to-brand-pink text-white rounded-full text-xs uppercase tracking-wider font-mono font-black shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              Join Club
            </button>
          </div>
        </header>
      </div>

      {/* MAIN VIEWPORT LAYOUT */}
      <main className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col my-12">
        <AnimatePresence mode="wait">
          
          {/* ================= HOME SECTION ================= */}
          {activeTab === 'home' && (
            <motion.section
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="py-6 flex flex-col lg:flex-row gap-12 justify-between items-center"
            >
              <div className="space-y-6 max-w-3xl text-left">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#121215]/80 border border-brand-pink/20 rounded-full backdrop-blur-md shadow-lg">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-pink animate-pulse"></span>
                  <span className="font-mono text-xs font-bold text-brand-pink tracking-widest uppercase">
                    {clubData.labStation}
                  </span>
                </div>
                
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  Don't just watch the future happen. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-orange to-[#ff8e53] font-mono">
                    Build it.
                  </span> <br />
                  <span className="text-2xl sm:text-4xl font-bold text-slate-100 mt-2 block">
                    {clubData.welcomeTitle}
                  </span>
                </h1>
                
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base max-w-xl">
                  {clubData.welcomeDescription}
                </p>

                {/* Main Action buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button 
                    onClick={() => setActiveTab('events')}
                    className="relative overflow-hidden rounded-xl bg-gradient-to-r from-brand-pink to-[#ff8e53] p-0.5 font-semibold text-white shadow-lg active:scale-95 transition-transform"
                  >
                    <div className="bg-slate-950/80 px-6 py-3 rounded-[10px] hover:bg-transparent transition-colors">
                      <span className="text-xs uppercase tracking-widest font-mono font-bold">Upcoming Activities</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => {
                      const el = document.getElementById('membership-card-sec');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#00f5ff] to-brand-pink p-0.5 font-semibold text-white shadow-lg active:scale-95 transition-transform"
                  >
                    <div className="bg-slate-950/80 px-6 py-3 rounded-[10px] hover:bg-transparent transition-colors">
                      <span className="text-xs uppercase tracking-widest font-mono font-bold">Get 4-Year Pass</span>
                    </div>
                  </button>
                </div>

                {/* MAXIMIZED HERO STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-white/5 font-mono max-w-2xl">
                  {clubData.stats.map((stat, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="p-5 bg-slate-900/50 border border-white/10 hover:border-brand-pink/40 rounded-2xl shadow-xl backdrop-blur-md relative overflow-hidden group transition-all"
                    >
                      {/* Glow block */}
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-orange block drop-shadow-[0_0_12px_rgba(255,75,139,0.25)]">
                        {stat.value}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-2 block leading-snug">
                        {stat.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 3D tilt member pass landing location */}
              <div id="membership-card-sec" className="w-full lg:w-auto flex justify-center py-6 mt-8 lg:mt-0">
                <MemberPassCard membership={clubData.membership} onJoin={() => setShowModal(true)} />
              </div>
            </motion.section>
          )}

          {/* ================= ABOUT US SECTION ================= */}
          {activeTab === 'about' && (
            <motion.section
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="py-6 space-y-12 text-left"
            >
              <div className="max-w-3xl space-y-4">
                <span className="text-xs font-mono text-brand-orange uppercase tracking-widest block font-bold">// 01 / CORE MISSION</span>
                <h2 className="text-4xl font-extrabold text-white">Fostering Robotics & Embedded Engineering</h2>
                <p className="text-slate-200 leading-relaxed text-sm sm:text-base">
                  Robotics Club UCE is the premiere collegiate community dedicated to exploring, designing, and fabricating next-generation robotic systems. We host weekly lab reviews, support technical student research, and compete in nationwide autonomous platform events.
                </p>
              </div>

              {/* Pillars list */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {clubData.pillars.map((pillar, idx) => (
                  <div key={idx} className="p-6 bg-slate-900/60 border border-white/10 hover:border-brand-pink/35 transition-colors rounded-2xl space-y-4 shadow-xl backdrop-blur-md">
                    <div className="w-11 h-11 rounded-xl bg-brand-pink/10 flex items-center justify-center text-brand-pink">
                      <CyberIcon name={pillar.icon} className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-wide">{pillar.title}</h3>
                    <p className="text-xs text-slate-300 font-mono leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* ================= TEAM SECTION ================= */}
          {activeTab === 'team' && (
            <motion.section
              key="team"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="py-6 space-y-12 text-left"
            >
              <div className="max-w-3xl space-y-4">
                <span className="text-xs font-mono text-brand-orange uppercase tracking-widest block font-bold">// 02 / LAB OPERATORS</span>
                <h2 className="text-4xl font-extrabold text-white">Meet the System Architects</h2>
                <p className="text-slate-200 leading-relaxed text-sm sm:text-base">
                  Our student leaders oversee physical laboratory workspaces, coordinate project clusters, and mentor incoming engineering apprentices.
                </p>
              </div>

              {/* Team list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {clubData.team.map((member, idx) => {
                  const borderTheme = member.themeColor === 'pink' ? 'hover:border-brand-pink/40' : member.themeColor === 'cyan' ? 'hover:border-[#00f5ff]/40' : member.themeColor === 'orange' ? 'hover:border-brand-orange/40' : 'hover:border-white/20';
                  const titleColor = member.themeColor === 'pink' ? 'text-brand-pink' : member.themeColor === 'cyan' ? 'text-[#00f5ff]' : member.themeColor === 'orange' ? 'text-brand-orange' : 'text-slate-400';
                  
                  return (
                    <div key={idx} className={`p-6 bg-slate-900/60 border border-white/10 ${borderTheme} rounded-2xl space-y-4 text-center shadow-xl backdrop-blur-md transition-colors`}>
                      <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-slate-400">
                        <CyberIcon name={member.icon} className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base">{member.name}</h4>
                        <span className={`text-[10px] font-mono ${titleColor} uppercase tracking-widest block mt-1`}>
                          {member.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-mono leading-relaxed">
                        Expertise: {member.expertise}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          )}

          {/* ================= EVENTS SECTION ================= */}
          {activeTab === 'events' && (
            <motion.section
              key="events"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="py-6 space-y-16 text-left"
            >
              {/* Upcoming events tickets row */}
              <div className="space-y-8">
                <div className="max-w-3xl space-y-4">
                  <span className="text-xs font-mono text-brand-orange uppercase tracking-widest block font-bold">// 03 / UPCOMING RELEASES</span>
                  <h2 class="text-4xl font-extrabold text-white">Upcoming Events & Workshops</h2>
                  <p className="text-slate-200 leading-relaxed text-sm sm:text-base">
                    Claim your digital laboratory access pass. Hover over the tickets to experience 3D perspective rotations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {clubData.upcomingEvents.map((ticket, idx) => (
                    <EventTicket key={idx} ticket={ticket} />
                  ))}
                </div>
              </div>

              {/* PAST EVENTS GALLERY COLUMN/SECTION WITH SVG SCHEMATICS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-12 border-t border-white/5">
                
                {/* Past events gallery grid */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-brand-pink uppercase tracking-widest block font-bold">// ARCHIVE GRID</span>
                    <h3 className="text-2xl font-black text-white uppercase">Past Events Gallery</h3>
                    <p className="text-xs text-slate-400 font-mono leading-relaxed">
                      Review completed operation sprints. Missing visual records load automated wireframe system schematics.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {clubData.pastEvents.map((event) => (
                      <div key={event.id} className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 space-y-4 shadow-md hover:border-brand-pink/25 transition-colors flex flex-col justify-between">
                        <div>
                          {event.image ? (
                            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-950 border border-white/5 mb-3 flex items-center justify-center">
                              {/* Sleek image placeholder with wireframe overlay since absolute path might not exist */}
                              <div className="absolute inset-0 bg-[#0c0c0e] flex flex-col items-center justify-center p-4 text-center">
                                <svg className="w-8 h-8 text-brand-pink/50 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-[9px] font-mono text-brand-pink uppercase tracking-widest block">{event.category} CAPTURE</span>
                                <span className="text-xs text-slate-300 font-bold block mt-1">{event.title}</span>
                              </div>
                            </div>
                          ) : (
                            <AnimatedSchematicFallback title={event.title} />
                          )}

                          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                            <span>{event.date}</span>
                            <span className="text-brand-orange uppercase">{event.category}</span>
                          </div>
                          
                          <h4 className="text-sm font-bold text-white font-mono uppercase mb-2">{event.title}</h4>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Operations Terminal Logs (Hacker Look workaround for missing photos) */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#00f5ff] uppercase tracking-widest block font-bold">// SYSTEM NODE METRICS</span>
                    <h3 className="text-2xl font-black text-white uppercase">Operations Feed</h3>
                    <p className="text-xs text-slate-400 font-mono leading-relaxed">
                      Active terminal loops recording hardware actions and pilot intake pipelines.
                    </p>
                  </div>
                  
                  <TerminalConsole />

                  <div className="p-5 bg-slate-900/60 border border-[#00f5ff]/20 rounded-2xl font-mono text-[10px] leading-relaxed text-slate-400">
                    <span className="text-xs font-bold text-[#00f5ff] uppercase block mb-2">// HARDWARE FOCUS METRICS</span>
                    <ul className="space-y-2">
                      <li className="flex justify-between border-b border-white/5 pb-1">
                        <span>MAZE_COMPLETION_TIME</span>
                        <span className="text-white font-bold">14.6s</span>
                      </li>
                      <li className="flex justify-between border-b border-white/5 pb-1">
                        <span>HIL_SIMULATION_STABILITY</span>
                        <span className="text-white font-bold">99.84%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>SWARM_ROVER_GRID_LATENCY</span>
                        <span className="text-white font-bold">4.2ms</span>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </motion.section>
          )}

          {/* ================= CERTIFICATES SECTION ================= */}
          {activeTab === 'certificates' && (
            <motion.section
              key="certificates"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="py-6 flex flex-col justify-center items-center text-center space-y-12 w-full max-w-4xl mx-auto"
            >
              <div className="max-w-3xl space-y-4">
                <span className="text-xs font-mono text-brand-orange uppercase tracking-widest block font-bold">// 04 / SECURE RETRIEVAL</span>
                <h2 className="text-4xl font-extrabold text-white">Retrieve Robotics Credentials</h2>
                <p className="text-slate-200 leading-relaxed text-sm sm:text-base">
                  Input your secure certificate key hash below to decrypt and retrieve your verified robotics credential documentation directly from our central vault node.
                </p>
              </div>

              <div className="w-full max-w-2xl text-left bg-slate-900/80 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden">
                <div className="bg-black/35 px-6 py-4 border-b border-white/10 flex items-center justify-between font-mono text-xs text-white">
                  <span className="font-bold tracking-wider">SECURITY_VALIDATION_ENGINE</span>
                  <span className="text-[#00f5ff] font-bold">SECURE_NODE</span>
                </div>

                <div className="p-8 space-y-6">
                  <div className="font-mono text-xs">
                    <label className="block text-slate-400 uppercase tracking-widest mb-3 font-bold">Certificate ID Hash</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                      <input 
                        type="text" 
                        value={certInput}
                        onChange={(e) => setCertInput(e.target.value)}
                        placeholder="e.g. UCE-ROB-2026-081" 
                        className="flex-1 bg-[#121215] border border-zinc-700 rounded-xl px-5 py-4 text-base text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange font-mono font-bold shadow-inner w-full sm:w-auto"
                      />
                      <button 
                        onClick={handleVerifyCertificate}
                        className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-brand-orange to-brand-pink text-white font-mono uppercase tracking-wider rounded-xl font-bold hover:brightness-110 active:scale-95 transition-all text-xs"
                      >
                        Search Database
                      </button>
                    </div>
                  </div>

                  {/* Feedback status log */}
                  {certStatus && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl font-mono text-xs leading-relaxed ${certStatus === 'loading' ? 'bg-[#00f5ff]/10 border border-[#00f5ff]/20 text-[#00f5ff]' : certStatus === 'success' ? 'bg-green-950/30 border border-green-500/30 text-green-400' : 'bg-red-950/30 border border-red-500/30 text-red-400'}`}
                    >
                      <div className="flex items-center gap-2">
                        {certStatus === 'loading' && <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-ping" />}
                        <span>{certFeedback}</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Download button */}
                  {downloadUrl && (
                    <div className="flex justify-center pt-2">
                      <a 
                        href={downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3.5 bg-gradient-to-r from-[#00f5ff] to-brand-pink text-white font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg"
                      >
                        Download PDF Credential
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 text-slate-500 text-xs font-mono relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 450 120" className="h-10 w-auto text-white/40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(10, 10)">
                <rect x="25" y="25" width="50" height="50" rx="6" transform="rotate(45 50 50)" stroke="currentColor" stroke-width="5" fill="none"/>
                <rect x="36" y="38" width="28" height="20" rx="4" fill="currentColor"/>
              </g>
              <text x="120" y="65" font-family="system-ui, sans-serif" font-size="44" font-weight="900" fill="currentColor" letter-spacing="4">ROBOTICS</text>
              <text x="120" y="95" font-family="monospace" font-size="18" font-weight="700" fill="#ff6b35" letter-spacing="6">CLUB | UCE</text>
            </svg>
          </div>
          <span>&copy; 2026 UCE ROBOTICS CLUB. All rights reserved.</span>
        </div>
      </footer>

      {/* REGISTRATION MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-lg bg-slate-900 border border-brand-pink/30 p-8 rounded-2xl shadow-2xl z-10"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center mb-6">
                <span className="text-[10px] font-mono text-brand-orange uppercase tracking-widest block mb-1 font-bold">// SECURE CADET INTAKE</span>
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-[#ff8e53] uppercase tracking-wider">Initiate Pilot Enrollment</h3>
                <p className="text-xs text-slate-400 font-mono mt-1">Calibrate your bio-metrics for the 4-year autonomous term.</p>
              </div>

              <form onSubmit={handleSubmitEnrollment} className="space-y-4 font-mono text-xs text-slate-300">
                <div className="space-y-1">
                  <label className="block text-slate-400 uppercase tracking-widest text-[9px] font-bold">Pilot Identifier (Full Name)</label>
                  <input type="text" required placeholder="e.g. Neo Prime" className="w-full bg-[#121215] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-pink transition-all" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-slate-400 uppercase tracking-widest text-[9px] font-bold">Comm Link (10-Digit Mobile)</label>
                    <input type="tel" required pattern="[0-9]{10}" maxLength="10" placeholder="e.g. 9876543210" className="w-full bg-[#121215] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-pink transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-slate-400 uppercase tracking-widest text-[9px] font-bold">Neural Address (Email)</label>
                    <input type="email" required placeholder="e.g. link@mainframe.org" className="w-full bg-[#121215] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-pink transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-slate-400 uppercase tracking-widest text-[9px] font-bold">Operational Cycle (Semester)</label>
                    <select required className="w-full bg-[#121215] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-pink transition-all cursor-pointer">
                      <option value="" disabled selected>Select Level</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                        <option key={s} value={`Semester ${s}`}>Semester {s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-slate-400 uppercase tracking-widest text-[9px] font-bold">Core Division (Branch)</label>
                    <select required className="w-full bg-[#121215] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-pink transition-all cursor-pointer">
                      <option value="" disabled selected>Select Division</option>
                      {["Computer Science", "Cybersecurity", "Artificial Intelligence", "Electronics", "Electrical", "Polymer"].map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-400 uppercase tracking-widest text-[9px] font-bold">Cadet Serial Code (KTU ID)</label>
                  <input type="text" required placeholder="e.g. ID-8893-SYS" className="w-full bg-[#121215] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-pink transition-all" />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-4 rounded-xl border border-white/10 transition-colors uppercase tracking-wider text-[10px]">
                    Abort Mission
                  </button>
                  <button type="submit" className="flex-1 bg-gradient-to-r from-brand-orange to-brand-pink text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:brightness-110 transition-all uppercase tracking-wider text-[10px]">
                    Engage Core
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOAST POPUP */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-6 right-6 z-50 bg-[#121215] border border-brand-orange text-white text-xs font-mono rounded px-6 py-4 flex items-center gap-3 shadow-2xl"
          >
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
