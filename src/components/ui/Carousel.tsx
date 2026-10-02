"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import TechIcon from "@/components/ui/TechIcon";
import { ProjectItem } from "@/data/projects";
import styles from "./Carousel.module.css";

interface CarouselProps {
  items: ProjectItem[];
}

export default function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const activeItem = items[currentIndex];

  // Drag threshold for swiping
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  // Helper to extract clean domain for browser address bar
  const getDisplayDomain = (url?: string, slug?: string) => {
    if (!url) return `${slug}.dev`;
    try {
      return new URL(url).hostname;
    } catch {
      return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    }
  };

  const isWeb = activeItem.deviceType === "web";

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.navHeader}>
        <div className={styles.indexLabel}>
          <span className="mono-label">
            {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
        </div>
        <div className={styles.controls}>
          <button
            onClick={handlePrev}
            className={styles.controlBtn}
            aria-label="Previous Project"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            onClick={handleNext}
            className={styles.controlBtn}
            aria-label="Next Project"
          >
            <ArrowRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className={styles.sliderWrapper}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                handleNext();
              } else if (swipe > swipeConfidenceThreshold) {
                handlePrev();
              }
            }}
            className={`${styles.slideCard} ${isWeb ? styles.webCardLayout : styles.mobileCardLayout}`}
          >
            {isWeb ? (
              /* ========================================================
                 Web Project Showcase: Expansive wide layout with
                 screenshot below details
                 ======================================================== */
              <div className={styles.webContainer}>
                {/* Top Info Header Grid */}
                <div className={styles.webHeaderGrid}>
                  <div className={styles.webTitleBlock}>
                    <div className={styles.categoryBadge}>
                      <span className="mono-label">Full-Stack Web Application</span>
                    </div>
                    <h3 className={styles.projectTitle}>{activeItem.title}</h3>
                    <p className={styles.projectDesc}>{activeItem.description}</p>
                  </div>

                  <div className={styles.webMetaBlock}>
                    <div className={styles.projectDetailsBox}>
                      <span className={styles.detailsHeader}>Focus & Implementation:</span>
                      <p className={styles.projectDetailsText}>{activeItem.details}</p>
                    </div>

                    <div className={styles.techStack}>
                      {activeItem.tech.map((tag) => (
                        <span key={tag} className={styles.techTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Expansive Full-Width Browser Mockup Below Details */}
                <div className={styles.webBrowserWrapper}>
                  <Link
                    href={`/projects/${activeItem.slug}`}
                    className={styles.previewAnchor}
                    aria-label={`View ${activeItem.title} case study`}
                  >
                    <div className={styles.browserMockupWide}>
                      <div className={styles.browserHeader}>
                        <div className={styles.trafficLights}>
                          <span className={`${styles.dot} ${styles.dotRed}`} />
                          <span className={`${styles.dot} ${styles.dotYellow}`} />
                          <span className={`${styles.dot} ${styles.dotGreen}`} />
                        </div>
                        <div className={styles.browserAddressBar}>
                          <span className={styles.lockIcon}>🔒</span>
                          <span className={styles.addressDomain}>
                            {getDisplayDomain(activeItem.live, activeItem.slug)}
                          </span>
                        </div>
                      </div>
                      <div className={styles.browserScreenWide}>
                        <img
                          src={activeItem.image}
                          alt={`${activeItem.title} screenshot`}
                          className={styles.screenshotImage}
                          loading="eager"
                        />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Bottom Action Links */}
                <div className={styles.linksRow}>
                  <Link href={`/projects/${activeItem.slug}`} className={styles.detailLink}>
                    View Case Study →
                  </Link>
                  
                  <div className={styles.externalLinks}>
                    {activeItem.github && (
                      <a
                        href={activeItem.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconLink}
                        aria-label="GitHub Repository"
                      >
                        <TechIcon slug="github" size={18} />
                      </a>
                    )}
                    {activeItem.live && (
                      <a
                        href={activeItem.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconLink}
                        aria-label="Live Demo"
                      >
                        <ExternalLink size={18} strokeWidth={1.5} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* ========================================================
                 Mobile Project Showcase: 2-column on desktop,
                 clean universal smartphone chassis (Android + iOS friendly)
                 ======================================================== */
              <div className={styles.mobileCardGrid}>
                {/* Left Column: Project Details */}
                <div className={styles.cardInfo}>
                  <div>
                    <div className={styles.categoryBadge}>
                      <span className="mono-label">Cross-Platform Mobile App</span>
                    </div>

                    <h3 className={styles.projectTitle}>{activeItem.title}</h3>
                    <p className={styles.projectDesc}>{activeItem.description}</p>

                    {/* Mobile Preview Insertion Point on Small Viewports */}
                    <div className={styles.mobileScreenOnlyPreview}>
                      <Link
                        href={`/projects/${activeItem.slug}`}
                        className={styles.previewAnchor}
                        aria-label={`View ${activeItem.title} case study`}
                      >
                        <div className={styles.universalPhoneMockup}>
                          <div className={styles.universalSpeakerBar} />
                          <div className={styles.universalCameraDot} />
                          <div className={styles.phoneScreen}>
                            <img
                              src={activeItem.image}
                              alt={`${activeItem.title} screenshot`}
                              className={styles.screenshotImage}
                              loading="eager"
                            />
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className={styles.projectDetailsBox}>
                      <span className={styles.detailsHeader}>Focus & Implementation:</span>
                      <p className={styles.projectDetailsText}>{activeItem.details}</p>
                    </div>

                    <div className={styles.techStack}>
                      {activeItem.tech.map((tag) => (
                        <span key={tag} className={styles.techTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.linksRow}>
                    <Link href={`/projects/${activeItem.slug}`} className={styles.detailLink}>
                      View Case Study →
                    </Link>
                    
                    <div className={styles.externalLinks}>
                      {activeItem.github && (
                        <a
                          href={activeItem.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.iconLink}
                          aria-label="GitHub Repository"
                        >
                          <TechIcon slug="github" size={18} />
                        </a>
                      )}
                      {activeItem.live && (
                        <a
                          href={activeItem.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.iconLink}
                          aria-label="Live Demo"
                        >
                          <ExternalLink size={18} strokeWidth={1.5} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: Universal Phone Mockup on Desktop */}
                <div className={styles.desktopPhoneCol}>
                  <Link
                    href={`/projects/${activeItem.slug}`}
                    className={styles.previewAnchor}
                    aria-label={`View ${activeItem.title} case study`}
                  >
                    <div className={styles.universalPhoneMockup}>
                      <div className={styles.universalSpeakerBar} />
                      <div className={styles.universalCameraDot} />
                      <div className={styles.phoneScreen}>
                        <img
                          src={activeItem.image}
                          alt={`${activeItem.title} screenshot`}
                          className={styles.screenshotImage}
                          loading="eager"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.indicators}>
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`${styles.indicatorDot} ${
              index === currentIndex ? styles.activeDot : ""
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
