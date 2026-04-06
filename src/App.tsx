/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { 
  LayoutDashboard, 
  Shield, 
  Map as MapIcon, 
  Database, 
  UserRound, 
  AlertTriangle, 
  Activity, 
  BarChart3, 
  Terminal, 
  Settings,
  Search,
  Bell,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  Crosshair,
  Eye
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { cn } from "@/src/lib/utils";

// --- Mock Data ---
const CRIME_TRENDS = [
  { month: "Jan", cases: 420, prev: 380 },
  { month: "Feb", cases: 380, prev: 410 },
  { month: "Mar", cases: 510, prev: 450 },
  { month: "Apr", cases: 480, prev: 490 },
  { month: "May", cases: 590, prev: 520 },
  { month: "Jun", cases: 610, prev: 580 },
  { month: "Jul", cases: 540, prev: 600 },
  { month: "Aug", cases: 680, prev: 620 },
  { month: "Sep", cases: 720, prev: 650 },
  { month: "Oct", cases: 690, prev: 700 },
  { month: "Nov", cases: 750, prev: 720 },
  { month: "Dec", cases: 810, prev: 780 },
];

const CRIME_TYPES = [
  { name: "Theft", value: 45, color: "#facc15" },
  { name: "Assault", value: 25, color: "#ef4444" },
  { name: "Burglary", value: 15, color: "#ffffff" },
  { name: "Vandalism", value: 10, color: "#52525b" },
  { name: "Other", value: 5, color: "#27272a" },
];

const RECENT_ALERTS = [
  { id: 1, type: "High Risk", location: "Sector 7G", time: "2m ago", status: "Active" },
  { id: 2, type: "Anomaly", location: "Downtown", time: "15m ago", status: "Investigating" },
  { id: 3, type: "Pattern", location: "East Side", time: "1h ago", status: "Resolved" },
];

const MODULES = [
  { id: "strategic", label: "Strategic", icon: LayoutDashboard, desc: "Long-term planning and resource allocation" },
  { id: "operations", label: "Operations", icon: Shield, desc: "Real-time patrol and response management" },
  { id: "crime-action", label: "Crime Action", icon: MapIcon, desc: "Tactical deployment and incident analysis" },
  { id: "raw-data", label: "Raw Data", icon: Database, desc: "Direct access to historical crime records" },
  { id: "victim-risk", label: "Victim Risk", icon: UserRound, desc: "Predictive modeling for vulnerable populations" },
  { id: "anomaly", label: "Anomaly", icon: AlertTriangle, desc: "Detection of unusual crime spikes and patterns" },
  { id: "socioeconomic", label: "Socioeconomic", icon: Activity, desc: "Correlation with demographic and economic data" },
  { id: "performance", label: "Performance", icon: BarChart3, desc: "Agency efficiency and outcome tracking" },
  { id: "command", label: "Command Center", icon: Terminal, desc: "Unified control and decision support" },
  { id: "model-lab", label: "Model Lab", icon: Zap, desc: "AI model training and validation workbench" },
];

// --- Background Components ---
const DataStream = () => {
  const streams = Array.from({ length: 20 }).map((_, i) => {
    const left = `${Math.random() * 100}%`;
    const duration = `${Math.random() * 10 + 10}s`;
    const delay = `-${Math.random() * 20}s`;
    const content = Array.from({ length: 30 })
      .map(() => Math.random() > 0.5 ? "1" : "0")
      .join("");
    return (
      <div 
        key={i} 
        className="code-stream absolute top-0"
        style={{ left, animationDuration: duration, animationDelay: delay }}
      >
        {content}
      </div>
    );
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-50">
      {streams}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.8)_100%)]" />
    </div>
  );
};

const PoiCorners = () => (
  <>
    <div className="poi-corner poi-tl" />
    <div className="poi-corner poi-tr" />
    <div className="poi-corner poi-bl" />
    <div className="poi-corner poi-br" />
  </>
);

// --- Landing Page ---
const LandingPage = ({ onEnter }: { onEnter: () => void }) => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full relative z-10 p-8">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="liquid-glass w-full max-w-3xl p-12 flex flex-col items-center text-center"
      >
        <PoiCorners />
        
        <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] text-machine-yellow opacity-70">
          <Crosshair className="w-3 h-3" />
          <span>SYS.OP.01</span>
        </div>
        
        <div className="absolute top-4 right-4 flex items-center gap-2 text-[10px] text-system-white opacity-70">
          <span>REC</span>
          <div className="w-2 h-2 bg-threat-red rounded-full animate-pulse" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Eye className="w-16 h-16 text-machine-yellow mx-auto mb-6 opacity-80" />
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-2 text-system-white">
            ADMINISTRATIVE
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold tracking-widest text-machine-yellow">
            ACCESS
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="space-y-2 mb-12 text-sm text-zinc-400"
        >
          <p className="flex items-center justify-center gap-2">
            <span className="text-machine-yellow">[</span>
            IDENTIFYING THREATS...
            <span className="text-machine-yellow">]</span>
          </p>
          <p>MACHINE STATUS: <span className="text-system-white">ONLINE</span></p>
          <p>CONNECTION: <span className="text-system-white">SECURE</span></p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          onClick={onEnter}
          className="group relative px-8 py-4 bg-transparent border border-machine-yellow text-machine-yellow font-bold uppercase tracking-widest hover:bg-machine-yellow hover:text-void transition-all duration-300"
        >
          <PoiCorners />
          <span className="relative z-10 flex items-center gap-2">
            Enter System <span className="blink-cursor">_</span>
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
};

// --- Dashboard Components ---
const Sidebar = ({ activeModule, setActiveModule }: { activeModule: string, setActiveModule: (id: string) => void }) => (
  <aside className="w-64 border-r border-machine-yellow/20 bg-void/80 backdrop-blur-md flex flex-col h-screen sticky top-0 z-20">
    <div className="p-6 border-b border-machine-yellow/20">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-machine-yellow flex items-center justify-center relative">
          <PoiCorners />
          <Eye className="w-5 h-5 text-void" />
        </div>
        <span className="font-bold text-lg text-system-white tracking-widest uppercase">
          CRIME INTEL
        </span>
      </div>
    </div>
    
    <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
      <div className="px-3 mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-machine-yellow/70">
        [ Modules ]
      </div>
      {MODULES.map((module) => (
        <button
          key={module.id}
          onClick={() => setActiveModule(module.id)}
          className={cn(
            "nav-item w-full text-left group",
            activeModule === module.id ? "nav-item-active" : "nav-item-inactive"
          )}
        >
          <module.icon className={cn(
            "w-4 h-4 transition-colors",
            activeModule === module.id ? "text-machine-yellow" : "text-zinc-500 group-hover:text-system-white"
          )} />
          {module.label}
        </button>
      ))}
    </nav>

    <div className="p-4 border-t border-machine-yellow/20">
      <button className="nav-item w-full nav-item-inactive">
        <Settings className="w-4 h-4" />
        Settings
      </button>
    </div>
  </aside>
);

const Header = ({ title }: { title: string }) => (
  <header className="h-16 border-b border-machine-yellow/20 bg-void/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30">
    <div className="flex items-center gap-4">
      <h2 className="text-xl font-bold text-system-white uppercase tracking-widest">{title}</h2>
      <div className="h-4 w-[1px] bg-machine-yellow/30 mx-2" />
      <div className="flex items-center gap-2 px-2 py-1 bg-machine-yellow/10 border border-machine-yellow/30 text-[10px] text-machine-yellow">
        <span className="w-1.5 h-1.5 bg-machine-yellow animate-pulse" />
        SYS: ONLINE
      </div>
    </div>

    <div className="flex items-center gap-6">
      <div className="relative group">
        <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-machine-yellow transition-colors" />
        <input 
          type="text" 
          placeholder="SEARCH RECORDS..." 
          className="bg-void border border-machine-yellow/30 pl-10 pr-4 py-1.5 text-xs focus:outline-none focus:border-machine-yellow text-system-white w-64 transition-all uppercase placeholder:text-zinc-600"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-white/5 transition-colors relative">
          <Bell className="w-4 h-4 text-zinc-400" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-threat-red" />
        </button>
        <div className="w-8 h-8 border border-machine-yellow/50 overflow-hidden relative">
          <PoiCorners />
          <img 
            src="https://picsum.photos/seed/admin/100/100" 
            alt="User" 
            className="w-full h-full object-cover grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  </header>
);

const KpiCard = ({ label, value, trend, icon: Icon, color }: any) => (
  <div className="glass-card p-6 flex flex-col gap-4 relative">
    <PoiCorners />
    <div className="flex items-center justify-between">
      <div className={cn("p-2 border", color.replace('text-', 'border-').replace('bg-', 'border-'))}>
        <Icon className={cn("w-4 h-4", color)} />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 border",
        trend > 0 ? "text-threat-red border-threat-red/30" : "text-system-white border-system-white/30"
      )}>
        {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {Math.abs(trend)}%
      </div>
    </div>
    <div>
      <div className="kpi-label mb-1">{label}</div>
      <div className="kpi-value">{value}</div>
    </div>
  </div>
);

const DashboardContent = () => (
  <div className="space-y-8 relative z-10">
    {/* KPI Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KpiCard label="Total Incidents" value="12,842" trend={12.5} icon={Activity} color="text-machine-yellow" />
      <KpiCard label="Response Time" value="4.2m" trend={-8.2} icon={Clock} color="text-system-white" />
      <KpiCard label="Arrest Rate" value="68.4%" trend={2.1} icon={Shield} color="text-system-white" />
      <KpiCard label="Active Alerts" value="24" trend={15.0} icon={AlertTriangle} color="text-threat-red" />
    </div>

    {/* Main Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 glass-card p-6 relative">
        <PoiCorners />
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg mb-1 uppercase tracking-widest text-system-white">Crime Frequency Trend</h3>
            <p className="text-xs text-zinc-500 uppercase">Monthly comparison (2024 vs 2023)</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-machine-yellow" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-zinc-700" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase">Previous</span>
            </div>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CRIME_TRENDS}>
              <defs>
                <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-machine-yellow)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-machine-yellow)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(250, 204, 21, 0.1)" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#71717a", fontSize: 10, fontFamily: "JetBrains Mono" }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#71717a", fontSize: 10, fontFamily: "JetBrains Mono" }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: "#050505", border: "1px solid rgba(250, 204, 21, 0.3)", borderRadius: "0" }}
                itemStyle={{ fontSize: "12px", fontFamily: "JetBrains Mono" }}
              />
              <Area 
                type="step" 
                dataKey="cases" 
                stroke="var(--color-machine-yellow)" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorCases)" 
              />
              <Area 
                type="step" 
                dataKey="prev" 
                stroke="#52525b" 
                strokeWidth={1}
                fill="transparent" 
                strokeDasharray="4 4"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card p-6 relative">
        <PoiCorners />
        <h3 className="text-lg mb-1 uppercase tracking-widest text-system-white">Incident Dist</h3>
        <p className="text-xs text-zinc-500 mb-8 uppercase">Primary category</p>
        <div className="h-[240px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={CRIME_TYPES}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {CRIME_TYPES.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: "#050505", border: "1px solid rgba(250, 204, 21, 0.3)", borderRadius: "0" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-machine-yellow">100%</span>
            <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Coverage</span>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          {CRIME_TYPES.map((type) => (
            <div key={type.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2" style={{ backgroundColor: type.color }} />
                <span className="text-zinc-400 uppercase">{type.name}</span>
              </div>
              <span className="font-bold text-system-white">[{type.value}%]</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-card p-6 relative">
        <PoiCorners />
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg uppercase tracking-widest text-system-white">Priority Alerts</h3>
          <button className="text-[10px] font-bold text-machine-yellow uppercase tracking-wider hover:underline">[ View All ]</button>
        </div>
        <div className="space-y-4">
          {RECENT_ALERTS.map((alert) => (
            <div key={alert.id} className="flex items-center gap-4 p-3 border border-machine-yellow/10 bg-white/5 group hover:border-machine-yellow/40 transition-colors">
              <div className={cn(
                "w-10 h-10 flex items-center justify-center shrink-0 border",
                alert.type === "High Risk" ? "border-threat-red text-threat-red bg-threat-red/10" : "border-machine-yellow text-machine-yellow bg-machine-yellow/10"
              )}>
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-system-white uppercase">{alert.type}</span>
                  <span className="text-[10px] text-zinc-500">{alert.time}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase">
                  <MapIcon className="w-3 h-3" />
                  {alert.location}
                </div>
              </div>
              <div className="px-2 py-1 border border-zinc-700 text-[8px] font-bold text-zinc-400 uppercase tracking-widest">
                {alert.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6 overflow-hidden relative">
        <PoiCorners />
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Crosshair className="w-32 h-32" />
        </div>
        <h3 className="text-lg mb-1 uppercase tracking-widest text-system-white">Risk Heatmap</h3>
        <p className="text-xs text-zinc-500 mb-6 uppercase">High-concentration areas</p>
        <div className="h-[240px] bg-void border border-machine-yellow/20 flex items-center justify-center overflow-hidden group relative">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map/800/400')] bg-cover bg-center opacity-20 grayscale contrast-150" />
          <div className="absolute inset-0 bg-machine-yellow/5 mix-blend-overlay" />
          <div className="text-center p-8 relative z-10">
            <Crosshair className="w-12 h-12 text-machine-yellow mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 opacity-50" />
            <p className="text-sm text-machine-yellow max-w-[200px] mx-auto uppercase blink-cursor">Awaiting Spatial Data...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [view, setView] = useState<"landing" | "dashboard">("landing");
  const [activeModule, setActiveModule] = useState("strategic");

  // 3D Tilt Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const currentModule = useMemo(() => 
    MODULES.find(m => m.id === activeModule) || MODULES[0]
  , [activeModule]);

  return (
    <>
      <DataStream />
      
      {/* Main Container with 3D Tilt */}
      <div 
        className="w-full h-screen overflow-hidden perspective-[1000px]"
        onMouseMove={handleMouseMove}
      >
        <motion.div 
          className="w-full h-full"
          style={{ 
            rotateX, 
            rotateY, 
            transformStyle: "preserve-3d" 
          }}
        >
          <AnimatePresence mode="wait">
            {view === "landing" ? (
              <motion.div
                key="landing"
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <LandingPage onEnter={() => setView("dashboard")} />
              </motion.div>
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 flex bg-void/50"
              >
                <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />

                <div className="flex-1 flex flex-col min-w-0 relative z-10">
                  <Header title={currentModule.label} />
                  
                  <main className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeModule}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mb-8">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-machine-yellow uppercase tracking-[0.2em] mb-2">
                            <span className="text-system-white">[</span>
                            <currentModule.icon className="w-3 h-3" />
                            MODULE INTEL
                            <span className="text-system-white">]</span>
                          </div>
                          <h1 className="text-4xl text-system-white mb-2">
                            {currentModule.label}
                          </h1>
                          <p className="text-zinc-500 max-w-2xl uppercase text-xs">
                            {currentModule.desc}. Operationalizing community-month forecasting framework.
                          </p>
                        </div>

                        {activeModule === "strategic" ? (
                          <DashboardContent />
                        ) : (
                          <div className="glass-card p-12 flex flex-col items-center justify-center text-center min-h-[500px] relative">
                            <PoiCorners />
                            <div className="w-16 h-16 border border-machine-yellow/30 flex items-center justify-center mb-6 relative">
                              <PoiCorners />
                              <currentModule.icon className="w-8 h-8 text-machine-yellow/50" />
                            </div>
                            <h3 className="text-xl text-system-white mb-2 uppercase tracking-widest">
                              {currentModule.label}
                            </h3>
                            <p className="text-zinc-500 max-w-md mb-8 uppercase text-xs">
                              Module currently locked or in validation phase.
                            </p>
                            <button 
                              onClick={() => setActiveModule("strategic")}
                              className="text-xs font-bold text-machine-yellow hover:text-system-white transition-colors uppercase tracking-widest"
                            >
                              [ Return to Strategic ]
                            </button>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </main>

                  <footer className="h-10 border-t border-machine-yellow/20 bg-void/80 px-8 flex items-center justify-between text-[10px] text-zinc-600 uppercase tracking-widest">
                    <div className="flex items-center gap-4">
                      <span>© 2026 THE MACHINE</span>
                      <span className="h-3 w-[1px] bg-machine-yellow/30" />
                      <span>LAT: 1.3521° N, LONG: 103.8198° E</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-system-white" />
                        SYS.STABLE
                      </span>
                      <span className="flex items-center gap-2 text-machine-yellow">
                        <div className="w-1 h-1 bg-machine-yellow" />
                        V2.4.0
                      </span>
                    </div>
                  </footer>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}

