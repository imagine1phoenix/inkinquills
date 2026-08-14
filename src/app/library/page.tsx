"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import booksData from "@/data/books.json";
import type { Book } from "@/data/types";
import { DoodleFace, DoodleCrown, DoodleStar, DoodleSquiggle, DoodleEye, DoodleSpark, DoodleSwirl } from "@/components/Doodles";

const books: Book[] = booksData as Book[];

// Split books into shelf rows of ~5 books each
function createShelves(books: Book[], booksPerShelf = 5): Book[][] {
  const shelves: Book[][] = [];
  for (let i = 0; i < books.length; i += booksPerShelf) {
    shelves.push(books.slice(i, i + booksPerShelf));
  }
  return shelves;
}

export default function LibraryPage() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const shelves = createShelves(books, 5);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedBook ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedBook]);

  return (
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <section className="py-20 md:py-28 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-ui text-xs uppercase tracking-[0.3em] text-metro-yellow mb-4">
            Our Curated Collection
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-text-primary mb-4 relative inline-block">
            The Book Wall
            <div className="absolute -top-10 -right-16 w-20 h-20 text-electric-blue rotate-12 hidden md:block">
               <DoodleCrown className="w-full h-full" delayIndex={1} />
            </div>
          </h1>
          <p className="font-body text-lg text-text-muted max-w-lg mx-auto">
            Pull a book from the shelf. Every spine holds a story we love.
          </p>
          <div className="absolute top-10 left-10 w-24 h-24 text-metro-yellow/40 -rotate-12 hidden md:block">
            <DoodleFace className="w-full h-full" delayIndex={2} />
          </div>
          <div className="absolute bottom-10 right-20 w-16 h-16 text-electric-blue/50 rotate-45 hidden md:block">
            <DoodleStar className="w-full h-full" delayIndex={1.5} />
          </div>
        </motion.div>
      </section>

      {/* Bookshelf */}
      <section className="pb-24 px-4 md:px-8 relative">
        <div className="absolute top-1/4 -left-16 w-40 h-40 text-electric-blue/10 rotate-12 hidden lg:block pointer-events-none">
          <DoodleSwirl className="w-full h-full" delayIndex={0} />
        </div>
        <div className="absolute bottom-1/4 -right-16 w-32 h-32 text-metro-yellow/10 -rotate-12 hidden lg:block pointer-events-none">
          <DoodleEye className="w-full h-full" delayIndex={0.5} />
        </div>
        <div className="max-w-6xl mx-auto space-y-2">
          {shelves.map((shelfBooks, shelfIdx) => (
            <motion.div
              key={shelfIdx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * shelfIdx, duration: 0.6 }}
            >
              <Shelf
                books={shelfBooks}
                onSelectBook={setSelectedBook}
                shelfIndex={shelfIdx}
              />
            </motion.div>
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

// ============= SHELF COMPONENT =============
function Shelf({
  books,
  onSelectBook,
  shelfIndex,
}: {
  books: Book[];
  onSelectBook: (book: Book) => void;
  shelfIndex: number;
}) {
  return (
    <div className="relative">
      {/* Shelf surface */}
      <div className="relative flex items-end justify-center gap-[3px] md:gap-[5px] px-4 md:px-8 pt-4 pb-0 min-h-[220px] md:min-h-[280px]">
        {books.map((book, i) => (
          <BookSpine
            key={book.id}
            book={book}
            onClick={() => onSelectBook(book)}
            index={i}
          />
        ))}
      </div>

      {/* Shelf board */}
      <div className="relative h-4 bg-gradient-to-b from-ink-black to-midnight rounded-b-sm border-b border-text-dim/20 shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-text-dim/30" />
      </div>

      {/* Shelf shadow */}
      <div className="h-6 bg-gradient-to-b from-midnight/80 to-transparent" />
    </div>
  );
}

// ============= BOOK SPINE COMPONENT =============
function BookSpine({
  book,
  onClick,
  index,
}: {
  book: Book;
  onClick: () => void;
  index: number;
}) {
  // Vary spine dimensions for a natural look
  const heights = [200, 220, 190, 230, 210, 215, 195, 225];
  const widths = [44, 48, 40, 52, 46, 42, 50, 38];
  const height = heights[index % heights.length];
  const width = widths[index % widths.length];

  return (
    <motion.button
      onClick={onClick}
      className="relative group cursor-pointer focus:outline-none"
      style={{
        height: `${height}px`,
        width: `${width}px`,
        minWidth: `${width}px`,
        perspective: "800px",
      }}
      whileHover={{
        rotateY: -15,
        x: -4,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      whileTap={{ scale: 0.97 }}
      aria-label={`${book.title} by ${book.author}`}
    >
      {/* Spine face */}
      <div
        className="absolute inset-0 rounded-[2px] flex flex-col items-center justify-center px-1 overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300"
        style={{ backgroundColor: book.coverColor }}
      >
        {/* Top decorative line */}
        <div
          className="absolute top-3 left-2 right-2 h-[1px] opacity-30"
          style={{ backgroundColor: book.textColor }}
        />

        {/* Title - vertical */}
        <div
          className="flex-1 flex items-center justify-center w-full"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          <span
            className="font-display text-[10px] md:text-xs font-bold tracking-wide leading-tight text-center line-clamp-3"
            style={{ color: book.textColor }}
          >
            {book.title}
          </span>
        </div>

        {/* Bottom decorative line */}
        <div
          className="absolute bottom-3 left-2 right-2 h-[1px] opacity-30"
          style={{ backgroundColor: book.textColor }}
        />

        {/* Spine edge highlight */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10" />

        {/* Hover glow */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 rounded-[2px]" />
      </div>
    </motion.button>
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
      className="fixed inset-0 z-50 flex items-center justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Side panel */}
      <motion.div
        className="relative z-10 h-full w-full max-w-lg bg-surface overflow-y-auto shadow-2xl border-l border-ink-black"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Book cover visualization */}
        <div
          className="relative px-8 md:px-12 py-16 flex flex-col items-center"
          style={{ backgroundColor: book.coverColor }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/30 transition-colors"
            aria-label="Close book detail"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke={book.textColor}
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Book shape */}
          <div
            className="w-40 h-56 rounded-sm shadow-2xl flex flex-col items-center justify-center p-4 border border-white/10"
            style={{
              backgroundColor: book.spineColor,
              boxShadow: `8px 8px 24px rgba(0,0,0,0.4)`,
            }}
          >
            <div
              className="w-full h-[1px] opacity-30 mb-3"
              style={{ backgroundColor: book.textColor }}
            />
            <h3
              className="font-display text-sm font-bold text-center leading-tight"
              style={{ color: book.textColor }}
            >
              {book.title}
            </h3>
            <p
              className="font-ui text-[9px] mt-1 uppercase tracking-widest opacity-70"
              style={{ color: book.textColor }}
            >
              {book.author}
            </p>
            <div
              className="w-full h-[1px] opacity-30 mt-3"
              style={{ backgroundColor: book.textColor }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-8 md:px-12 py-10 space-y-8">
          {/* Title + metadata */}
          <div className="relative">
            <div className="absolute -top-4 right-0 w-16 h-8 text-metro-yellow/50 rotate-6">
              <DoodleSquiggle className="w-full h-full" delayIndex={0.5} />
            </div>
            <h2 className="font-display text-3xl font-bold text-text-primary mb-1">
              {book.title}
            </h2>
            <p className="font-body text-base text-text-muted">
              {book.author}
              {book.year && (
                <span className="text-text-dim"> · {book.year}</span>
              )}
            </p>
            <span className="inline-block mt-3 font-ui text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-metro-yellow/20 text-metro-yellow">
              {book.genre}
            </span>
          </div>

          {/* Synopsis */}
          <div>
            <h4 className="font-ui text-xs uppercase tracking-widest text-metro-yellow mb-3">
              Synopsis
            </h4>
            <p className="font-body text-sm text-text-muted leading-[1.8]">
              {book.synopsis}
            </p>
          </div>

          {/* Our review */}
          <div>
            <h4 className="font-ui text-xs uppercase tracking-widest text-metro-yellow mb-3">
              Our Review
            </h4>
            <p className="font-body text-sm text-text-primary leading-[1.8]">
              {book.review}
            </p>
          </div>

          {/* Recommended by */}
          <div className="flex items-center gap-3 pt-4 border-t border-text-dim/20">
            <div className="w-8 h-8 rounded-full bg-ink-black flex items-center justify-center">
              <span className="font-display text-sm text-metro-yellow font-bold">
                {book.recommendedBy.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-ui text-xs text-text-muted">
                Recommended by
              </p>
              <p className="font-ui text-sm font-medium text-text-primary">
                {book.recommendedBy}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
