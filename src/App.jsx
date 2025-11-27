import React, { useState, useEffect, useRef } from 'react';
import {
    Dumbbell,
    Utensils,
    Users,
    Zap,
    ChevronRight,
    Menu,
    X,
    Play,
    CheckCircle,
    Instagram,
    Facebook,
    Linkedin,
    Mail,
    MessageCircle,
    MapPin,
    Globe,
    Clock,
    Star,
    Trophy,
    Gift,
    AlertCircle,
    Flame,
    ArrowRight,
    Smartphone // Added Smartphone icon
} from 'lucide-react';

// --- Custom Hooks & Wrappers for Scroll Effects ---

// Hook for Parallax
const useParallax = (speed = 0.1) => {
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        const handleScroll = () => requestAnimationFrame(() => setOffset(window.pageYOffset * speed));
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);
    return offset;
};

// Component: Reveal on Scroll (Fade Up)
const RevealOnScroll = ({ children, delay = 0, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
        );
        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    const transitionDelay = `${delay}ms`;

    return (
        <div
            ref={ref}
            style={{ transitionDelay }}
            className={`${className} transition-all duration-1000 cubic-bezier(0.17, 0.55, 0.55, 1) transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
            {children}
        </div>
    );
};

// Component: Scroll Progress Bar
const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const currentScroll = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight) {
                setScrollProgress((currentScroll / scrollHeight) * 100);
            }
        };
        window.addEventListener("scroll", updateScrollProgress);
        return () => window.removeEventListener("scroll", updateScrollProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1.5 z-[60]">
            <div
                className="h-full bg-orange-600 shadow-[0_0_10px_rgba(234,88,12,0.5)] transition-all duration-100 ease-out"
                style={{ width: `${scrollProgress}%` }}
            />
        </div>
    );
};

// --- Main Components ---

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openWhatsApp = () => {
        // UPDATED: Linked to 8137976987
        window.open("https://wa.me/918137976987?text=Hi%20AjxFitClub!%20I'm%20interested%20in%20the%20Soft%20Launch%20offer.", "_blank");
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="text-2xl font-black tracking-tighter text-gray-900">
                    AJX<span className="text-orange-600">FIT</span>CLUB
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#offer" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">The Offer</a>
                    <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Training</a>
                    <a href="#team" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Team</a>
                    <button
                        onClick={openWhatsApp}
                        className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                        <MessageCircle size={16} /> Book via WhatsApp
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-gray-900" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col space-y-4 md:hidden shadow-xl animate-fade-in-down">
                    <a href="#offer" className="text-lg font-medium text-gray-900" onClick={() => setIsOpen(false)}>The Offer</a>
                    <a href="#features" className="text-lg font-medium text-gray-900" onClick={() => setIsOpen(false)}>Training</a>
                    <a href="#team" className="text-lg font-medium text-gray-900" onClick={() => setIsOpen(false)}>Team</a>
                    <button
                        onClick={openWhatsApp}
                        className="bg-orange-600 text-white w-full py-3 rounded-xl font-bold flex justify-center items-center gap-2"
                    >
                        <MessageCircle size={18} /> Book via WhatsApp
                    </button>
                </div>
            )}
        </nav>
    );
};

const Hero = () => {
    const parallaxOffset = useParallax(0.2);

    const openWhatsApp = () => {
        // UPDATED: Linked to 8137976987
        window.open("https://wa.me/918137976987?text=Hi%20AjxFitClub!%20I'm%20interested%20in%20the%20Soft%20Launch%20offer.", "_blank");
    };

    // --- NEW CODE: Instagram Function ---
    const openInstagram = () => {
        window.open("https://www.instagram.com/ajxfitclub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", "_blank");
    };

    // --- NEW CODE: Scroll Function ---
    const scrollToPlans = () => {
        const offerSection = document.getElementById('offer');
        if (offerSection) {
            offerSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gray-50">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
                    <RevealOnScroll>
                        <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 mb-8 animate-fade-in-up hover:shadow-md transition-shadow cursor-default">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-xs font-bold tracking-wide uppercase text-gray-500">Soft Launch • Dec 1st</span>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={100}>
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.1] mb-8">
                            Personalized Fitness, <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                Anytime, Anywhere.
              </span>
                        </h1>
                    </RevealOnScroll>

                    <RevealOnScroll delay={200}>
                        <div className="flex flex-col items-center justify-center mb-12 relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-200/30 to-gray-100/30 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            <div className="relative text-center">
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Launch Offer</p>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-2xl text-gray-500 font-bold">₹</span>
                                    <span className="text-8xl font-black text-gray-900 tracking-tighter leading-none">1999</span>
                                </div>
                                <div className="flex items-center justify-center gap-3 mt-4 text-gray-500 font-medium">
                       <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                          30 Day Plan
                       </span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                    <span className="text-red-600 text-sm font-bold flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded-full border border-red-100">
                          <AlertCircle size={14} /> Bookings Close Dec 1st
                       </span>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={300}>
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <button
                                onClick={openWhatsApp}
                                className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-orange-600 transition-all hover:scale-105 shadow-lg shadow-gray-200 flex items-center gap-2"
                            >
                                <MessageCircle size={20} /> DM Us to Book
                            </button>
                            {/* --- MODIFIED BUTTON CODE: Instagram with 'View Videos' --- */}
                            <button
                                onClick={openInstagram}
                                className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all flex items-center hover:scale-105 cursor-pointer group"
                            >
                                <Instagram size={20} className="mr-2 text-pink-600 group-hover:scale-110 transition-transform" />
                                <span>View Videos</span>
                            </button>
                            {/* ------------------------------------ */}
                        </div>
                    </RevealOnScroll>
                </div>

                {/* Floating UI Elements Mockup */}
                <div className="relative max-w-5xl mx-auto mt-12 h-[550px] md:h-[600px]">
                    {/* Central Phone */}
                    <div
                        className="absolute left-1/2 top-0 -translate-x-1/2 w-[280px] md:w-[320px] h-[550px] md:h-[650px] bg-gray-900 rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden z-20 transition-transform duration-100 ease-out"
                        style={{ transform: `translateX(-50%) translateY(${parallaxOffset * 0.5}px)` }}
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-30"></div>
                        <div className="relative w-full h-full bg-white flex flex-col">
                            <img
                                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="App Interface"
                                className="w-full h-3/5 object-cover"
                            />
                            <div className="p-6 bg-white flex-1">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">Soft Launch</h3>
                                        <p className="text-xs text-orange-500 font-bold">LIMITED TIME OFFER</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                        <UserAvatar />
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-2xl mb-4 border border-gray-100 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">Urgent</div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">30 Day Plan</div>
                                            <div className="text-2xl font-black text-gray-900">₹1999</div>
                                        </div>
                                        <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Active</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card Left: Offer Tag */}
                    <div
                        className="absolute top-20 left-4 md:left-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-30 hidden md:block"
                        style={{ transform: `translateY(${parallaxOffset * -0.2}px)` }}
                    >
                        <div className="flex items-center space-x-3 animate-float-slow">
                            <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                                <Star size={24} fill="currentColor" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Soft Launch</p>
                                <p className="text-xl font-black text-gray-900">₹1999 <span className="text-xs font-bold text-red-500 block">Closes Dec 1st</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card Right: Location */}
                    <div
                        className="absolute top-40 right-4 md:right-10 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-10 hidden md:block"
                        style={{ transform: `translateY(${parallaxOffset * -0.3}px)` }}
                    >
                        <div className="flex items-center space-x-3 animate-float-delayed">
                            <div className="bg-gray-100 p-2 rounded-full">
                                <MapPin size={20} className="text-gray-700" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">Offline</p>
                                <p className="text-xs text-green-600 font-bold">Palakkad Only</p>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card Bottom Left: Online */}
                    <div
                        className="absolute bottom-40 left-10 md:left-0 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-30 hidden md:block"
                        style={{ transform: `translateY(${parallaxOffset * 0.1}px)` }}
                    >
                        <div className="flex items-center space-x-3 animate-float">
                            <div className="bg-gray-100 p-2 rounded-full">
                                <Globe size={20} className="text-gray-700" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">Online</p>
                                <p className="text-xs text-gray-500">Available Everywhere</p>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card Bottom Right: Nutrition */}
                    <div
                        className="absolute bottom-20 right-10 md:right-32 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-30 hidden md:block"
                        style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}
                    >
                        <div className="flex items-center space-x-3 animate-float-slow">
                            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                <Utensils size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">Nutrition</p>
                                <p className="text-xs text-gray-500">Full Guidance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decorative Blobs */}
            <div className="absolute top-20 left-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-blob"></div>
            <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-blob animation-delay-2000"></div>
        </section>
    );
};

const FeatureSplit = () => {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="md:w-1/2">
                        <RevealOnScroll>
                            <div className="bg-gray-50 rounded-[3rem] p-8 md:p-12 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-100 via-transparent to-transparent"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                    alt="Personalized Training"
                                    className="relative z-10 w-full h-auto rounded-2xl shadow-lg transform rotate-[-2deg] group-hover:rotate-0 transition-transform duration-700 ease-in-out"
                                />
                                <div className="absolute bottom-10 right-10 z-20 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-float-delayed">
                                    <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                                        <Users size={20} fill="currentColor" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Training</p>
                                        <p className="text-xs text-green-600 font-bold">1-on-1 Focus</p>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>

                    <div className="md:w-1/2">
                        <RevealOnScroll delay={200}>
                            <span className="text-orange-600 font-bold tracking-wider text-sm uppercase mb-2 block">Soft Launch Special</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                                Everything you need <br/>
                                <span className="text-gray-400">in one package.</span>
                            </h2>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                We've simplified fitness for our launch. One low price, total access to expertise.
                            </p>
                        </RevealOnScroll>

                        <div className="space-y-6">
                            <RevealOnScroll delay={300}>
                                <div className="flex items-start group hover:bg-gray-50 p-4 rounded-xl transition-colors cursor-default">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                                        <Globe size={20} />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-xl font-bold text-gray-900 mb-1">Online Training</h4>
                                        <p className="text-gray-500">Available everywhere. Train from home or your local gym with our guidance.</p>
                                    </div>
                                </div>
                            </RevealOnScroll>

                            <RevealOnScroll delay={400}>
                                <div className="flex items-start group hover:bg-gray-50 p-4 rounded-xl transition-colors cursor-default">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                                        <MapPin size={20} />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-xl font-bold text-gray-900 mb-1">Offline Training</h4>
                                        <p className="text-gray-500"><span className="text-orange-600 font-bold">Palakkad Only.</span> In-person coaching for focused results.</p>
                                    </div>
                                </div>
                            </RevealOnScroll>

                            <RevealOnScroll delay={500}>
                                <div className="flex items-start group hover:bg-gray-50 p-4 rounded-xl transition-colors cursor-default">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                                        <Utensils size={20} />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-xl font-bold text-gray-900 mb-1">Complete Nutrition</h4>
                                        <p className="text-gray-500">Full meal guidance included. Fitness is 60% what you eat.</p>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const OfferHighlight = () => {
    const parallaxOffset = useParallax(0.15);

    const openWhatsApp = () => {
        // UPDATED: Linked to 8137976987
        window.open("https://wa.me/918137976987?text=Hi%20AjxFitClub!%20I'm%20interested%20in%20the%20Soft%20Launch%20offer.", "_blank");
    };

    return (
        <section id="offer" className="py-24 bg-gray-900 text-white relative overflow-hidden">
            {/* Background Image with Overlay and Parallax */}
            <div className="absolute inset-0 z-0 h-[120%] -top-[10%]">
                <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                    alt="Gym Background"
                    className="w-full h-full object-cover opacity-30 transition-transform duration-75 ease-out"
                    style={{ transform: `translateY(${parallaxOffset}px)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Bonuses Content */}
                    <div>
                        <RevealOnScroll>
                            <span className="text-orange-500 font-bold tracking-wider text-sm uppercase mb-2 block">Rewards & Bonuses</span>
                            <h2 className="text-4xl md:text-5xl font-black mb-6">
                                Earn While You Burn.
                            </h2>
                        </RevealOnScroll>

                        {/* Referral Bonus */}
                        <RevealOnScroll delay={100}>
                            <div className="mb-6 p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-orange-500/50 transition-all hover:bg-white/10 group cursor-default">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="p-3 bg-orange-500/20 text-orange-500 rounded-full group-hover:scale-110 transition-transform">
                                        <Users size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold">Referral Double-Bonus</h3>
                                </div>
                                <p className="text-gray-400 leading-relaxed">
                                    Bring a friend to the club. <span className="text-white font-bold">You get ₹500 OFF</span>.
                                    <span className="text-white font-bold"> They get ₹500 OFF</span>.
                                    Fitness is cheaper together.
                                </p>
                            </div>
                        </RevealOnScroll>

                        {/* Consistency Bonus */}
                        <RevealOnScroll delay={200}>
                            <div className="mb-8 p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-green-500/50 transition-all hover:bg-white/10 group cursor-default">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="p-3 bg-green-500/20 text-green-500 rounded-full group-hover:scale-110 transition-transform">
                                        <Trophy size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold">Consistency Voucher</h3>
                                </div>
                                <p className="text-gray-400 leading-relaxed">
                                    Show up for <span className="text-white font-bold">all 30 days</span>?
                                    Earn a <span className="text-white font-bold">25% OFF Voucher</span> for our upcoming Hard Launch pricing plans.
                                </p>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={300}>
                            <button
                                onClick={openWhatsApp}
                                className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all flex items-center gap-2"
                            >
                                Claim Your Bonuses <ChevronRight size={18} />
                            </button>
                        </RevealOnScroll>
                    </div>

                    {/* Right: Pricing Card */}
                    <RevealOnScroll delay={300} className="w-full md:w-auto flex justify-center lg:justify-end">
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl border border-gray-700 shadow-2xl relative overflow-hidden group max-w-md w-full">
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <div className="relative z-10 text-center">
                                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Soft Launch Price</p>
                                <div className="flex justify-center items-baseline mb-2">
                                    <span className="text-3xl font-bold text-gray-300 mr-1">₹</span>
                                    <span className="text-7xl font-black text-white">1999</span>
                                </div>

                                {/* Updated Label here as well */}
                                <div className="flex flex-col items-center justify-center gap-2 mb-6">
                                    <p className="text-orange-500 font-bold uppercase tracking-wide">30 Day Package</p>
                                    <div className="inline-flex items-center bg-red-500/20 border border-red-500/50 rounded px-2 py-1">
                                        <AlertCircle size={12} className="text-red-400 mr-1" />
                                        <span className="text-[10px] font-bold text-red-400 uppercase tracking-wide">Bookings Close Dec 1st</span>
                                    </div>
                                </div>

                                <div className="space-y-3 text-left mb-8">
                                    <div className="flex items-center gap-3 text-gray-300 text-sm">
                                        <CheckCircle size={16} className="text-green-500" /> Personal Training
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-300 text-sm">
                                        <CheckCircle size={16} className="text-green-500" /> Nutrition Plan
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-300 text-sm">
                                        <CheckCircle size={16} className="text-green-500" /> Online or Offline
                                    </div>
                                </div>

                                <button
                                    onClick={openWhatsApp}
                                    className="w-full py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-500 transition-colors shadow-lg shadow-orange-900/50"
                                >
                                    Grab this Deal
                                </button>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
};

const Team = () => {
    return (
        <section id="team" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <RevealOnScroll>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-black text-gray-900 mb-2">Guided By Experts</h2>
                            <p className="text-gray-600">The team behind your transformation.</p>
                        </div>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Founder 1 */}
                    <RevealOnScroll delay={0}>
                        <div className="group relative overflow-hidden rounded-3xl bg-gray-50 hover:shadow-2xl transition-all duration-500">
                            <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                                <img
                                    src="/MP.jpg"
                                    alt="Athul MP"
                                    className="w-full h-[400px] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-bold text-white">Athul MP</h3>
                                    <a href="https://www.instagram.com/athulmuralidharan_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="text-white hover:text-orange-500 transition-colors">
                                        <Instagram size={24} />
                                    </a>
                                </div>
                                <p className="text-orange-400 font-medium text-sm mb-2">CEO & Co-founder</p>
                                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 min-h-[48px]">Certified Personal Trainer & Nutritionist. Expert in client transformation.</p>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Founder 2 */}
                    <RevealOnScroll delay={200}>
                        <div className="group relative overflow-hidden rounded-3xl bg-gray-50 hover:shadow-2xl transition-all duration-500">
                            <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                                <img
                                    src="/NJ.jpg"
                                    alt="Niraj V"
                                    className="w-full h-[400px] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-bold text-white">Niraj V</h3>
                                    <a href="https://www.instagram.com/niraj.official7?igsh=a2hvY3NubWpzYm5u" target="_blank" rel="noreferrer" className="text-white hover:text-orange-500 transition-colors">
                                        <Instagram size={24} />
                                    </a>
                                </div>
                                <p className="text-orange-400 font-medium text-sm mb-2">Managing Partner & Co-founder</p>
                                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 min-h-[48px]">Tech Lead & Digital Strategy.</p>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
};

// --- New Component: Coming Soon ---
const ComingSoon = () => {
    return (
        <section className="py-24 bg-gray-50 border-y border-gray-200">
            <div className="container mx-auto px-6 text-center">
                <RevealOnScroll>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider mb-6">
                        <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
                        In Development
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                        The Full <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">Digital Experience</span><br />
                        Is Coming.
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Our comprehensive Main App and Full Website are currently in the works. Get ready for AI-powered tracking, community challenges, and more.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-200 opacity-60">
                            <Globe size={24} className="text-gray-400" />
                            <div className="text-left">
                                <p className="text-xs text-gray-400 font-bold uppercase">Web Platform</p>
                                <p className="font-bold text-gray-900">Coming Soon</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-200 opacity-60">
                            <Smartphone size={24} className="text-gray-400" />
                            <div className="text-left">
                                <p className="text-xs text-gray-400 font-bold uppercase">Mobile App</p>
                                <p className="font-bold text-gray-900">Coming Soon</p>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

const Footer = () => {
    const [notification, setNotification] = useState("");

    const showComingSoon = () => {
        setNotification("Coming Soon!");
        setTimeout(() => setNotification(""), 3000);
    };

    const openWhatsApp = () => {
        // UPDATED: Linked to 8137976987
        window.open("https://wa.me/918137976987?text=Hi%20AjxFitClub!%20I'm%20interested%20in%20the%20Soft%20Launch%20offer.", "_blank");
    };

    const openInstagram = () => {
        window.open("https://www.instagram.com/ajxfitclub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", "_blank");
    };

    return (
        <footer className="bg-gray-950 text-white pt-20 pb-10 overflow-hidden relative">
            {/* Toast Notification */}
            <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 px-6 py-3 rounded-full shadow-2xl z-50 transition-all duration-300 flex items-center gap-2 ${notification ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="font-bold">{notification}</span>
            </div>

            {/* Marquee Effect */}
            <div className="w-full overflow-hidden whitespace-nowrap mb-20 opacity-20 hover:opacity-40 transition-opacity duration-500">
                <div className="inline-block animate-marquee">
                    <span className="text-[8rem] md:text-[12rem] font-black tracking-tighter mx-8 hover:text-orange-600 transition-colors cursor-default">START NOW</span>
                    <span className="text-[8rem] md:text-[12rem] font-black tracking-tighter mx-8 text-stroke">JOIN THE CLUB</span>
                    <span className="text-[8rem] md:text-[12rem] font-black tracking-tighter mx-8 hover:text-orange-600 transition-colors cursor-default">START NOW</span>
                    <span className="text-[8rem] md:text-[12rem] font-black tracking-tighter mx-8 text-stroke">JOIN THE CLUB</span>
                </div>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-16">
                    <div className="md:col-span-2">
                        <h3 className="text-3xl font-black mb-6">AJX<span className="text-orange-600">FIT</span>CLUB</h3>
                        <p className="text-gray-400 max-w-sm text-lg leading-relaxed mb-8">
                            Soft Launch Offer: ₹1999 for 30 Day Plan. Bookings close December 1st.
                        </p>
                        <div className="flex space-x-4">
                            <button
                                onClick={openInstagram}
                                className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-gray-950 transition-all hover:scale-110"
                            >
                                <Instagram size={20} />
                            </button>
                            <button
                                onClick={showComingSoon}
                                className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-gray-950 transition-all hover:scale-110"
                            >
                                <Facebook size={20} />
                            </button>
                            <button
                                onClick={showComingSoon}
                                className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-gray-950 transition-all hover:scale-110"
                            >
                                <Linkedin size={20} />
                            </button>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Sitemap</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#offer" className="hover:text-white transition-colors">The Offer</a></li>
                            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                            <li><a href="#team" className="hover:text-white transition-colors">Team</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Contact</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-center gap-2">
                                <Mail size={16} /> ajxfitclub@gmail.com
                            </li>
                            <li>www.ajxfitclub.com</li>
                            <li className="pt-4">
                                <button
                                    onClick={openWhatsApp}
                                    className="px-6 py-2 bg-white text-gray-950 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors"
                                >
                                    Get in Touch
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
                    <p>&copy; {new Date().getFullYear()} AjxFitClub LLP. All rights reserved.</p>

                    {/* NJX Hidden Branding - 'Da Vinci Code' Style */}
                    <div className="mt-4 md:mt-0 font-mono text-xs tracking-widest text-gray-500 hover:text-white transition-colors cursor-default select-none">
                        <span className="text-orange-600">&lt;</span>
                        <span>CreatedBy</span>
                        <span className="font-bold text-orange-500 ml-1">NJX</span>
                        <span className="text-orange-600"> /&gt;</span>
                    </div>

                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const UserAvatar = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-400">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

// Main App Component
const App = () => {
    return (
        <div className="font-sans text-gray-900 bg-white selection:bg-orange-100 selection:text-orange-900">
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fade-in-up {
           0% { opacity: 0; transform: translateY(20px); }
           100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-down {
           0% { opacity: 0; transform: translateY(-10px); }
           100% { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite 2s; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-marquee { animation: marquee 25s linear infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-fade-in-down { animation: fade-in-down 0.3s ease-out forwards; }
        .text-stroke { -webkit-text-stroke: 1px rgba(255,255,255,0.2); color: transparent; }
      `}</style>

            <ScrollProgress />
            <Nav />
            <Hero />
            <FeatureSplit />
            <OfferHighlight />
            <Team />
            <ComingSoon />
            <Footer />
        </div>
    );
};

export default App;