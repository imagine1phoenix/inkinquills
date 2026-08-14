"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import { DoodleFace, DoodleStar, DoodleArrow, DoodleCrown, DoodleSpark, DoodleEye, DoodleSwirl, DoodleCircle, DoodleSquiggle } from "@/components/Doodles";

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
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <section className="py-20 md:py-28 px-6 bg-ink-black text-text-primary text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-ui text-xs uppercase tracking-[0.3em] text-metro-yellow mb-4">
            Who We Are
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-4 relative inline-block">
            <div className="absolute -top-12 -left-12 w-20 h-20 text-electric-blue/40 -rotate-12 hidden md:block">
              <DoodleEye className="w-full h-full" delayIndex={1} />
            </div>
            We write because
            <br />
            we have to.
          </h1>
          <p className="font-body text-lg text-text-muted max-w-lg mx-auto">
            A space for the curious, the creative, and the quietly obsessed with
            words.
          </p>
          <div className="absolute top-20 right-10 w-16 h-16 text-electric-blue/50 rotate-45 hidden md:block">
            <DoodleStar className="w-full h-full" delayIndex={1.5} />
          </div>
          <div className="absolute bottom-10 left-10 w-24 h-24 text-metro-yellow/30 -rotate-12 hidden md:block">
            <DoodleFace className="w-full h-full" delayIndex={2} />
          </div>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-ui text-xs uppercase tracking-[0.3em] text-metro-yellow mb-8">
              Our Mission
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight relative">
              <div className="absolute -top-12 -left-12 w-20 h-20 hidden md:block">
                <DoodleArrow className="w-full h-full -scale-x-100 rotate-45" delayIndex={2} />
              </div>
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
      <section className="py-16 md:py-24 px-6 bg-surface">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-text-primary mb-8">
              Our Story
            </h2>
          </ScrollReveal>
          <div className="space-y-6">
            <ScrollReveal delay={0.1}>
              <p className="font-body text-base md:text-lg text-text-muted leading-[1.9]">
                Ink in Quills started the way most good things do — with a
                conversation that went on too long. A handful of students who
                kept recommending books to each other in the dining hall decided
                that conversations about literature deserved their own time and
                space.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="font-body text-base md:text-lg text-text-muted leading-[1.9]">
                What began as an informal reading circle quickly grew into
                something more ambitious. Members started sharing their own
                writing — nervously at first, then with increasing confidence.
                Open mic nights drew crowds. Workshops filled up. The retreat
                waiting list got longer than the retreat itself.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="font-body text-base md:text-lg text-text-muted leading-[1.9]">
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
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-64 text-electric-blue/10 opacity-50 hidden lg:block pointer-events-none">
          <DoodleSquiggle className="w-full h-full rotate-90" delayIndex={0} />
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
                What We Do
              </h2>
              <div className="gold-line-center" />
            </div>
          </ScrollReveal>

          {/* Mission Image Area */}
          <div className="relative mb-16 max-w-2xl mx-auto">
            <div className="absolute -inset-4 bg-metro-yellow/20 rounded-2xl -rotate-2"></div>
            <div className="relative aspect-square md:aspect-[4/3] w-full bg-surface-elevated rounded-2xl overflow-hidden border border-ink-black shadow-offset">
              <div className="absolute inset-0 bg-ink-black flex items-center justify-center p-8 text-center">
                <p className="font-display text-xl text-text-muted/50 font-bold rotate-[-5deg]">
                  [Insert beautifully chaotic photo of the club in session here]
                </p>
                <div className="absolute top-10 right-10 w-24 h-24 text-electric-blue/40 rotate-12 hidden md:block">
                  <DoodleSpark className="w-full h-full" delayIndex={1.5} />
                </div>
                <div className="absolute bottom-10 left-10 w-32 h-32 text-metro-yellow/30 -rotate-45 hidden md:block">
                  <DoodleSwirl className="w-full h-full" delayIndex={2} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, i) => (
              <ScrollReveal key={activity.title} delay={0.08 * i}>
                <div className="h-full bg-surface-elevated rounded-2xl p-8 border border-ink-black hover:border-metro-yellow/50 shadow-offset hover:shadow-offset-lg hover:-translate-y-1 transition-all duration-300">
                  <span className="text-3xl mb-4 block">{activity.icon}</span>
                  <h3 className="font-display text-lg font-bold text-text-primary mb-2">
                    {activity.title}
                  </h3>
                  <p className="font-body text-sm text-text-muted leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 px-6 bg-ink-black text-text-primary border-t border-text-dim/20">
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
                  <h3 className="font-display text-xl font-bold text-metro-yellow">
                    {item.value}
                  </h3>
                  <p className="font-body text-sm text-text-muted leading-relaxed">
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
