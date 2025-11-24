import { useEffect } from 'react';

/**
 * A custom hook to update the document title
 * @param title - The title to set for the current page
 * @param suffix - Optional suffix to append to the title (defaults to "GidiPitch")
 */
export const useDocumentTitle = (title: string, suffix: string = "Decklo") => {
  useEffect(() => {
    // Create the full title with the suffix
    const fullTitle = title ? `${title} | ${suffix}` : `${suffix} - Build Your Investor Pitch in Minutes`;
    
    // Update the document title
    document.title = fullTitle;
    
    // Also update the Open Graph title for better social sharing
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', fullTitle);
    }
    
    // Cleanup function to reset title when component unmounts (optional)
    return () => {
      document.title = `${suffix} - Build Your Investor Pitch in Minutes`;
    };
  }, [title, suffix]);
};

export default useDocumentTitle;