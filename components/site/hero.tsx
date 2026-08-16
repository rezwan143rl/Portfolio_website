'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero({ headline, subline }: { headline: string; subline: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-blueprint-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/70 to-bg" />
      <div className="relative mx-auto max-w-5xl px-6 py-28 md:py-36">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 font-mono text-xs uppercase tracking-widest text-signal"
        >
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-signal align-middle" />
          building · learning · shipping
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl text-4xl font-medium leading-tight text-text md:text-6xl"
        >
          {headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-xl text-base text-muted md:text-lg"
        >
          {subline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Button asChild size="lg">
            <Link href="/projects">Explore my work</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/resume">View resume</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
