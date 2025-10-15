import React, { useState, useEffect } from "react";
import { Eye, EyeOff, User, Lock, Shield, ArrowRight, CheckCircle, AlertCircle, Loader2, Sparkles, Zap, Star } from "lucide-react";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for gradient effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setUsername("");
    setPassword("");
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!username || !password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    const baseUrl = import.meta.env.VITE_API_URL || "";
    const endpoint = isLogin
      ? `${baseUrl}/admin/login`
      : `${baseUrl}/admin/register`;

    const payload = {
      username,
      password,
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Safely parse JSON — handle empty/non-JSON responses
      let data = {};
      const text = await res.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseErr) {
        console.warn("Non-JSON response from", endpoint);
        data = {};
      }

      if (!res.ok) {
        const msg = data?.message || `Request failed (${res.status})`;
        setError(msg);
        setIsLoading(false);
        return;
      }

      setSuccess(data.message || (isLogin ? "Login successful!" : "Registration successful!"));

      if (isLogin) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUsername", username);
        
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        setIsLoading(false);
      }

      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError("Server not responding");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic background with mesh gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-orange-900/20 to-amber-900/30"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(251, 146, 60, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #0f172a 100%)
          `
        }}
      />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 border border-orange-500/10 rounded-full animate-spin" style={{ animationDuration: '60s' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 border border-orange-400/5 rounded-full animate-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-r from-orange-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-l from-amber-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Main card */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/50 via-amber-500/50 to-orange-500/50 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500 animate-pulse" />
            
            {/* Card */}
            <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-[0_8px_40px_rgb(0,0,0,0.3)] transition-all duration-500 group-hover:shadow-[0_8px_60px_rgb(251,146,60,0.3)]">
              {/* Premium header */}
              <div className="text-center mb-10">
                <div className="relative inline-flex items-center justify-center mb-6">
                  {/* Icon container with animated rings */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 animate-pulse" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/50">
                    <Shield className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={2} />
                    <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-300 animate-bounce" />
                  </div>
                </div>
                
                <h1 className="text-3xl font-black bg-gradient-to-r from-white via-orange-100 to-amber-100 bg-clip-text text-transparent mb-3 tracking-tight">
                  {isLogin ? "ADMIN NEXUS" : "JOIN NEXUS"}
                </h1>
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <p className="text-orange-100/90 text-sm font-semibold tracking-wide">
                    {isLogin ? "ELITE DASHBOARD ACCESS" : "EXCLUSIVE MEMBERSHIP"}
                  </p>
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                </div>
                
                <p className="text-gray-300/80 text-xs uppercase tracking-wider font-medium">
                  {isLogin ? "Authorized Personnel Only" : "By Invitation Only"}
                </p>
              </div>

              {/* Premium alerts */}
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mr-3">
                      <AlertCircle className="w-4 h-4 text-red-400" strokeWidth={2} />
                    </div>
                    <span className="text-red-200 text-sm font-medium">{error}</span>
                  </div>
                </div>
              )}
              
              {success && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                      <CheckCircle className="w-4 h-4 text-green-400" strokeWidth={2} />
                    </div>
                    <span className="text-green-200 text-sm font-medium">{success}</span>
                  </div>
                </div>
              )}

              {/* Premium form */}
              <div className="space-y-7">
                {/* Username field */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-white/90 uppercase tracking-wider">
                    Username
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                      <User className="h-5 w-5 text-orange-400/60 group-focus-within:text-orange-400 transition-all duration-300" strokeWidth={2} />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:bg-white/10 focus:border-orange-400/50 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300 text-sm font-medium backdrop-blur-sm hover:border-orange-400/30"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-white/90 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                      <Lock className="h-5 w-5 text-orange-400/60 group-focus-within:text-orange-400 transition-all duration-300" strokeWidth={2} />
                    </div>
                    <input
                      type={showPass ? "text" : "password"}
                      className="w-full pl-12 pr-14 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:bg-white/10 focus:border-orange-400/50 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300 text-sm font-medium backdrop-blur-sm hover:border-orange-400/30"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-orange-400/60 hover:text-orange-400 transition-all duration-300"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? (
                        <EyeOff className="h-5 w-5" strokeWidth={2} />
                      ) : (
                        <Eye className="h-5 w-5" strokeWidth={2} />
                      )}
                    </button>
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Premium submit button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="relative w-full group overflow-hidden"
                >
                  {/* Button background with animated gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-xl transition-all duration-300 group-hover:from-orange-400 group-hover:via-amber-400 group-hover:to-orange-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600/50 to-amber-600/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Button content */}
                  <div className="relative px-8 py-4 flex items-center justify-center">
                    <div className="flex items-center space-x-3">
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-white" strokeWidth={2} />
                          <span className="font-black text-white text-sm tracking-wide">PROCESSING...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
                          <span className="font-black text-white text-sm tracking-wide">
                            {isLogin ? "ENTER NEXUS" : "JOIN NEXUS"}
                          </span>
                          <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Button glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/20 to-amber-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </button>
              </div>

              {/* Premium mode toggle */}
              <div className="mt-10">
                <div className="relative flex items-center justify-center mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>
                  <div className="relative bg-gradient-to-r from-orange-500/10 to-amber-500/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10">
                    <span className="text-xs font-bold text-orange-200 uppercase tracking-widest">
                      {isLogin ? "New Member?" : "Returning?"}
                    </span>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={toggleMode}
                  className="w-full group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/5 rounded-xl transition-all duration-300 group-hover:bg-white/10" />
                  <div className="relative py-4 px-6 text-center">
                    <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors duration-300 tracking-wide">
                      {isLogin ? "REQUEST ACCESS" : "MEMBER LOGIN"}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400 group-hover:w-full group-hover:left-0 transition-all duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;