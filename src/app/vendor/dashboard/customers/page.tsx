export default function VendorCustomersPage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black text-[#D9A606] uppercase tracking-[0.4em] italic">Audience Intelligence</span>
      </div>
      <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">Client <span className="text-zinc-400">Network.</span></h1>
      
      <div className="mt-8 p-12 rounded-[3.5rem] bg-white/70 border border-white/50 backdrop-blur-xl transition-all duration-700 hover:bg-white shadow-[0_20px_40px_rgba(0,0,0,0.02)] min-h-[500px] flex flex-col items-center justify-center text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D9A606]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        <div className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 mb-8 rotate-[-3deg] group-hover:rotate-0 transition-transform duration-700">
           <div className="w-16 h-16 text-[#D9A606] opacity-40">
             <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
             </svg>
           </div>
        </div>
        <p className="text-2xl font-black text-zinc-900 mb-3 tracking-tighter">Directory Initialized.</p>
        <p className="text-sm text-zinc-500 max-w-sm font-medium leading-relaxed">Your global customer database is currently being populated. Relationship metrics will manifest as your market presence expands.</p>
        <div className="mt-10">
           <button className="px-10 py-4 rounded-2xl bg-[#D9A606] text-[11px] font-black text-white hover:scale-105 transition-all uppercase tracking-widest shadow-lg shadow-[#D9A606]/20">
              Synchronize Directory
           </button>
        </div>
      </div>
    </div>
  );
}

