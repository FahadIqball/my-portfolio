import { skillCategories, coreCapabilities } from "@/data/skills";
import TechIcon from "../ui/TechIcon";
import AnimatedSection from "../ui/AnimatedSection";
import { Globe, Database, Bell, Zap, Smartphone, CreditCard } from "lucide-react";
import styles from "./Skills.module.css";

const iconMap = {
  globe: Globe,
  database: Database,
  bell: Bell,
  zap: Zap,
  smartphone: Smartphone,
  "credit-card": CreditCard,
};

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

          {/* Web & Mobile Capabilities Highlight Box */}
          <div className={styles.featuresSection}>
            <div className={styles.featuresHeader}>
              <span className="mono-label">ARCHITECTURAL HIGHLIGHTS</span>
              <h3 className={styles.featuresTitle}>Web & Mobile Capabilities</h3>
            </div>
            
            <div className={styles.featuresGrid}>
              {coreCapabilities.map((item) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <div key={item.title} className={styles.featureItem}>
                    <div className={styles.iconBadge}>
                      <IconComponent size={16} strokeWidth={2} />
                    </div>
                    <span className={styles.featureText}>{item.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
