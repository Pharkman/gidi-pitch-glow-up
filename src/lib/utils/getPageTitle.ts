/**
 * Get page title based on the current route path
 * @param path - The current route path
 * @returns The page title for the current route
 */
export const getPageTitle = (path: string): string => {
  // Map routes to page titles
  const routeTitles: Record<string, string> = {
    "/": "Home",
    "/dashboard": "Dashboard",
    "/signin": "Sign In",
    "/signup": "Sign Up",
    "/verify-email": "Verify Email",
    "/forgot-password": "Forgot Password",
    "/auth/password/reset": "Reset Password",
    "/waitlist": "Join Waitlist",
    "/onboarding": "Onboarding",
    "/onboarding/about-startup": "About Your Startup",
    "/onboarding/shape-startup": "Shape Your Startup",
    "/onboarding/goal_preference": "Goals & Preferences",
    "/pitch-decks": "Pitch Decks",
    "/resume-builder": "Resume Builder",
    "/resume-builder-editor": "Resume Editor",
    "/team-members": "Team Members",
    "/pitch-deck-outline": "Pitch Deck Outline",
    "/pitch-deck-generating": "Generating Pitch Deck",
    "/pitch-deck-editor": "Pitch Deck Editor",
    "/resume-generating": "Generating Resume"
  };
  
  // Return the page title or default to empty string if route not found
  return routeTitles[path] || "Page Not Found";
};