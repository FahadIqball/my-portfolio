"use client";

import { motion } from "framer-motion";
import styles from "./Hero.module.css";

export default function Hero() {
  const statement = "I build web & mobile products that scale";
  
  // Stagger parameters
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <section className={styles.heroSection}>
      <div className={`${styles.container} container`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={styles.introLabel}
        >
          <span className="mono-label">Full-Stack & Mobile Developer</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={styles.name}
        >
          FAHAD IQBAL
        </motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={styles.statementWrapper}
        >
          <h2 className={styles.statement}>
            {statement.split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
            <span className={styles.cursor}>_</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className={styles.subText}
        >
          Adept at bridging clean UI architecture with robust full-stack and mobile systems. 
          Specializing in modern web applications with Next.js, relational backends with Supabase, 
          and high-performance cross-platform mobile apps with React Native.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className={styles.ctaGroup}
        >
          <a href="#projects" className={styles.primaryCta}>
            View my work
          </a>
          <a href="#contact" className={styles.secondaryCta}>
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
