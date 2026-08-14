"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import booksData from "@/data/books.json";
import type { Book } from "@/data/types";
import { DoodleFace, DoodleCrown, DoodleStar, DoodleSquiggle, DoodleEye, DoodleSpark, DoodleSwirl } from "@/components/Doodles";

const books: Book[] = booksData as Book[];

export default function LibraryPage() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedBook ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedBook]);

  return (
    <div className="min-h-screen bg-blueprint">
      {/* ============= HEADER ============= */}
      <section className="relative pt-28 md:pt-36 pb-16 px-6 overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
           <div className="w-[600px] h-[600px] bg-electric-blue blur-[100px] rounded-full" />
        </div>

        {/* Header Sticky Note */}
        <div className="relative max-w-3xl mx-auto z-10 flex flex-col items-center">
          <div className="absolute -top-8 -left-2 md:-left-8 z-20 bg-metro-yellow text-midnight px-4 py-2 font-ui text-[10px] font-bold uppercase tracking-widest border-2 border-midnight rotate-[-5deg] shadow-[4px_4px_0_var(--electric-blue)]">
            SECTION 03
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.6 }}
            className="relative bg-[#F4F2EC] text-midnight border-[4px] border-midnight p-8 md:p-14 shadow-[8px_8px_0_var(--electric-blue)] md:shadow-[16px_16px_0_var(--electric-blue)] w-full max-w-2xl"
          >
            {/* Top tape */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/70 border-2 border-midnight shadow-sm rotate-[2deg]" />
            
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold mb-4 text-center leading-[0.9] uppercase">
              The<br/>Book<br/>Wall
            </h1>
            <div className="w-full h-2 bg-midnight mb-6 border-b-2 border-dashed border-white"></div>
            <p className="font-body text-base md:text-xl font-bold text-center uppercase tracking-wider text-midnight/80">
              A chaotic collection of stories we can&apos;t stop talking about.
            </p>
          </motion.div>
          
          {/* Header Doodles */}
          <div className="absolute -bottom-10 -right-4 w-24 h-24 text-electric-blue rotate-12 z-0 hidden sm:block">
             <DoodleCrown className="w-full h-full" delayIndex={1} />
          </div>
          <div className="absolute top-1/2 -left-16 w-20 h-20 text-metro-yellow -rotate-12 z-0 hidden md:block">
             <DoodleEye className="w-full h-full" delayIndex={1.5} />
          </div>
        </div>
      </section>

      {/* ============= BOOKS GRID ============= */}
      <section className="pb-32 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {books.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} onClick={() => setSelectedBook(book)} />
          ))}
        </div>
      </section>

      {/* Book detail modal */}
      <AnimatePresence>
        {selectedBook && (
          <BookDetail
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ============= BOOK CARD COMPONENT =============
function BookCard({ book, index, onClick }: { book: Book; index: number; onClick: () => void }) {
  // Randomize rotation slightly for the scattered look (-4, -2, 0, 2, 4)
  const rotation = (index % 5) * 2 - 4; 
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * (index % 10), duration: 0.5 }}
      whileHover={{ y: -10, rotate: 0, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="cursor-pointer"
      style={{ rotate: `${rotation}deg` }}
    >
      <div className="relative bg-[#F4F2EC] border-[3px] border-midnight p-4 w-40 sm:w-48 md:w-[260px] h-[300px] md:h-[380px] flex flex-col justify-between shadow-[6px_6px_0_var(--electric-blue)] hover:shadow-[12px_12px_0_var(--metro-yellow)] transition-all duration-300 group">
        
        {/* Top Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/90 border border-midnight shadow-sm rotate-[-4deg] z-10" />

        {/* Abstract Cover Strip */}
        <div 
           className="w-full h-32 md:h-44 border-[3px] border-midnight overflow-hidden relative mb-4"
           style={{ backgroundColor: book.coverColor }}
        >
           {/* Texture Overlay */}
           <div className="absolute inset-0 opacity-20 mix-blend-multiply" style={{ backgroundColor: book.textColor }} />
           
           {/* Abstract typography graphic */}
           <div className="absolute -bottom-8 -right-4 text-[100px] font-display font-bold mix-blend-overlay opacity-30 select-none pointer-events-none" style={{ color: book.textColor, lineHeight: 1 }}>
             {book.title.substring(0, 2).toUpperCase()}
           </div>
        </div>

        {/* Text Area */}
        <div className="flex-1 flex flex-col">
          <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight text-midnight line-clamp-3 mb-2 uppercase group-hover:text-electric-blue transition-colors">
            {book.title}
          </h3>
          
          <div className="mt-auto space-y-2 border-t-[3px] border-dashed border-midnight/30 pt-3">
             <p className="font-ui text-[10px] font-bold uppercase tracking-widest text-midnight">
               <span className="opacity-50">BY</span> {book.author}
             </p>
             <span className="inline-block bg-metro-yellow/30 px-2 py-0.5 font-ui text-[9px] font-bold uppercase tracking-widest text-midnight">
               {book.genre}
             </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============= BOOK DETAIL PANEL =============
function BookDetail({
  book,
  onClose,
}: {
  book: Book;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
         className="absolute inset-0 bg-midnight/80 backdrop-blur-md cursor-pointer" 
         onClick={onClose} 
      />

      <motion.div
        className="relative z-10 h-full w-full max-w-2xl bg-[#F4F2EC] overflow-y-auto border-l-[4px] border-midnight shadow-[-20px_0_40px_rgba(0,0,0,0.5)]"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 250 }}
      >
        <button
          onClick={onClose}
          className="sticky top-6 right-6 ml-auto w-12 h-12 flex items-center justify-center bg-metro-yellow text-midnight hover:bg-electric-blue hover:text-[#F4F2EC] transition-colors z-30 border-[3px] border-midnight shadow-[4px_4px_0_var(--midnight)]"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="px-6 sm:px-12 pb-20 pt-8 -mt-16">
          
          {/* Header Block */}
          <div className="flex flex-col sm:flex-row gap-6 sm:items-end mb-10 border-b-[4px] border-midnight pb-8 relative mt-16">
             <div className="w-32 h-40 sm:w-40 sm:h-48 border-[4px] border-midnight flex-none shadow-[8px_8px_0_var(--electric-blue)] flex items-center justify-center p-2 relative overflow-hidden bg-white -rotate-2" style={{ backgroundColor: book.coverColor }}>
                 <div className="absolute inset-0 opacity-20 mix-blend-multiply" style={{ backgroundColor: book.textColor }} />
                 <span className="font-display text-7xl opacity-40 text-center mix-blend-overlay" style={{ color: book.textColor }}>
                   {book.title.substring(0, 1).toUpperCase()}
                 </span>
             </div>
             <div className="flex-1">
                <span className="font-ui text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-electric-blue text-[#F4F2EC] border-[2px] border-midnight mb-3 inline-block shadow-[3px_3px_0_var(--midnight)] rotate-2">
                  {book.genre}
                </span>
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase leading-[0.85] text-midnight mb-4">
                  {book.title}
                </h2>
                <div className="bg-metro-yellow inline-block px-3 py-1 border-[2px] border-midnight">
                  <p className="font-ui text-xs font-bold uppercase tracking-widest text-midnight">
                    BY {book.author}
                  </p>
                </div>
             </div>
             
             {/* Doodles */}
             <div className="absolute -top-12 right-0 w-20 h-20 text-electric-blue hidden md:block">
               <DoodleSpark className="w-full h-full" delayIndex={0.5} />
             </div>
          </div>

          {/* Content Blocks */}
          <div className="space-y-12">
            <div className="relative">
              <h4 className="absolute -top-3 left-6 bg-[#F4F2EC] px-3 font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-midnight border-[2px] border-midnight rotate-[-2deg]">
                SYNOPSIS
              </h4>
              <div className="border-[3px] border-dashed border-midnight/40 p-6 sm:p-8 bg-white/50">
                 <p className="font-body text-base md:text-lg text-midnight leading-relaxed font-medium">
                   {book.synopsis}
                 </p>
              </div>
            </div>

            <div className="relative">
              <h4 className="absolute -top-3 left-6 bg-[#F4F2EC] px-3 font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-midnight border-[2px] border-midnight rotate-[1deg]">
                OUR REVIEW
              </h4>
              <div className="border-[4px] border-midnight p-6 sm:p-8 bg-metro-yellow/20 shadow-[8px_8px_0_var(--midnight)]">
                 <p className="font-body text-base md:text-lg text-midnight leading-relaxed font-bold">
                   {book.review}
                 </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-midnight text-[#F4F2EC] p-4 sm:p-6 border-[4px] border-midnight relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 text-electric-blue/20 -translate-y-1/2 translate-x-1/4">
                 <DoodleSwirl className="w-full h-full" delayIndex={0} />
               </div>
               <span className="font-ui text-[10px] font-bold uppercase tracking-[0.2em] relative z-10 w-24 flex-none">Rec'd By</span>
               <span className="font-display text-2xl sm:text-3xl uppercase border-l-[3px] border-[#F4F2EC]/30 pl-4 sm:pl-6 relative z-10">
                 {book.recommendedBy}
               </span>
            </div>
          </div>
          
        </div>
      </motion.div>
    </motion.div>
  );
}
