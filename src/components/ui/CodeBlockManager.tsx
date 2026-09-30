"use client";

import { useEffect } from "react";
import styles from "./CodeBlockManager.module.css";

export default function CodeBlockManager() {
  useEffect(() => {
    // Find all <pre> tags in the document/article
    const preElements = document.querySelectorAll("pre");

    preElements.forEach((pre) => {
      // Check if copy button is already added (to avoid double render)
      if (pre.querySelector(`.${styles.copyButton}`)) return;

      // Ensure the pre tag is positioned relatively so the button aligns correctly
      pre.style.position = "relative";

      // Create container wrapper for button
      const button = document.createElement("button");
      button.className = styles.copyButton;
      button.type = "button";
      button.ariaLabel = "Copy code to clipboard";
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
        <span>Copy</span>
      `;

      // Code text extraction
      const codeElement = pre.querySelector("code");
      const codeText = codeElement ? codeElement.innerText : pre.innerText;

      // Click handler
      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(codeText);
          
          // Switch to active Copied state
          button.classList.add(styles.copied);
          button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
            <span>Copied!</span>
          `;

          // Reset button after timeout
          setTimeout(() => {
            button.classList.remove(styles.copied);
            button.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
              <span>Copy</span>
            `;
          }, 2000);
        } catch (err) {
          console.error("Failed to copy code: ", err);
        }
      });

      // Append copy button to the pre element
      pre.appendChild(button);
    });
  }, []);

  return null; // Side effect only component
}
