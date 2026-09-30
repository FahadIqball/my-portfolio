"use client";

import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { experiences } from "@/data/experience";
import AnimatedSection from "../ui/AnimatedSection";
import styles from "./Experience.module.css";

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <AnimatedSection id="experience" className={styles.experienceSection}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="mono-label">02 // Journey</span>
          <h2 className={styles.title}>EXPERIENCE</h2>
          <div className={styles.line} />
        </div>

        <div className={styles.timelineList}>
          {experiences.map((exp, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div
                key={`${exp.company}-${exp.role}`}
                className={`${styles.card} ${isExpanded ? styles.expanded : ""}`}
              >
                <button
                  className={styles.cardHeader}
                  onClick={() => toggleExpand(idx)}
                  aria-expanded={isExpanded}
                >
                  <div className={styles.headerInfo}>
                    <h3 className={styles.roleCompany}>
                      <span className={styles.role}>{exp.role}</span>
                      <span className={styles.divider}>@</span>
                      <span className={styles.company}>{exp.company}</span>
                    </h3>
                    <span className={styles.period}>{exp.period}</span>
                  </div>
                  <div className={`${styles.chevron} ${isExpanded ? styles.rotate : ""}`}>
                    <ChevronDown size={20} strokeWidth={1.5} />
                  </div>
                </button>

                <div className={`${styles.cardContent} ${isExpanded ? styles.contentOpen : ""}`}>
                  <div className={styles.contentInner}>
                    <div className={styles.location}>
                      <MapPin size={14} strokeWidth={1.5} />
                      <span>{exp.location}</span>
                    </div>
                    <ul className={styles.bullets}>
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className={styles.bulletItem}>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
