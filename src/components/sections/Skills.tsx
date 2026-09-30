import { skillCategories, mobileFeatures } from "@/data/skills";
import TechIcon from "../ui/TechIcon";
import AnimatedSection from "../ui/AnimatedSection";
import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <AnimatedSection id="skills" className={styles.skillsSection}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="mono-label">04 // Core Stack</span>
          <h2 className={styles.title}>SKILLS & TOOLKIT</h2>
          <div className={styles.line} />
        </div>

        <div className={styles.content}>
          <div className={styles.categoriesGrid}>
            {skillCategories.map((category) => (
              <div key={category.title} className={styles.categoryCard}>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                <div className={styles.iconsGrid}>
                  {category.items.map((item) => (
                    <div key={item.name} className={styles.techItem} title={item.name}>
                      <div className={styles.iconWrapper}>
                        <TechIcon slug={item.iconSlug} size={28} />
                      </div>
                      <span className={styles.techName}>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Features Highlight Box */}
          <div className={styles.featuresSection}>
            <h3 className={styles.featuresTitle}>Mobile Features & Capabilities</h3>
            <div className={styles.featuresGrid}>
              {mobileFeatures.map((feature) => (
                <div key={feature} className={styles.featureItem}>
                  <span className={styles.bullet}>[ ]</span>
                  <span className={styles.featureText}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
