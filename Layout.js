import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";
import { Home, Gamepad2, Search, Users, Users2, Trophy, BookOpen, Info, MessageSquare, Zap, Activity, X, Rocket } from "lucide-react";
import { User, Message, MatchRequest, CallOut } from "@/entities/all";
import DynamicBackground from "@/components/common/DynamicBackground";
import SplashScreen from "@/components/common/SplashScreen";
import { cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const CURRENT_APP_VERSION = "1.0.0";

const navigationItems = [
  { title: "Discover", icon: Search, url: createPageUrl("Discover"), notificationKey: 'discover' },
  { title: "Matches", icon: Users2, url: createPageUrl("Matches"), notificationKey: 'matches' },
  { title: "Call Outs", icon: Zap, url: createPageUrl("CallOuts"), notificationKey: 'challenges' },
  { title: "Team Up", icon: Users, url: createPageUrl("TeamUp"), notificationKey: 'teams' },
  { title: "Activity Feed", icon: Activity, url: createPageUrl("ActivityFeed"), notificationKey: 'feed' },
  { title: "Messages", icon: MessageSquare, url: createPageUrl("Messages"), notificationKey: 'messages' },
  { title: "Home", icon: Home, url: createPageUrl("NewsFeed") },
  { title: "My Profile", icon: Gamepad2, url: createPageUrl("Profile") },
  { title: "Creator Program", icon: Rocket, url: createPageUrl("CreatorPartnerships") },
  { title: "Play Dates", icon: Trophy, url: createPageUrl("PlayDates") },
  { title: "Game Database", icon: BookOpen, url: createPageUrl("GameDatabase") },
  { title: "How To", icon: Info, url: createPageUrl("HowTo") },
];

const adminNavigationItems = [
    { title: "Game Management", icon: Gamepad2, url: createPageUrl("GameManagement") }
];

const mobileBottomNavItems = [
  { title: "Discover", icon: Search, url: createPageUrl("Discover") },
  { title: "Matches", icon: Users2, url: createPageUrl("Matches"), notificationKey: 'matches' },
  { title: "Team Up", icon: Users, url: createPageUrl("TeamUp") },
  { title: "Feed", icon: Activity, url: createPageUrl("ActivityFeed") },
  { title: "Profile", icon: Gamepad2, url: createPageUrl("Profile") },
  { title: "Messages", icon: MessageSquare, url: createPageUrl("Messages"), notificationKey: 'messages' },
];

const footerLinks = [
  { title: "Terms of Service", page: "Terms" },
  { title: "Privacy Policy", page: "Privacy" },
  { title: "Cookie Policy", page: "CookiePolicy" },
  { title: "Legal Notice", page: "LegalNotice" },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [notifications, setNotifications] = useState({ messages: 0, matches: 0, challenges: 0, teams: 0 });
  const [showTestBanner, setShowTestBanner] = useState(true);
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);
  const [linkedAccounts, setLinkedAccounts] = useState([]);

  // Enhanced SEO Meta Tags
  useEffect(() => {
    const updateSEO = () => {
      const pageName = location.pathname.split('/').pop() || 'NewsFeed';
      
      const seoData = {
        'Discover': {
          title: 'Find Your Perfect Gaming Partner | NEW+GAME - Top Ten Matching System™',
          description: 'Discover gaming partners using our revolutionary Top Ten Matching System™. Connect with players who share your current gaming obsessions. Free gaming matchmaking platform.',
          keywords: 'gaming partners, gaming matchmaking, find gaming friends, gaming community, multiplayer gaming, gaming teams, TOP TEN MATCHING SYSTEM, gaming partnerships, player matching',
          canonical: createPageUrl("Discover")
        },
        'Matches': {
          title: 'Gaming Partners & Matches | NEW+GAME Matchmaking Platform',
          description: 'Manage your gaming partnerships and connect with matched players. Schedule gaming sessions, send messages, and build lasting gaming friendships.',
          keywords: 'gaming matches, gaming partnerships, gaming friends, player connections, gaming sessions',
          canonical: createPageUrl("Matches")
        },
        'TeamUp': {
          title: 'Create Gaming Teams & Squads | NEW+GAME Team Builder',
          description: 'Build the ultimate gaming squad! Create teams, find teammates, and dominate your favorite games together. Advanced team formation tools.',
          keywords: 'gaming teams, gaming squads, team builder, find teammates, gaming clans, competitive gaming',
          canonical: createPageUrl("TeamUp")
        },
        'CallOuts': {
          title: 'Gaming Challenges & Call Outs | NEW+GAME Dueling Platform',
          description: 'Challenge other gamers to instant duels and prove your skills. Accept challenges, compete in tournaments, and climb the leaderboards.',
          keywords: 'gaming challenges, gaming duels, call outs, competitive gaming, gaming tournaments, 1v1 gaming',
          canonical: createPageUrl("CallOuts")
        },
        'ActivityFeed': {
          title: 'Gaming Activity Feed | NEW+GAME Community Hub',
          description: 'Stay connected with the gaming community. Follow gaming updates, achievements, and connect with like-minded players worldwide.',
          keywords: 'gaming community, gaming social network, gaming activity, player updates, gaming achievements',
          canonical: createPageUrl("ActivityFeed")
        },
        'GameDatabase': {
          title: 'Universal Game Database | NEW+GAME Complete Gaming Library',
          description: 'Comprehensive database of games across all platforms. PC, PlayStation, Xbox, Nintendo, Mobile, VR - find and track every game you love.',
          keywords: 'game database, gaming library, all gaming platforms, PC games, console games, mobile games, VR games',
          canonical: createPageUrl("GameDatabase")
        },
        'Profile': {
          title: 'Gaming Profile & Statistics | NEW+GAME Player Profiles',
          description: 'Create your ultimate gaming profile. Showcase your skills, track gaming hours, manage your Top Ten List, and connect with compatible players.',
          keywords: 'gaming profile, gaming statistics, player profile, gaming achievements, skill tracking',
          canonical: createPageUrl("Profile")
        },
        'NewsFeed': {
          title: 'NEW+GAME - Revolutionary Gaming Partnership Platform | Find Your Player 2',
          description: 'NEW+GAME is the ultimate gaming partnership platform. Find your perfect Player 2 using our proprietary Top Ten Matching System™. Connect with gamers who share your current favorite games. Free to join!',
          keywords: 'gaming partners, gaming matchmaking, find gaming friends, gaming community, multiplayer gaming, gaming teams, TOP TEN MATCHING SYSTEM, gaming partnerships, player matching, gaming platform, find player 2, gaming social network',
          canonical: '/'
        },
        'CreatorPartnerships': {
          title: 'Creator Program | NEW+GAME Partner with Us',
          description: 'Join the NEW+GAME Creator Program. Partner with us to grow your gaming community, access exclusive features, and collaborate with other creators.',
          keywords: 'creator program, gaming creators, gaming partnerships, content creation, stream integration',
          canonical: createPageUrl("CreatorPartnerships")
        },
        'PlayDates': {
          title: 'Play Dates | Organize Gaming Sessions with NEW+GAME',
          description: 'Schedule and organize gaming sessions with your matches and friends using NEW+GAME Play Dates. Never miss a game with coordinated schedules.',
          keywords: 'play dates, gaming sessions, schedule games, organize multiplayer, gaming events',
          canonical: createPageUrl("PlayDates")
        },
        'HowTo': {
          title: 'How NEW+GAME Works | Get Started with Gaming Matchmaking',
          description: 'Learn how to use NEW+GAME\'s Top Ten Matching System™ to find your perfect gaming partners. Step-by-step guides and tips for an optimal experience.',
          keywords: 'how to newgame, newgame guide, getting started gaming, gaming matchmaking tutorial, how the top ten matching system works',
          canonical: createPageUrl("HowTo")
        },
        'Messages': {
          title: 'Messages | Connect with Gamers on NEW+GAME',
          description: 'Send and receive messages with your gaming partners, teammates, and friends on NEW+GAME. Private and group chats for seamless communication.',
          keywords: 'gaming messages, gamer chat, private messaging, group chat gaming, newgame communication',
          canonical: createPageUrl("Messages")
        },
        'Terms': {
          title: 'Terms of Service | NEW+GAME',
          description: 'Read the Terms of Service for NEW+GAME. Understand your rights and responsibilities when using our gaming partnership platform.',
          keywords: 'terms of service, legal, newgame terms, user agreement',
          canonical: createPageUrl("Terms")
        },
        'Privacy': {
          title: 'Privacy Policy | NEW+GAME',
          description: 'Review the Privacy Policy for NEW+GAME. Learn how we collect, use, and protect your personal information.',
          keywords: 'privacy policy, data protection, newgame privacy, personal data',
          canonical: createPageUrl("Privacy")
        },
        'CookiePolicy': {
          title: 'Cookie Policy | NEW+GAME',
          description: 'Understand how NEW+GAME uses cookies and similar technologies on our website.',
          keywords: 'cookie policy, cookies, newgame cookies, data usage',
          canonical: createPageUrl("CookiePolicy")
        },
        'LegalNotice': {
          title: 'Legal Notice | NEW+GAME',
          description: 'Important legal information and notices regarding the NEW+GAME platform.',
          keywords: 'legal notice, copyright, disclaimer, newgame legal',
          canonical: createPageUrl("LegalNotice")
        }
      };

      const currentSEO = seoData[pageName] || seoData['NewsFeed'];
      
      // Update page title
      document.title = currentSEO.title;
      
      // Update or create meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = currentSEO.description;

      // Update or create keywords meta tag
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = currentSEO.keywords;

      // Canonical URL
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = `${window.location.origin}${currentSEO.canonical}`;

      // Enhanced Open Graph tags
      const updateOrCreateMeta = (property, content) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.property = property;
          document.head.appendChild(meta);
        }
        meta.content = content;
      };

      updateOrCreateMeta('og:title', currentSEO.title);
      updateOrCreateMeta('og:description', currentSEO.description);
      updateOrCreateMeta('og:type', 'website');
      updateOrCreateMeta('og:url', window.location.href);
      updateOrCreateMeta('og:site_name', 'NEW+GAME');
      updateOrCreateMeta('og:locale', 'en_US');
      updateOrCreateMeta('og:image', 'https://newgameplus.app/og-image.jpg'); // Generic OG image

      // Twitter Card tags
      const updateOrCreateTwitterMeta = (name, content) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = name;
          document.head.appendChild(meta);
        }
        meta.content = content;
      };

      updateOrCreateTwitterMeta('twitter:card', 'summary_large_image');
      updateOrCreateTwitterMeta('twitter:title', currentSEO.title);
      updateOrCreateTwitterMeta('twitter:description', currentSEO.description);
      updateOrCreateTwitterMeta('twitter:site', '@newplusgame');
      updateOrCreateTwitterMeta('twitter:creator', '@newplusgame');
      updateOrCreateTwitterMeta('twitter:image', 'https://newgameplus.app/twitter-image.jpg'); // Generic Twitter image

      // Additional SEO meta tags
      updateOrCreateTwitterMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      updateOrCreateTwitterMeta('author', 'NEW+GAME Team');
      updateOrCreateTwitterMeta('viewport', 'width=device-width, initial-scale=1.0');
      updateOrCreateTwitterMeta('theme-color', '#9333ea');
    };

    updateSEO();
  }, [location.pathname]);

  useEffect(() => {
    // Check for new app version
    const storedVersion = localStorage.getItem('app_version');
    if (storedVersion && storedVersion !== CURRENT_APP_VERSION) {
      toast.info('🚀 New Version Available!', {
        description: 'Update now to get the latest features and improvements for NEW+GAME.',
        action: {
          label: 'Update & Reload',
          onClick: () => {
            localStorage.setItem('app_version', CURRENT_APP_VERSION);
            window.location.reload(true);
          },
        },
        duration: Infinity,
        dismissible: true,
      });
    } else if (!storedVersion) {
      localStorage.setItem('app_version', CURRENT_APP_VERSION);
    }
  }, []);

  useEffect(() => {
    const loadUserAndNotifications = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
        
        if (currentUser) {
          const [unreadMessages, pendingRequests, pendingCallOuts] = await Promise.all([
            Message.filter({ receiver_id: currentUser.id, is_read: false }),
            MatchRequest.filter({ requested_id: currentUser.id, status: 'pending' }),
            CallOut.filter({ receiver_id: currentUser.id, status: 'pending' })
          ]);
          setNotifications({
            messages: unreadMessages.length,
            matches: pendingRequests.length,
            challenges: pendingCallOuts.length,
            teams: 0,
          });
        }

        const accounts = JSON.parse(localStorage.getItem('linked_accounts') || '[]');
        setLinkedAccounts(accounts);
      } catch (error) {
        console.log("No authenticated user, skipping notifications.");
        setNotifications({ messages: 0, matches: 0, challenges: 0, teams: 0 });
      } finally {
        setIsLoading(false);
      }
    };

    loadUserAndNotifications();
    const intervalId = setInterval(loadUserAndNotifications, 30000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const hidden = localStorage.getItem('hide_test_banner') === '1';
    setShowTestBanner(!hidden);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const dismissTestBanner = () => {
    setShowTestBanner(false);
    localStorage.setItem('hide_test_banner', '1');
  };

  const switchToAccount = async (accountEmail) => {
    try {
      await User.loginWithRedirect(window.location.href);
      toast.success(`Switching to ${accountEmail}...`);
    } catch (error) {
      toast.error("Failed to switch accounts");
    }
  };

  if (showSplash) {
    return (
      <SplashScreen onComplete={handleSplashComplete} />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-gray-200">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        .matrix-font {
          font-family: 'Orbitron', monospace;
        }

        body {
          font-family: 'Orbitron', monospace;
          overflow-x: hidden;
          background-color: #020617;
        }

        /* Z-Index Hierarchy - FIXED */
        .z-background { z-index: 0; }
        .z-content { z-index: 10; }
        .z-sidebar { z-index: 50; }
        .z-titles { z-index: 100; }
        .z-dropdowns { z-index: 500; }
        .z-modals { z-index: 1000; }
        .z-tooltips { z-index: 2000; }
        .z-toasts { z-index: 9999; }
        .z-footer { z-index: 5; } /* Footer should be BELOW content */

        .page-title {
          position: relative;
          z-index: 100 !important;
        }

        .card-title {
          position: relative;
          z-index: 20 !important;
        }

        /* Custom Glowing Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #020617;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #00FF41);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #a78bfa, #00FF41);
        }

        /* Glow effects */
        .glow-purple {
          box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
        }
        .glow-green {
          box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
        }
        .glow-red {
          box-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
        }
        .glow-purple-text {
          text-shadow: 0 0 8px rgba(147, 51, 234, 0.5);
        }
        .glow-green-text {
          text-shadow: 0 0 8px rgba(0, 255, 65, 0.5);
        }
        .glow-red-text {
          text-shadow: 0 0 8px rgba(255, 0, 0, 0.5);
        }

        /* NEON LIGHT EFFECTS */
        .neon-border-purple {
          border: 2px solid #9D4EDD;
          box-shadow: 
            0 0 5px #9D4EDD,
            0 0 10px #9D4EDD,
            0 0 15px #9D4EDD,
            0 0 20px #9D4EDD,
            inset 0 0 5px rgba(157, 78, 221, 0.1);
          animation: neonPulsePurple 2s ease-in-out infinite alternate;
        }

        .neon-border-green {
          border: 2px solid #00FF41;
          box-shadow: 
            0 0 5px #00FF41,
            0 0 10px #00FF41,
            0 0 15px #00FF41,
            0 0 20px #00FF41,
            inset 0 0 5px rgba(0, 255, 65, 0.1);
          animation: neonPulseGreen 2.5s ease-in-out infinite alternate;
        }

        .neon-border-pink {
          border: 2px solid #FF10F0;
          box-shadow: 
            0 0 5px #FF10F0,
            0 0 10px #FF10F0,
            0 0 15px #FF10F0,
            0 0 20px #FF10F0,
            inset 0 0 5px rgba(255, 16, 240, 0.1);
          animation: neonPulsePink 3s ease-in-out infinite alternate;
        }

        .neon-text-purple {
          color: #C77DFF;
          text-shadow: 
            0 0 5px #9D4EDD,
            0 0 10px #9D4EDD,
            0 0 15px #9D4EDD;
        }

        .neon-text-green {
          color: #39FF14;
          text-shadow: 
            0 0 5px #00FF41,
            0 0 10px #00FF41,
            0 0 15px #00FF41;
        }

        .neon-text-orange {
          color: #ff9500;
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          text-shadow: 
            0 0 7px rgba(255, 149, 0, 0.8),
            0 0 10px rgba(255, 149, 0, 0.6),
            0 0 21px rgba(255, 149, 0, 0.4);
        }

        .neon-text-pink {
          color: #FF69B4;
          text-shadow: 
            0 0 5px #FF10F0,
            0 0 10px #FF10F0,
            0 0 15px #FF10F0;
        }

        /* NEON ANIMATIONS */
        @keyframes neonPulsePurple {
          from {
            box-shadow: 
              0 0 5px #9D4EDD,
              0 0 10px #9D4EDD,
              0 0 15px #9D4EDD,
              0 0 20px #9D4EDD,
              inset 0 0 5px rgba(157, 78, 221, 0.1);
          }
          to {
            box-shadow: 
              0 0 10px #9D4EDD,
              0 0 20px #9D4EDD,
              0 0 30px #9D4EDD,
              0 0 40px #9D4EDD,
              inset 0 0 10px rgba(157, 78, 221, 0.2);
          }
        }

        @keyframes neonPulseGreen {
          from {
            box-shadow: 
              0 0 5px #00FF41,
              0 0 10px #00FF41,
              0 0 15px #00FF41,
              0 0 20px #00FF41,
              inset 0 0 5px rgba(0, 255, 65, 0.1);
          }
          to {
            box-shadow: 
              0 0 10px #00FF41,
              0 0 20px #00FF41,
              0 0 30px #00FF41,
              0 0 40px #00FF41,
              inset 0 0 10px rgba(0, 255, 65, 0.2);
          }
        }

        @keyframes neonPulsePink {
          from {
            box-shadow: 
              0 0 5px #FF10F0,
              0 0 10px #FF10F0,
              0 0 15px #FF10F0,
              0 0 20px #FF10F0,
              inset 0 0 5px rgba(255, 16, 240, 0.1);
          }
          to {
            box-shadow: 
              0 0 10px #FF10F0,
              0 0 20px #FF10F0,
              0 0 30px #FF10F0,
              0 0 40px #FF10F0,
              inset 0 0 10px rgba(255, 16, 240, 0.2);
          }
        }

        /* Apply neon effects to cards */
        .card-neon-purple {
          background: rgba(157, 78, 221, 0.05);
          backdrop-filter: blur(10px);
        }
        
        .card-neon-green {
          background: rgba(0, 255, 65, 0.05);
          backdrop-filter: blur(10px);
        }
        
        .card-neon-pink {
          background: rgba(255, 16, 240, 0.05);
          backdrop-filter: blur(10px);
        }
      `}</style>

      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <Sidebar className="border-r border-purple-700/20 bg-slate-900/50 backdrop-blur-lg hidden md:flex z-sidebar">
            <SidebarHeader className="border-b border-purple-700/20 p-6">
              <div className="text-center">
                <h1 className="matrix-font font-black text-2xl tracking-wider mb-1 flex items-center justify-center relative">
                  <span className="text-purple-400">NEW</span>
                  <span className="text-[#00FF41] text-6xl font-black mx-[-0.2em] relative animate-pulse" style={{ top: '-0.1em', textShadow: '0 0 20px rgba(0,255,65,0.8)' }}>+</span>
                  <span className="text-purple-400">GAME</span>
                </h1>
                <p className="matrix-font text-xs font-semibold tracking-widest uppercase">
                  Your <span className="text-purple-300">New Game</span> <span className="text-purple-400 font-bold">Plus</span> for finding Player 2
                </p>
                
                <div className="mt-2 text-center">
                  <div className="inline-block bg-gradient-to-r from-purple-600/20 to-[#00FF41]/20 border border-[#00FF41]/30 rounded-full px-3 py-1">
                    <span className="text-[10px] font-bold tracking-wider">
                      <span className="text-purple-300">TOP TEN</span>
                      <span className="text-[#00FF41] mx-1">MATCHING</span>
                      <span className="text-purple-300">SYSTEM™</span>
                    </span>
                  </div>
                  <div className="text-[8px] text-red-400/80 mt-1 font-semibold glow-red-text">
                    PATENT PENDING MATCHING TECHNOLOGY
                  </div>
                </div>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <SidebarMenu>
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.url || (item.url !== createPageUrl("NewsFeed") && location.pathname.startsWith(item.url));
                  const notifCount = item.notificationKey ? notifications[item.notificationKey] : 0;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          "hover:bg-[#00FF41]/10 transition-all duration-200 group",
                          isActive ? "bg-[#00FF41]/20 border-l-2 border-[#00FF41]" : "border-l-2 border-transparent"
                        )}
                      >
                        <Link to={item.url} className="flex items-center justify-between gap-3 px-3 py-3 w-full">
                          <div className="flex items-center gap-3">
                            <item.icon className={cn(
                              "w-5 h-5 text-purple-300 group-hover:text-[#00FF41] transition-colors",
                              isActive && "text-[#00FF41]"
                            )} />
                            <span className={cn(
                              "matrix-font font-medium text-purple-300 group-hover:text-white transition-all",
                              isActive && "text-white glow-green-text"
                            )}>
                              {item.title}
                            </span>
                          </div>
                          {notifCount > 0 && (
                            <Badge className="bg-red-500 text-white h-5 w-5 flex items-center justify-center p-0">{notifCount}</Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>

              {user?.role === 'admin' && (
                <div className="px-3 pt-4">
                  <h3 className="px-3 text-xs font-semibold uppercase text-purple-400 mb-2">Admin Tools</h3>
                  <SidebarMenu>
                    {adminNavigationItems.map((item) => {
                      const isActive = location.pathname === item.url;
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            className={cn(
                              "hover:bg-red-900/30 transition-all duration-200 group",
                              isActive ? "bg-red-500/20 border-l-2 border-red-500" : "border-l-2 border-transparent"
                            )}
                          >
                            <Link to={item.url} className="flex items-center gap-3 px-3 py-3">
                              <item.icon className={cn(
                                "w-5 h-5 text-red-400 group-hover:text-white transition-colors",
                                isActive && "text-red-300"
                              )} />
                              <span className={cn(
                                "matrix-font font-medium text-red-300 group-hover:text-white group-hover:text-shadow-none transition-all",
                                isActive && "glow-red-text"
                              )}>
                                {item.title}
                              </span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>
                </div>
              )}

              <div className="mt-auto p-4">
                {user ? (
                  <div className="bg-[#00FF41]/10 rounded-lg p-4 border border-[#00FF41]/30 transition-all shadow-lg shadow-transparent hover:shadow-[#00FF41]/20">
                    <p className="matrix-font text-sm text-[#00FF41] mb-2">Logged in as:</p>
                    <p className="matrix-font font-bold text-white text-sm">{user.display_name || user.full_name}</p>
                    
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowAccountSwitcher(!showAccountSwitcher)}
                        className="flex-1 text-xs border-[#00FF41]/50 text-[#00FF41] hover:bg-[#00FF41]/10"
                      >
                        Switch Account
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => User.logout()}
                        className="flex-1 text-xs border-red-500/50 text-red-300 hover:bg-red-600/10"
                      >
                        Logout
                      </Button>
                    </div>

                    {showAccountSwitcher && (
                      <div className="mt-3 p-2 bg-slate-800/50 rounded border border-purple-500/30">
                        <p className="text-xs text-purple-300 mb-2">Account Management:</p>
                        <div className="space-y-1">
                          {linkedAccounts.length > 0 && (
                            <div className="border-b border-purple-500/20 pb-2 mb-2">
                              {linkedAccounts.map((account, index) => (
                                <Button
                                  key={index}
                                  size="sm"
                                  variant="ghost"
                                  className="w-full justify-start text-xs text-left"
                                  onClick={() => switchToAccount(account.email)}
                                >
                                  Switch to <span className="font-semibold ml-1">{account.email}</span>
                                </Button>
                              ))}
                            </div>
                          )}
                          <Button size="sm" variant="ghost" className="w-full justify-start text-xs" onClick={() => toast.info("Feature coming soon!")}>
                            Add Another Account
                          </Button>
                          <Button size="sm" variant="ghost" className="w-full justify-start text-xs" onClick={() => toast.info("Contact support to merge accounts")}>
                            Merge Accounts
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      onClick={() => User.login()}
                      className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white matrix-font font-bold shadow-lg shadow-purple-500/20"
                    >
                      Sign In
                    </Button>
                  </div>
                )}
              </div>
            </SidebarContent>
          </Sidebar>

          <div className="flex-1 flex flex-col min-h-screen relative">
            <DynamicBackground />

            <main className="flex-1 relative z-content pb-24 md:pb-6">
              {showTestBanner && (
                <div className="sticky top-0 w-full z-titles">
                  <div className="mx-auto max-w-7xl px-4 py-2 my-2 rounded-lg border border-yellow-400/40 bg-yellow-500/10 text-yellow-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-yellow-300" />
                      <span className="text-xs sm:text-sm">
                        Test Version: This is a testing version of NEW+GAME. Features may change and data may be reset.
                      </span>
                    </div>
                    <button onClick={dismissTestBanner} className="p-1 text-yellow-300 hover:text-white" aria-label="Dismiss test version banner">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {children}
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-xl border-t border-purple-800/30 z-sidebar">
              <div className="flex items-center justify-around py-2">
                {mobileBottomNavItems.map((item) => {
                    const isActive = location.pathname === item.url;
                    const notifCount = item.notificationKey ? notifications[item.notificationKey] : 0;
                    return (
                        <Link
                            key={item.title}
                            to={item.url}
                            className="flex flex-col items-center p-2 text-purple-400 hover:text-white transition-colors relative"
                        >
                            {notifCount > 0 && (
                              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white h-4 w-4 text-xs flex items-center justify-center p-0">{notifCount}</Badge>
                            )}
                            <item.icon className={cn("w-5 h-5 mb-1", isActive && "text-[#00FF41]")} />
                            <span className={cn("matrix-font text-xs font-medium", isActive && "text-[#00FF41]")}>{item.title}</span>
                        </Link>
                    )
                })}
              </div>
            </div>

            {/* Compact Footer - FIXED Z-INDEX */}
            <footer className="relative z-footer mt-auto p-4 text-center text-purple-400/70 text-xs border-t border-purple-800/20 bg-slate-950/80 backdrop-blur-sm">
              <div className="flex justify-center flex-wrap gap-3 mb-3">
                {footerLinks.map((link, index) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    className={cn(
                      "transition-colors duration-300 font-medium hover:scale-105 text-xs",
                      index % 2 === 0
                        ? "text-[#00FF41]/70 hover:text-[#00FF41]"
                        : "text-purple-400/70 hover:text-purple-300"
                    )}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              
              <div className="text-center space-y-1">
                <p className="matrix-font text-xs">
                  <span className="text-purple-400">&copy; {new Date().getFullYear()}</span>
                  <span className="text-[#00FF41]"> NEW</span>
                  <span className="text-[#00FF41] font-black mx-[-0.05em]">+</span>
                  <span className="text-purple-400">GAME</span>
                  <span className="text-red-400">™</span>
                  <span className="text-purple-400">. All Rights Reserved.</span>
                </p>
                <p className="text-purple-300/60 text-xs">
                  Powered by <strong className="text-[#00FF41]">Top Ten Matching System™</strong> • <strong className="text-red-400 glow-red-text">Patent Pending</strong>
                </p>
              </div>
            </footer>
          </div>
        </div>
      </SidebarProvider>

      {/* Enhanced Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "NEW+GAME",
          "alternateName": "NEW PLUS GAME",
          "description": "Revolutionary gaming partnership platform using the patent-pending Top Ten Matching System™ to connect gamers with their perfect Player 2. Find gaming partners who share your current favorite games.",
          "url": "https://newgameplus.app",
          "applicationCategory": "GameApplication",
          "applicationSubCategory": "Social Gaming Platform",
          "operatingSystem": "Web Browser",
          "browserRequirements": "Modern web browser with JavaScript enabled",
          "softwareVersion": CURRENT_APP_VERSION,
          "dateCreated": "2024-01-01",
          "creator": {
            "@type": "Organization",
            "name": "NEW+GAME Team",
            "url": "https://newgameplus.app"
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "150",
            "bestRating": "5"
          },
          "featureList": [
            "Top Ten Matching System™",
            "Gaming Partnership Matching", 
            "Team Formation Tools",
            "Gaming Challenges & Call Outs",
            "Activity Feed & Community",
            "Messaging System",
            "Universal Game Database",
            "Cross-Platform Support",
            "Gaming Profile Management",
            "Skill-Based Matching"
          ],
          "applicationSuite": "NEW+GAME Gaming Platform",
          "downloadUrl": "https://newgameplus.app",
          "installUrl": "https://newgameplus.app",
          "screenshot": [
            "https://newgameplus.app/screenshots/discover.jpg",
            "https://newgameplus.app/screenshots/matching.jpg",
            "https://newgameplus.app/screenshots/teams.jpg"
          ],
          "video": {
            "@type": "VideoObject",
            "name": "How NEW+GAME Works",
            "description": "Learn how our Top Ten Matching System™ connects you with perfect gaming partners",
            "uploadDate": "2024-01-01",
            "contentUrl": "https://newgameplus.app/videos/how-it-works.mp4",
            "thumbnailUrl": "https://newgameplus.app/videos/how-it-works-thumbnail.jpg"
          },
          "sameAs": [
            "https://twitter.com/newplusgame",
            "https://discord.gg/newplusgame",
            "https://youtube.com/@newplusgame"
          ]
        })}
      </script>

      {/* Gaming Industry Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "NEW+GAME Top Ten Matching System™",
          "applicationCategory": "GamingSocialNetwork",
          "operatingSystem": "Web, iOS, Android",
          "url": "https://newgameplus.app",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "150"
          },
          "publisher": {
            "@type": "Organization",
            "name": "NEW+GAME Team"
          }
        })}
      </script>

      {/* FAQ Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the Top Ten Matching System™?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Top Ten Matching System™ is our proprietary algorithm that matches gamers based on their current favorite games (1-10 games), hours played, and skill levels. Unlike traditional matching that looks at entire gaming history, TTMS focuses on what you're actively passionate about right now. This ensures you're always connecting with players who share your current gaming obsessions."
              }
            },
            {
              "@type": "Question", 
              "name": "How does NEW+GAME help me find gaming partners?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "NEW+GAME analyzes your Top Ten List of current favorite games, compares it with other players' lists, and finds people with shared gaming interests, similar play time, and compatible skill levels. This creates perfect gaming partnerships, making it easy to find your Player 2 for any game."
              }
            },
            {
              "@type": "Question",
              "name": "Is NEW+GAME free to use?",
              "acceptedAnswer": {
                "@type": "Answer", 
                "text": "Yes! NEW+GAME is completely free to use. Create your profile, build your Top Ten List, find gaming partners, join teams, and participate in challenges - all at no cost. Our mission is to make finding your ideal gaming partner accessible to everyone."
              }
            },
            {
              "@type": "Question",
              "name": "What games are supported on NEW+GAME?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "NEW+GAME supports a comprehensive database of games across all major platforms including PC, PlayStation, Xbox, Nintendo, Mobile, and VR. You can find and add any game to your Top Ten List, from AAA titles to indie gems."
              }
            },
            {
              "@type": "Question",
              "name": "Can I form teams with other players?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely! NEW+GAME offers robust 'Team Up' features, allowing you to create and join gaming teams or clans. Find teammates with complementary skills and communication styles to dominate your favorite multiplayer games."
              }
            }
          ]
        })}
      </script>

      {/* Organization Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "NEW+GAME",
          "url": "https://newgameplus.app",
          "logo": "https://newgameplus.app/logo.png",
          "description": "Revolutionary gaming partnership platform with proprietary Top Ten Matching System™ to help gamers find their perfect Player 2.",
          "foundingDate": "2024",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-800-N-GAME-PLUS",
            "contactType": "customer service",
            "email": "support@newgameplus.app"
          },
          "sameAs": [
            "https://twitter.com/newplusgame",
            "https://discord.gg/newplusgame",
            "https://facebook.com/newgameplus",
            "https://instagram.com/newgameplus_app",
            "https://youtube.com/@newgameplus"
          ]
        })}
      </script>
    </div>
  );
