"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const activities = [
  {
    icon: "🎤",
    title: "Open Mic Nights",
    description:
      "Monthly readings where members share original work, favorite passages, or spoken-word pieces in a welcoming, judgment-free space.",
  },
  {
    icon: "✍️",
    title: "Writing Workshops",
    description:
      "Hands-on sessions exploring craft — from flash fiction and poetry forms to editing techniques and finding your voice.",
  },
  {
    icon: "📖",
    title: "Book Discussions",
    description:
      "Deep-dive conversations about books that challenge, inspire, and reshape how we think about storytelling.",
  },
  {
    icon: "🏕",
    title: "Writers' Retreats",
    description:
      "Weekend getaways dedicated to writing, workshopping, and the kind of late-night conversations that only happen away from campus.",
  },
  {
    icon: "🎓",
    title: "Guest Lectures",
    description:
      "Published authors, editors, and literary professionals share their craft, career paths, and hard-won lessons.",
  },
  {
    icon: "📝",
    title: "Peer Review Circles",
    description:
      "Small-group feedback sessions where members workshop their writing with constructive, craft-focused critique.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <section className="py-20 md:py-28 px-6 bg-charcoal text-parchment text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-ui text-xs uppercase tracking-[0.3em] text-gold mb-4">
            Who We Are
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">
            About the Club
          </h1>
          <p className="font-body text-lg text-parchment/50 max-w-lg mx-auto">
            A space for the curious, the creative, and the quietly obsessed with
            words.
          </p>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-ui text-xs uppercase tracking-[0.3em] text-gold mb-8">
              Our Mission
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-ink leading-tight">
              To create a space where every story finds its voice and every
              reader finds their story.
            </blockquote>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="gold-line-center mt-8" />
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 px-6 bg-mist/30">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-ink mb-8">
              Our Story
            </h2>
          </ScrollReveal>
          <div className="space-y-6">
            <ScrollReveal delay={0.1}>
              <p className="font-body text-base md:text-lg text-ink-light leading-[1.9]">
                Inks & Quils started the way most good things do — with a
                conversation that went on too long. A handful of students who
                kept recommending books to each other in the dining hall decided
                that conversations about literature deserved their own time and
                space.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="font-body text-base md:text-lg text-ink-light leading-[1.9]">
                What began as an informal reading circle quickly grew into
                something more ambitious. Members started sharing their own
                writing — nervously at first, then with increasing confidence.
                Open mic nights drew crowds. Workshops filled up. The retreat
                waiting list got longer than the retreat itself.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="font-body text-base md:text-lg text-ink-light leading-[1.9]">
                Today, the club is home to poets and novelists, essayists and
                screenwriters, people who read three books a week and people who
                are still working through their first novel. What unites us
                isn&apos;t a shared taste — it&apos;s a shared belief that the
                best stories emerge when different perspectives sit in the same
                room and take each other seriously.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">
                What We Do
              </h2>
              <div className="gold-line-center" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, i) => (
              <ScrollReveal key={activity.title} delay={0.08 * i}>
                <div className="h-full bg-parchment-dark/50 rounded-2xl p-8 border border-ink/5 hover:border-gold/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <span className="text-3xl mb-4 block">{activity.icon}</span>
                  <h3 className="font-display text-lg font-bold text-ink mb-2">
                    {activity.title}
                  </h3>
                  <p className="font-body text-sm text-ink-light leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 px-6 bg-charcoal text-parchment">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12">
              What We Believe
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                value: "Every voice matters",
                detail:
                  "Published or unpublished, experienced or just starting — your perspective has value here.",
              },
              {
                value: "Craft is a practice",
                detail:
                  "Writing improves with reading, feedback, and the courage to keep revising. We're all works in progress.",
              },
              {
                value: "Stories connect us",
                detail:
                  "Literature builds empathy. The best books teach us to see the world through eyes that aren't our own.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.value} delay={0.15 * i}>
                <div className="space-y-3">
                  <h3 className="font-display text-xl font-bold text-gold">
                    {item.value}
                  </h3>
                  <p className="font-body text-sm text-parchment/50 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
