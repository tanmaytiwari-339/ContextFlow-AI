// import React from 'react';
//import { ThreeBannerCanvas } from './ThreeBannerCanvas';

// export const Docs3DBannerGraphic = ({ 
//   subtitle = "From Documents to Decisions",
//   use3dCanvas = false,
// }) => {
//   return (
//     <div className="relative w-full max-w-sm h-28 hidden xl:flex items-center justify-end select-none">
//       <div className="relative w-64 h-24 flex items-center justify-center">
//         {/* Soft background glow */}
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-sky-300/30 to-indigo-400/20 blur-xl rounded-full" />
        
//         {use3dCanvas ? (
//           <div className="relative w-48 h-24 flex items-center justify-center">
//             <ThreeBannerCanvas className="w-48 h-24" />
//           </div>
//         ) : (
//           <>
//             {/* Fallback Document stack */}
//             {/* PDF Card */}
//             <div className="absolute transform -rotate-12 -translate-x-14 translate-y-1 bg-white p-2 rounded-xl shadow-md border border-red-100 flex flex-col items-center">
//               <div className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
//                 PDF
//               </div>
//               <div className="w-6 h-1 bg-slate-200 rounded mt-1.5" />
//               <div className="w-4 h-1 bg-slate-200 rounded mt-1" />
//             </div>

//             {/* Word Card */}
//             <div className="absolute transform z-10 -translate-y-2 bg-white p-2.5 rounded-xl shadow-lg border border-blue-100 flex flex-col items-center">
//               <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center text-[11px] font-bold shadow-sm">
//                 DOC
//               </div>
//               <div className="w-7 h-1 bg-slate-200 rounded mt-1.5" />
//               <div className="w-5 h-1 bg-slate-200 rounded mt-1" />
//             </div>

//             {/* Excel Card */}
//             <div className="absolute transform rotate-12 translate-x-14 translate-y-2 bg-white p-2 rounded-xl shadow-md border border-emerald-100 flex flex-col items-center">
//               <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
//                 XLS
//               </div>
//               <div className="w-6 h-1 bg-slate-200 rounded mt-1.5" />
//               <div className="w-4 h-1 bg-slate-200 rounded mt-1" />
//             </div>
//           </>
//         )}

//         {/* Hand-drawn style pointer and label */}
//         <div className="absolute -bottom-1 -right-2 flex flex-col items-end pointer-events-none">
//           <span className="text-[11px] font-semibold text-blue-600 italic tracking-tight font-sans">
//             {subtitle}
//           </span>
//           <svg className="w-12 h-5 text-blue-500" viewBox="0 0 50 20" fill="none">
//             <path d="M 5 2 Q 25 15 45 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
//             <path d="M 40 10 L 46 6 L 43 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// };

// export const People3DBannerGraphic = ({ 
//   subtitle = "The right people with the right knowledge." 
// }) => {
//   return (
//     <div className="relative w-full max-w-sm h-28 hidden xl:flex items-center justify-end select-none pointer-events-none">
//       <div className="relative w-72 h-24 flex items-center justify-center">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 via-indigo-300/30 to-purple-300/20 blur-xl rounded-full" />
        
//         {/* Stylized ID Badges */}
//         <div className="absolute transform -rotate-6 -translate-x-12 bg-white/90 backdrop-blur p-2 rounded-xl shadow-md border border-blue-100 flex items-center gap-2">
//           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
//             JD
//           </div>
//           <div className="space-y-1">
//             <div className="w-12 h-1.5 bg-slate-300 rounded" />
//             <div className="w-8 h-1.5 bg-slate-200 rounded" />
//           </div>
//         </div>

//         <div className="absolute transform rotate-6 translate-x-10 translate-y-1 bg-white/95 backdrop-blur p-2.5 rounded-xl shadow-lg border border-indigo-100 flex items-center gap-2 z-10">
//           <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
//             TT
//           </div>
//           <div className="space-y-1">
//             <div className="w-14 h-2 bg-slate-400 rounded" />
//             <div className="w-10 h-1.5 bg-slate-200 rounded" />
//           </div>
//         </div>

//         <div className="absolute -bottom-1 -right-2 flex flex-col items-end">
//           <span className="text-[11px] font-semibold text-indigo-600 italic tracking-tight font-sans">
//             {subtitle}
//           </span>
//           <svg className="w-12 h-5 text-indigo-500" viewBox="0 0 50 20" fill="none">
//             <path d="M 5 2 Q 25 15 45 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
//             <path d="M 40 10 L 46 6 L 43 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// };

// export const Shield3DBannerGraphic = ({ 
//   subtitle = "Right Knowledge, Right People, Brighter Tomorrow" 
// }) => {
//   return (
//     <div className="relative w-full max-w-sm h-28 hidden xl:flex items-center justify-end select-none pointer-events-none">
//       <div className="relative w-72 h-24 flex items-center justify-center">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 via-sky-300/30 to-indigo-300/20 blur-xl rounded-full" />
        
//         {/* Glowing Shield */}
//         <div className="w-14 h-16 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-2xl shadow-lg flex items-center justify-center text-white border-2 border-white/80">
//           <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.66 0 3 1.34 3 3v2h1v4H8v-4h1v-2c0-1.66 1.34-3 3-3zm0 2c-.55 0-1 .45-1 1v2h2v-2c0-.55-.45-1-1-1z" />
//           </svg>
//         </div>

//         <div className="absolute -bottom-1 -right-2 flex flex-col items-end">
//           <span className="text-[11px] font-semibold text-blue-600 italic tracking-tight font-sans">
//             {subtitle}
//           </span>
//           <svg className="w-12 h-5 text-blue-500" viewBox="0 0 50 20" fill="none">
//             <path d="M 5 2 Q 25 15 45 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
//             <path d="M 40 10 L 46 6 L 43 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// };

export const BrandLogo = ({ size = 'md' }) => {
  const iconSize = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';
  return (
    <div className="flex items-center gap-2.5">
      <div className={`${iconSize} rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 relative overflow-hidden group`}>
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-[17px] font-extrabold tracking-tight text-slate-900 leading-none flex items-center">
          ContextFlow <span className="text-blue-600 ml-1">AI</span>
        </span>
        <span className="text-[9px] font-bold tracking-widest text-blue-600/90 uppercase mt-0.5">
          Knowledge Intelligence
        </span>
      </div>
    </div>
  );
};
