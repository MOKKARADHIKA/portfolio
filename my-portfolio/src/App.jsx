import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────── DATA ─────────────────────────────── */
const NAV = ["Home","Education","Skills","Projects","Achievements","Contact"];

const SKILLS = [
  { label:"Frontend", icon:"⬡", c1:"#38bdf8", c2:"#818cf8", skills:["HTML5","CSS3","JavaScript","React.js","Bootstrap"] },
  { label:"Backend",  icon:"⬢", c1:"#a78bfa", c2:"#ec4899", skills:["Java","Spring Boot","Spring MVC","Node.js","Express.js","REST API"] },
  { label:"Database", icon:"◈", c1:"#34d399", c2:"#06b6d4", skills:["MySQL","MongoDB","PostgreSQL"] },
  { label:"Tools & Cloud", icon:"◎", c1:"#fb923c", c2:"#f43f5e", skills:["Git & GitHub","VS Code","Postman","AWS (EC2)","Docker"] },
];

const PROJECTS = [
  { n:"01", title:"Food Ordering E-Commerce",  tech:["React.js","JavaScript","Bootstrap","REST API"], desc:"Fully responsive food ordering website with cart management, search, filtering, and online ordering features.", live:"https://foodiie-hub.vercel.app/", gh:"https://github.com/mokkaradhika/foodiie-hub", c1:"#fb923c", c2:"#f43f5e" },
  { n:"02", title:"Healthcare Hospital Management", tech:["React.js","Spring Boot","MySQL"], desc:"Comprehensive hospital management system for patient records, appointments, and healthcare service management.", live:"#", gh:"https://github.com/mokkaradhika/healthcare-management", c1:"#38bdf8", c2:"#818cf8" },
  { n:"03", title:"Employee Management System", tech:["Spring Boot","MySQL","REST API","Hibernate"], desc:"Backend system with full CRUD operations, RESTful APIs, layered architecture, and Spring Data JPA integration.", live:"#", gh:"https://github.com/mokkaradhika/employee-management", c1:"#a78bfa", c2:"#ec4899" },
  { n:"04", title:"Cloud Security — Multi-Authority Keyword Search", tech:["Java","Cloud Security","Encryption"], desc:"Research project implementing secure keyword search over encrypted cloud data using multi-authority attribute-based encryption.", live:"#", gh:"https://github.com/mokkaradhika/cloud-security", c1:"#34d399", c2:"#06b6d4" },
];

const EDU = [
  { deg:"B.Tech — Computer Science & Engineering", school:"JNTUA, Nellore", yr:"2021 – 2025", score:"8.4 CGPA", c1:"#818cf8", c2:"#a78bfa", desc:"Specializing in software engineering, algorithms, databases, cloud computing, and full-stack web development." },
  { deg:"12th — Mathematics, Physics & Chemistry", school:"Bejawada Bujjamma Memorial Jr. College", yr:"2021", score:"890 Marks", c1:"#fb923c", c2:"#f43f5e", desc:"Strong academic foundation in sciences with distinction." },
  { deg:"10th — Secondary Education", school:"Althuri Rami Reddy ZP High School", yr:"2020", score:"9.7 CGPA", c1:"#34d399", c2:"#06b6d4", desc:"Achieved outstanding academic performance across all subjects." },
];

const ACHS = [
  { t:"Java Full Stack Development Certification", d:"March 2026", c:"#fb923c" },
  { t:"Outstanding Team Collaboration Award",      d:"March 2026", c:"#38bdf8" },
  { t:"Academic Project Achievement",              d:"May 2025",   c:"#a78bfa" },
  { t:"AI & Machine Learning using Python",        d:"2024",       c:"#34d399" },
];

const SOCIALS = [
  { label:"GitHub",   href:"https://github.com/mokkaradhika",    sub:"github.com/mokkaradhika", c:"#e2e8f0",
    p:"M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
  { label:"LinkedIn", href:"https://linkedin.com/in/radhika-mokka", sub:"linkedin.com/in/radhika-mokka", c:"#60a5fa",
    p:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { label:"Email",    href:"mailto:mokkaradhika502@gmail.com", sub:"mokkaradhika502@gmail.com", c:"#fb923c",
    p:"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" },
  { label:"WhatsApp", href:"https://wa.me/916305892838", sub:"+91 63058 92838", c:"#4ade80",
    p:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
];

/* ─────────────────── TYPEWRITER ─────────────────── */
function TypeWriter({ texts }) {
  const [disp, setDisp] = useState(""); const [ti, setTi] = useState(0);
  const [ci, setCi] = useState(0); const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = texts[ti]; let d = del ? 45 : 85;
    if (!del && ci === cur.length) d = 2000;
    if (del && ci === 0) d = 400;
    const t = setTimeout(() => {
      if (!del && ci < cur.length) { setDisp(cur.slice(0,ci+1)); setCi(c=>c+1); }
      else if (!del && ci === cur.length) setDel(true);
      else if (del && ci > 0) { setDisp(cur.slice(0,ci-1)); setCi(c=>c-1); }
      else { setDel(false); setTi(i=>(i+1)%texts.length); }
    }, d);
    return () => clearTimeout(t);
  }, [ci, del, ti, texts]);
  return <span className="tw">{disp}<span className="twc">|</span></span>;
}

/* ─────────────────── 3D TILT CARD ─────────────────── */
function TiltCard({ children, className = "", style = {}, glowColor = "#818cf8" }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 18;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -18;
    el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
    el.style.boxShadow = `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${glowColor}50, 0 0 32px ${glowColor}25`;
  }, [glowColor]);
  const onLeave = useCallback(() => {
    const el = ref.current; if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
    el.style.boxShadow = "";
  }, []);
  return (
    <div ref={ref} className={className} style={{ transition: "transform 0.15s ease, box-shadow 0.2s ease", ...style }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

/* ─────────────────── FADE IN ON SCROLL ─────────────────── */
function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null); const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(40px)", transition:`opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease` }}>
      {children}
    </div>
  );
}

/* ─────────────────── MAIN ─────────────────── */
export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [toast, setToast] = useState(null);
  const [mob, setMob] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      for (let i = NAV.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV[i]);
        if (el && window.scrollY >= el.offsetTop - 140) { setActive(NAV[i]); break; }
      }
    };
    const onMouse = (e) => { mousePos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMouse); };
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setActive(id); setMob(false); };
  const link = (e, href) => { e.preventDefault(); window.open(href, href.startsWith("mailto")?"_self":"_blank","noopener,noreferrer"); };

  const send = () => {
    if (!form.name || !form.email || !form.message) { setToast({ t:"err", m:"Please fill all fields." }); setTimeout(()=>setToast(null),3000); return; }
    const s = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const b = encodeURIComponent(`Hi Radhika,\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.open(`mailto:mokkaradhika502@gmail.com?subject=${s}&body=${b}`, "_self");
    setToast({ t:"ok", m:"Email client opened!" }); setForm({ name:"", email:"", message:"" }); setTimeout(()=>setToast(null),4000);
  };

  return (
    <div className="root">
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#07091a;--bg2:#0c0e24;--bg3:#11132e;
  --glass:rgba(255,255,255,0.04);--glass2:rgba(255,255,255,0.07);
  --border:rgba(255,255,255,0.08);--border2:rgba(255,255,255,0.15);
  --text:#f0f4ff;--sub:#8892b0;--dim:#4a5568;
  --blue:#38bdf8;--violet:#818cf8;--pink:#ec4899;--orange:#fb923c;--green:#34d399;--cyan:#06b6d4;
  --g1:linear-gradient(135deg,#38bdf8,#818cf8,#ec4899);
  --g2:linear-gradient(135deg,#818cf8,#ec4899);
  --g3:linear-gradient(135deg,#34d399,#06b6d4);
  --glow-b:0 0 40px rgba(56,189,248,0.3);
  --glow-v:0 0 40px rgba(129,140,248,0.35);
  --glow-p:0 0 40px rgba(236,72,153,0.3);
  --max:1160px; --pad:clamp(18px,5vw,64px); --r:18px;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:'Space Grotesk',sans-serif;overflow-x:hidden}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:linear-gradient(var(--violet),var(--pink));border-radius:2px}
.root{min-height:100vh;position:relative}

/* ─── CANVAS STARS ─── */
.stars-canvas{position:fixed;inset:0;z-index:0;pointer-events:none}

/* ─── ORB BG ─── */
.orbs{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.orb{position:absolute;border-radius:50%;filter:blur(90px);opacity:0.18}
.orb1{width:700px;height:700px;top:-200px;left:-200px;background:radial-gradient(circle,#818cf8,transparent 70%);animation:orbFloat1 18s ease-in-out infinite}
.orb2{width:600px;height:600px;bottom:-150px;right:-150px;background:radial-gradient(circle,#ec4899,transparent 70%);animation:orbFloat2 22s ease-in-out infinite}
.orb3{width:400px;height:400px;top:40%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,#38bdf8,transparent 70%);animation:orbFloat3 16s ease-in-out infinite;opacity:0.1}
@keyframes orbFloat1{0%,100%{transform:translate(0,0)}33%{transform:translate(60px,-40px)}66%{transform:translate(-40px,30px)}}
@keyframes orbFloat2{0%,100%{transform:translate(0,0)}33%{transform:translate(-50px,60px)}66%{transform:translate(40px,-30px)}}
@keyframes orbFloat3{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.2)}}

/* ─── GRID TEXTURE ─── */
.grid-tex{position:fixed;inset:0;z-index:0;pointer-events:none;
  background-image:linear-gradient(rgba(129,140,248,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(129,140,248,0.04) 1px,transparent 1px);
  background-size:56px 56px}

/* ─── CONTAINER ─── */
.wrap{position:relative;z-index:2;max-width:var(--max);margin:0 auto;padding:0 var(--pad)}

/* ─── NAV ─── */
.nav{position:fixed;top:0;left:0;right:0;z-index:100;height:68px;display:flex;align-items:center;transition:all 0.4s}
.nav.on{background:rgba(7,9,26,0.75);backdrop-filter:blur(24px) saturate(1.8);border-bottom:1px solid rgba(129,140,248,0.12);box-shadow:0 1px 40px rgba(0,0,0,0.4)}
.nav-in{display:flex;align-items:center;justify-content:space-between;max-width:var(--max);margin:0 auto;padding:0 var(--pad);width:100%}
.nav-logo{font-family:'Outfit',sans-serif;font-weight:800;font-size:22px;cursor:pointer;text-decoration:none;display:flex;align-items:center;gap:2px;user-select:none}
.logo-r{background:var(--g1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;filter:drop-shadow(0 0 12px rgba(129,140,248,0.8))}
.logo-dot{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 10px var(--green),0 0 20px var(--green);margin-left:3px;animation:pulse-dot 2s ease-in-out infinite}
@keyframes pulse-dot{0%,100%{box-shadow:0 0 10px var(--green),0 0 20px var(--green)}50%{box-shadow:0 0 16px var(--green),0 0 36px var(--green),0 0 60px rgba(52,211,153,0.4)}}
.nav-links{display:flex;gap:2px;align-items:center}
.nl{position:relative;background:none;border:none;cursor:pointer;color:var(--sub);font-size:13px;font-weight:500;padding:8px 14px;border-radius:8px;font-family:'Space Grotesk',sans-serif;letter-spacing:0.02em;transition:color 0.25s,background 0.25s}
.nl:hover{color:var(--text);background:rgba(129,140,248,0.08)}
.nl.on{color:var(--text)}
.nl.on::after{content:'';position:absolute;bottom:2px;left:12px;right:12px;height:1.5px;background:var(--g2);border-radius:1px;box-shadow:0 0 8px rgba(129,140,248,0.8)}
.nav-mob-btn{display:none;background:none;border:1px solid var(--border2);color:var(--text);cursor:pointer;padding:8px 11px;border-radius:9px;font-size:18px;line-height:1}
.mob-menu{display:none;position:fixed;inset:68px 0 0;z-index:99;background:rgba(7,9,26,0.97);backdrop-filter:blur(24px);flex-direction:column;padding:32px var(--pad);gap:6px;border-top:1px solid var(--border)}
.mob-menu.on{display:flex}
.mob-nl{background:none;border:none;color:var(--sub);font-size:18px;font-weight:500;padding:14px 0;cursor:pointer;text-align:left;font-family:'Space Grotesk',sans-serif;border-bottom:1px solid var(--border);transition:color 0.2s,padding 0.2s}
.mob-nl:last-child{border-bottom:none}
.mob-nl:hover,.mob-nl.on{color:var(--text);padding-left:8px}

/* ─── SECTION ─── */
.sec{padding:112px 0;position:relative;z-index:2}
.sec-tag{display:flex;align-items:center;gap:10px;margin-bottom:16px}
.sec-line{height:1px;width:36px;background:var(--g1);box-shadow:var(--glow-b)}
.sec-code{font-family:'Fira Code',monospace;font-size:11px;color:var(--violet);letter-spacing:0.15em;text-transform:uppercase}
.sec-h{font-family:'Outfit',sans-serif;font-weight:800;font-size:clamp(36px,5.5vw,58px);line-height:1.05;letter-spacing:-0.03em;margin-bottom:12px}
.sec-h-grad{background:var(--g1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.sec-sub{color:var(--sub);font-size:15px;line-height:1.75;max-width:500px}
.sec-head{margin-bottom:68px}

/* ─── HERO ─── */
.hero{min-height:100vh;display:flex;align-items:center;padding:120px 0 80px;position:relative;z-index:2}
.hero-grid{display:grid;grid-template-columns:1.1fr 0.9fr;gap:80px;align-items:center;width:100%}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(52,211,153,0.07);border:1px solid rgba(52,211,153,0.22);border-radius:999px;padding:6px 16px;margin-bottom:28px;backdrop-filter:blur(8px)}
.hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green),0 0 16px rgba(52,211,153,0.5)}
.hero-badge-txt{color:#6ee7b7;font-size:12.5px;font-weight:500;font-family:'Fira Code',monospace;letter-spacing:0.03em}
.hero-h{font-family:'Outfit',sans-serif;font-weight:900;font-size:clamp(46px,7vw,82px);line-height:1.0;letter-spacing:-0.04em;margin-bottom:4px}
.hero-name-g{background:var(--g1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;filter:drop-shadow(0 0 28px rgba(129,140,248,0.5))}
.hero-role{font-size:clamp(16px,2.2vw,22px);color:var(--sub);margin-bottom:26px;height:36px;display:flex;align-items:center;font-weight:400}
.tw{color:var(--blue);font-weight:600;text-shadow:0 0 20px rgba(56,189,248,0.6)}
.twc{color:var(--pink);animation:blink 1s step-end infinite;text-shadow:0 0 12px var(--pink)}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.hero-desc{color:var(--sub);font-size:15px;line-height:1.9;margin-bottom:40px;max-width:480px}
.hero-desc b{color:var(--text);font-weight:600}
.hero-ctas{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:48px}
.btn-glow{background:var(--g2);color:white;border:none;cursor:pointer;border-radius:12px;padding:14px 30px;font-size:14.5px;font-weight:700;font-family:'Space Grotesk',sans-serif;letter-spacing:0.03em;transition:all 0.3s;box-shadow:0 0 24px rgba(129,140,248,0.4),0 4px 20px rgba(0,0,0,0.4);position:relative;overflow:hidden}
.btn-glow::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.15),transparent);opacity:0;transition:opacity 0.3s}
.btn-glow:hover{transform:translateY(-3px);box-shadow:0 0 40px rgba(129,140,248,0.6),0 0 80px rgba(236,72,153,0.3),0 8px 30px rgba(0,0,0,0.5)}
.btn-glow:hover::before{opacity:1}
.btn-glass{background:rgba(255,255,255,0.05);backdrop-filter:blur(12px);color:var(--sub);border:1px solid var(--border2);cursor:pointer;border-radius:12px;padding:14px 30px;font-size:14.5px;font-weight:600;font-family:'Space Grotesk',sans-serif;letter-spacing:0.02em;transition:all 0.3s}
.btn-glass:hover{background:rgba(255,255,255,0.1);color:var(--text);border-color:rgba(129,140,248,0.4);box-shadow:0 0 20px rgba(129,140,248,0.15);transform:translateY(-2px)}
.hero-socials{display:flex;gap:10px}
.hero-si{width:44px;height:44px;border-radius:11px;display:flex;align-items:center;justify-content:center;background:var(--glass);border:1px solid var(--border);backdrop-filter:blur(8px);cursor:pointer;transition:all 0.3s;text-decoration:none}
.hero-si:hover{background:var(--glass2);border-color:var(--border2);transform:translateY(-4px);box-shadow:0 8px 24px rgba(0,0,0,0.4)}

/* ─── HERO VISUAL ─── */
.hero-vis{display:flex;justify-content:center;align-items:center;animation:floatHero 5s ease-in-out infinite}
@keyframes floatHero{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
.av-wrap{position:relative}
.av-ring-outer{width:310px;height:310px;border-radius:50%;background:conic-gradient(from 0deg,#38bdf8,#818cf8,#ec4899,#fb923c,#38bdf8);padding:2.5px;animation:avSpin 9s linear infinite;filter:drop-shadow(0 0 24px rgba(129,140,248,0.5))}
@keyframes avSpin{to{transform:rotate(360deg)}}
.av-inner{width:100%;height:100%;border-radius:50%;background:var(--bg);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0}
.av-init{font-family:'Outfit',sans-serif;font-weight:900;font-size:84px;line-height:1;background:var(--g1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;filter:drop-shadow(0 0 20px rgba(129,140,248,0.6))}
.av-sub{color:var(--dim);font-size:10px;letter-spacing:0.2em;font-weight:600;font-family:'Fira Code',monospace}
.av-rings{position:absolute;inset:0;border-radius:50%;pointer-events:none}
.av-ring{position:absolute;border-radius:50%;border:1px solid rgba(129,140,248,0.15);animation:pulseRing 3s ease-out infinite}
.av-tag{position:absolute;background:rgba(7,9,26,0.9);backdrop-filter:blur(16px);border-radius:10px;padding:7px 14px;font-size:12px;font-weight:700;white-space:nowrap;border:1px solid;font-family:'Fira Code',monospace}

/* ─── STATS ─── */
.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:56px}
.stat-card{background:var(--glass);backdrop-filter:blur(12px);border:1px solid var(--border);border-radius:var(--r);padding:22px 16px;text-align:center;transition:all 0.3s;cursor:default}
.stat-card:hover{background:var(--glass2);border-color:rgba(129,140,248,0.3);transform:translateY(-4px);box-shadow:0 0 30px rgba(129,140,248,0.12),0 16px 40px rgba(0,0,0,0.4)}
.stat-ico{font-size:20px;margin-bottom:8px;font-family:'Fira Code',monospace}
.stat-v{font-family:'Outfit',sans-serif;font-weight:900;font-size:34px;background:var(--g1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1}
.stat-l{font-size:11px;color:var(--dim);margin-top:6px;font-weight:500;letter-spacing:0.04em;text-transform:uppercase;font-family:'Fira Code',monospace}

/* ─── EDUCATION ─── */
.edu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.edu-card{background:var(--glass);backdrop-filter:blur(16px);border:1px solid var(--border);border-radius:var(--r);padding:28px;position:relative;overflow:hidden;transition:box-shadow 0.2s}
.edu-glow{position:absolute;top:0;left:0;right:0;height:2px;border-radius:18px 18px 0 0}
.edu-score{font-family:'Outfit',sans-serif;font-size:22px;font-weight:800;padding:6px 16px;border-radius:9px;float:right;margin-left:12px}
.edu-deg{color:var(--text);font-size:15px;font-weight:700;line-height:1.4;margin:52px 0 6px}
.edu-school{color:var(--sub);font-size:13px;margin-bottom:10px}
.edu-desc{color:var(--dim);font-size:13px;line-height:1.75;margin-bottom:16px}
.edu-yr{font-family:'Fira Code',monospace;font-size:11.5px;color:var(--dim);letter-spacing:0.06em}

/* ─── SKILLS ─── */
.sk-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px}
.sk-card{background:var(--glass);backdrop-filter:blur(16px);border:1px solid var(--border);border-radius:var(--r);padding:28px;position:relative;overflow:hidden;transition:box-shadow 0.2s}
.sk-top{position:absolute;top:0;left:0;right:0;height:1.5px;border-radius:18px 18px 0 0}
.sk-hdr{display:flex;align-items:center;gap:12px;margin-bottom:20px}
.sk-icon{width:46px;height:46px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;font-family:'Fira Code',monospace}
.sk-lbl{color:var(--text);font-size:15px;font-weight:700}
.sk-cnt{font-family:'Fira Code',monospace;font-size:11px;color:var(--dim);margin-top:2px;letter-spacing:0.04em}
.sk-div{height:1px;margin-bottom:18px;border-radius:1px}
.sk-pills{display:flex;flex-wrap:wrap;gap:9px}
.sk-pill{border-radius:8px;font-size:12.5px;font-weight:600;padding:7px 14px;transition:all 0.2s;cursor:default;display:inline-flex;align-items:center;gap:6px;font-family:'Space Grotesk',sans-serif;letter-spacing:0.02em}
.sk-pill:hover{transform:scale(1.06) translateY(-1px)}
.sk-pip{width:5px;height:5px;border-radius:50%;flex-shrink:0}

/* ─── PROJECTS ─── */
.proj-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px}
.proj-card{background:var(--glass);backdrop-filter:blur(16px);border:1px solid var(--border);border-radius:var(--r);padding:28px;position:relative;overflow:hidden;display:flex;flex-direction:column;transition:box-shadow 0.2s}
.proj-top{position:absolute;top:0;left:0;right:0;height:2.5px;border-radius:18px 18px 0 0}
.proj-n{font-family:'Fira Code',monospace;font-size:11px;letter-spacing:0.1em;margin-bottom:14px;margin-top:6px}
.proj-title{color:var(--text);font-size:17px;font-weight:700;line-height:1.35;margin-bottom:12px}
.proj-desc{color:var(--sub);font-size:14px;line-height:1.8;margin-bottom:18px;flex:1}
.proj-techs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}
.proj-tech{font-size:11.5px;padding:4px 12px;border-radius:999px;font-weight:600;letter-spacing:0.03em;font-family:'Fira Code',monospace}
.proj-acts{display:flex;gap:10px}
.proj-btn{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:700;padding:8px 17px;border-radius:9px;text-decoration:none;transition:all 0.25s;border:1px solid;cursor:pointer;background:none;font-family:'Space Grotesk',sans-serif;letter-spacing:0.02em}
.proj-btn:hover{transform:translateY(-3px)}
.proj-gh{color:var(--sub);border-color:var(--border2);background:rgba(255,255,255,0.04)}
.proj-gh:hover{color:var(--text);border-color:var(--border2);background:rgba(255,255,255,0.08);box-shadow:0 4px 16px rgba(0,0,0,0.4)}

/* ─── ACHIEVEMENTS ─── */
.ach-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-bottom:24px}
.ach-card{background:var(--glass);backdrop-filter:blur(12px);border:1px solid var(--border);border-radius:14px;padding:20px 24px;display:flex;align-items:center;gap:14px;transition:all 0.3s}
.ach-card:hover{background:var(--glass2);border-color:var(--border2);transform:translateY(-3px);box-shadow:0 16px 40px rgba(0,0,0,0.4)}
.ach-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
.ach-t{color:var(--text);font-size:14px;font-weight:600;line-height:1.4;margin-bottom:5px}
.ach-d{font-family:'Fira Code',monospace;font-size:11px;color:var(--dim);letter-spacing:0.05em}
.intern-card{background:var(--glass);backdrop-filter:blur(16px);border:1px solid var(--border);border-radius:var(--r);padding:30px 34px;position:relative;overflow:hidden}
.intern-top{position:absolute;top:0;left:0;right:0;height:2px;background:var(--g1);border-radius:18px 18px 0 0;box-shadow:0 0 20px rgba(129,140,248,0.5)}
.intern-row{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:16px;flex-wrap:wrap}
.intern-title{color:var(--text);font-size:19px;font-weight:800;margin-bottom:4px;font-family:'Outfit',sans-serif}
.intern-sub{color:var(--sub);font-size:13px}
.intern-badge{background:rgba(52,211,153,0.1);color:var(--green);border:1px solid rgba(52,211,153,0.25);border-radius:999px;font-size:12px;padding:7px 18px;font-weight:700;white-space:nowrap;font-family:'Fira Code',monospace;box-shadow:0 0 16px rgba(52,211,153,0.15)}
.intern-desc{color:var(--sub);font-size:14px;line-height:1.9}
.intern-desc b{color:var(--orange);font-weight:600}

/* ─── CONTACT ─── */
.ct-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start}
.ct-intro{color:var(--sub);font-size:15px;line-height:1.9;margin-bottom:32px;max-width:380px}
.ct-links{display:flex;flex-direction:column;gap:12px;margin-bottom:28px}
.ct-link{display:flex;align-items:center;gap:14px;padding:15px 20px;border-radius:14px;border:1px solid var(--border);background:var(--glass);backdrop-filter:blur(12px);text-decoration:none;transition:all 0.3s;cursor:pointer}
.ct-link:hover{border-color:rgba(129,140,248,0.35);background:var(--glass2);transform:translateX(5px);box-shadow:0 0 20px rgba(129,140,248,0.1),0 8px 24px rgba(0,0,0,0.4)}
.ct-link-ico{width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ct-link-lbl{color:var(--text);font-size:14px;font-weight:700}
.ct-link-sub{color:var(--dim);font-size:12px;margin-top:1px}
.ct-link-arr{margin-left:auto;color:var(--dim);font-size:18px}
.loc-block{display:flex;align-items:center;gap:12px;padding:15px 20px;background:var(--glass);border:1px solid var(--border);border-radius:12px;backdrop-filter:blur(12px)}
.loc-t{color:var(--text);font-size:13.5px;font-weight:600}
.loc-s{color:var(--dim);font-size:12px;margin-top:2px}
.form-card{background:var(--glass);backdrop-filter:blur(20px);border:1px solid var(--border);border-radius:var(--r);padding:32px;position:relative;overflow:hidden}
.form-top{position:absolute;top:0;left:0;right:0;height:2px;border-radius:18px 18px 0 0;box-shadow:0 0 16px rgba(129,140,248,0.4)}
.form-title{color:var(--text);font-size:19px;font-weight:800;margin-bottom:6px;font-family:'Outfit',sans-serif}
.form-sub{color:var(--dim);font-size:13px;margin-bottom:26px}
.form-lbl{display:block;color:var(--sub);font-size:11px;font-weight:600;margin-bottom:7px;text-transform:uppercase;letter-spacing:0.1em;font-family:'Fira Code',monospace}
.form-in{background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:10px;padding:12px 15px;color:var(--text);font-size:14px;width:100%;font-family:'Space Grotesk',sans-serif;outline:none;transition:all 0.25s}
.form-in:focus{border-color:rgba(129,140,248,0.5);background:rgba(129,140,248,0.05);box-shadow:0 0 0 3px rgba(129,140,248,0.1),0 0 20px rgba(129,140,248,0.1)}
.form-in::placeholder{color:var(--dim)}
.form-f{margin-bottom:16px}
.form-f:last-of-type{margin-bottom:24px}
.btn-send{width:100%;background:var(--g2);color:white;border:none;border-radius:11px;padding:15px;font-size:15px;font-weight:700;cursor:pointer;font-family:'Space Grotesk',sans-serif;letter-spacing:0.03em;display:flex;align-items:center;justify-content:center;gap:9px;transition:all 0.3s;box-shadow:0 0 24px rgba(129,140,248,0.35),0 4px 20px rgba(0,0,0,0.4);position:relative;overflow:hidden}
.btn-send:hover{transform:translateY(-3px);box-shadow:0 0 40px rgba(129,140,248,0.6),0 0 80px rgba(236,72,153,0.25),0 10px 32px rgba(0,0,0,0.5)}
.form-note{color:var(--dim);font-size:12px;text-align:center;margin-top:12px;font-family:'Fira Code',monospace}

/* ─── FOOTER ─── */
.footer{border-top:1px solid var(--border);padding:44px 0 56px;text-align:center;position:relative;z-index:2}
.foot-socials{display:flex;justify-content:center;gap:10px;margin-bottom:24px}
.foot-si{width:40px;height:40px;border-radius:10px;border:1px solid var(--border);background:var(--glass);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;text-decoration:none;transition:all 0.3s;cursor:pointer}
.foot-si:hover{border-color:var(--border2);transform:translateY(-4px);background:var(--glass2);box-shadow:0 8px 24px rgba(0,0,0,0.4)}
.foot-credit{color:var(--dim);font-size:13.5px}
.foot-credit span{background:var(--g1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:700}
.foot-copy{color:var(--dim);font-size:12px;margin-top:6px;opacity:0.4;font-family:'Fira Code',monospace}

/* ─── TOAST ─── */
.toast{position:fixed;bottom:28px;right:28px;z-index:999;padding:14px 24px;border-radius:12px;font-size:14px;font-weight:500;animation:toastIn 0.3s ease;backdrop-filter:blur(16px)}
@keyframes toastIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.toast-ok{background:rgba(52,211,153,0.1);border:1px solid rgba(52,211,153,0.3);color:var(--green);box-shadow:0 0 20px rgba(52,211,153,0.15)}
.toast-err{background:rgba(248,113,113,0.1);border:1px solid rgba(248,113,113,0.3);color:#fca5a5;box-shadow:0 0 20px rgba(248,113,113,0.15)}

/* ─── RESPONSIVE ─── */
@media(max-width:900px){
  .hero-grid{grid-template-columns:1fr;gap:56px}
  .hero-vis{order:-1}
  .edu-grid{grid-template-columns:1fr}
  .sk-grid{grid-template-columns:1fr}
  .proj-grid{grid-template-columns:1fr}
  .ach-grid{grid-template-columns:1fr}
  .ct-grid{grid-template-columns:1fr;gap:44px}
  .stats-row{grid-template-columns:repeat(2,1fr)}
  .nav-links{display:none}
  .nav-mob-btn{display:block}
}
@media(max-width:520px){
  .hero-ctas{flex-direction:column}
  .btn-glow,.btn-glass{width:100%;text-align:center}
  .stats-row{grid-template-columns:repeat(2,1fr)}
  .intern-row{flex-direction:column}
}
      `}</style>

      {/* BG LAYERS */}
      <div className="orbs"><div className="orb orb1"/><div className="orb orb2"/><div className="orb orb3"/></div>
      <div className="grid-tex"/>

      {/* FLOATING PARTICLES */}
      <FloatingParticles />

      {/* NAV */}
      <nav className={`nav${scrolled?" on":""}`}>
        <div className="nav-in">
          <a className="nav-logo" onClick={()=>go("Home")}>
            <span className="logo-r">R</span><span style={{color:"var(--text)"}}>ADHIKA</span>
            <span className="logo-dot"/>
          </a>
          <div className="nav-links">
            {NAV.map(l=><button key={l} className={`nl${active===l?" on":""}`} onClick={()=>go(l)}>{l}</button>)}
          </div>
          <button className="nav-mob-btn" onClick={()=>setMob(o=>!o)}>☰</button>
        </div>
      </nav>

      <div className={`mob-menu${mob?" on":""}`}>
        {NAV.map(l=><button key={l} className={`mob-nl${active===l?" on":""}`} onClick={()=>go(l)}>{l}</button>)}
      </div>

      {toast&&<div className={`toast toast-${toast.t}`}>{toast.t==="ok"?"✓ ":"⚠ "}{toast.m}</div>}

      <div className="wrap">

        {/* ── HERO ── */}
        <section className="hero" id="Home">
          <div className="hero-grid">
            <div style={{animation:"fadeInUp 0.9s ease both"}}>
              <style>{`@keyframes fadeInUp{from{opacity:0;transform:translateY(44px)}to{opacity:1;transform:translateY(0)}}`}</style>
              <div className="hero-badge">
                <span className="hero-badge-dot"/>
                <span className="hero-badge-txt">available_for_opportunities</span>
              </div>
              <h1 className="hero-h">
                Hi, I'm<br/>
                <span className="hero-name-g">MOKKA RADHIKA.</span>
              </h1>
              <div className="hero-role">
                <TypeWriter texts={["Full Stack Developer","Java & React Specialist","Cloud Security Enthusiast","Problem Solver"]}/>
              </div>
              <p className="hero-desc">
                Computer Science graduate mastering the full software lifecycle — from pixel-perfect <b>Frontend</b> interfaces to scalable <b>Backend</b> systems, robust <b>Databases</b>, and secure <b>Cloud</b> architectures.
              </p>
              <div className="hero-ctas">
                <button className="btn-glow" onClick={()=>go("Projects")}>View my work →</button>
                <button className="btn-glass" onClick={()=>go("Contact")}>Let's connect</button>
              </div>
              <div className="hero-socials">
                {SOCIALS.map(s=>(
                  <a key={s.label} href={s.href} className="hero-si" title={s.label} onClick={e=>link(e,s.href)}>
                    <svg viewBox="0 0 24 24" width="17" height="17" fill={s.c}><path d={s.p}/></svg>
                  </a>
                ))}
              </div>
            </div>
            <div className="hero-vis" style={{animation:"fadeInUp 0.9s 0.2s ease both"}}>
              <div className="av-wrap">
                <div className="av-ring-outer">
                  <div className="av-inner">
                    <div className="av-init">RM</div>
                    <div className="av-sub">FULL · STACK · DEV</div>
                  </div>
                </div>
                {[-1,-2,-3].map(i=>(
                  <div key={i} className="av-ring" style={{inset:`${i*-24}px`,animationDelay:`${Math.abs(i)*0.5}s`,animationDuration:`${3+Math.abs(i)*0.6}s`,opacity:0.15-Math.abs(i)*0.04}}/>
                ))}
                {[
                  {l:"Java",       c:"#fb923c", s:{top:22,right:-64}},
                  {l:"React.js",   c:"#38bdf8", s:{bottom:44,left:-76}},
                  {l:"Spring",     c:"#34d399", s:{top:88,left:-82}},
                  {l:"8.4 CGPA",   c:"#a78bfa", s:{bottom:8,right:-62}},
                ].map(b=>(
                  <div key={b.l} className="av-tag" style={{...b.s, color:b.c, borderColor:`${b.c}35`, boxShadow:`0 0 14px ${b.c}20`}}>
                    {b.l}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="stats-row">
            {[
              {v:"3+",  l:"Projects Built", i:"⬡"},
              {v:"8.4", l:"CGPA",           i:"◈"},
              {v:"5+",  l:"Certifications", i:"◎"},
              {v:"10+", l:"Technologies",   i:"◐"},
            ].map((s,i)=>(
              <FadeUp key={s.l} delay={0.08*i}>
                <TiltCard className="stat-card" glowColor="#818cf8">
                  <div className="stat-ico" style={{color:["#38bdf8","#fb923c","#a78bfa","#34d399"][i]}}>{s.i}</div>
                  <div className="stat-v">{s.v}</div>
                  <div className="stat-l">{s.l}</div>
                </TiltCard>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section className="sec" id="Education">
          <FadeUp>
            <div className="sec-head">
              <div className="sec-tag"><div className="sec-line"/><span className="sec-code">// background</span></div>
              <h2 className="sec-h"><span className="sec-h-grad">Education</span></h2>
              <p className="sec-sub">Academic journey and qualifications that shaped my foundation.</p>
            </div>
          </FadeUp>
          <div className="edu-grid">
            {EDU.map((e,i)=>(
              <FadeUp key={i} delay={0.1*i}>
                <TiltCard className="edu-card" glowColor={e.c1}>
                  <div className="edu-glow" style={{background:`linear-gradient(90deg,${e.c1},${e.c2},transparent)`,boxShadow:`0 0 16px ${e.c1}40`}}/>
                  <span className="edu-score" style={{background:`${e.c1}15`,color:e.c1,border:`1px solid ${e.c1}30`,fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:20}}>{e.score}</span>
                  <h3 className="edu-deg">{e.deg}</h3>
                  <p className="edu-school">{e.school}</p>
                  <p className="edu-desc">{e.desc}</p>
                  <span className="edu-yr">{e.yr}</span>
                </TiltCard>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section className="sec" id="Skills">
          <FadeUp>
            <div className="sec-head">
              <div className="sec-tag"><div className="sec-line"/><span className="sec-code">// technical_stack</span></div>
              <h2 className="sec-h"><span className="sec-h-grad">Skills & Technologies</span></h2>
              <p className="sec-sub">Tools and frameworks I work with across the full stack.</p>
            </div>
          </FadeUp>
          <div className="sk-grid">
            {SKILLS.map((cat,ci)=>(
              <FadeUp key={ci} delay={0.1*ci}>
                <TiltCard className="sk-card" glowColor={cat.c1}>
                  <div className="sk-top" style={{background:`linear-gradient(90deg,${cat.c1},${cat.c2},transparent)`,boxShadow:`0 0 12px ${cat.c1}50`}}/>
                  <div className="sk-hdr">
                    <div className="sk-icon" style={{background:`${cat.c1}12`,border:`1px solid ${cat.c1}25`,color:cat.c1}}>{cat.icon}</div>
                    <div>
                      <div className="sk-lbl">{cat.label}</div>
                      <div className="sk-cnt">{cat.skills.length}_technologies</div>
                    </div>
                  </div>
                  <div className="sk-div" style={{background:`linear-gradient(90deg,${cat.c1}30,transparent)`}}/>
                  <div className="sk-pills">
                    {cat.skills.map(sk=>(
                      <span key={sk} className="sk-pill" style={{background:`${cat.c1}0c`,border:`1px solid ${cat.c1}22`,color:cat.c1}}>
                        <span className="sk-pip" style={{background:cat.c1,boxShadow:`0 0 6px ${cat.c1}`}}/>
                        {sk}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section className="sec" id="Projects">
          <FadeUp>
            <div className="sec-head">
              <div className="sec-tag"><div className="sec-line"/><span className="sec-code">// projects.map()</span></div>
              <h2 className="sec-h"><span className="sec-h-grad">Projects</span></h2>
              <p className="sec-sub">Things I've designed, built, and shipped.</p>
            </div>
          </FadeUp>
          <div className="proj-grid">
            {PROJECTS.map((p,i)=>(
              <FadeUp key={i} delay={0.1*i}>
                <TiltCard className="proj-card" glowColor={p.c1}>
                  <div className="proj-top" style={{background:`linear-gradient(90deg,${p.c1},${p.c2})`,boxShadow:`0 0 20px ${p.c1}50`}}/>
                  <div className="proj-n" style={{color:p.c1}}>project_{p.n}</div>
                  <h3 className="proj-title">{p.title}</h3>
                  <p className="proj-desc">{p.desc}</p>
                  <div className="proj-techs">
                    {p.tech.map(t=>(
                      <span key={t} className="proj-tech" style={{background:`${p.c1}0e`,color:p.c1,border:`1px solid ${p.c1}22`}}>{t}</span>
                    ))}
                  </div>
                  <div className="proj-acts">
                    <a href={p.gh} className="proj-btn proj-gh" onClick={e=>link(e,p.gh)}>
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      Source Code
                    </a>
                    {p.live!=="#"&&(
                      <a href={p.live} className="proj-btn" style={{background:`${p.c1}12`,borderColor:`${p.c1}35`,color:p.c1,boxShadow:`0 0 14px ${p.c1}20`}} onClick={e=>link(e,p.live)}>
                        ↗ Live Demo
                      </a>
                    )}
                  </div>
                </TiltCard>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── ACHIEVEMENTS ── */}
        <section className="sec" id="Achievements">
          <FadeUp>
            <div className="sec-head">
              <div className="sec-tag"><div className="sec-line"/><span className="sec-code">// achievements[]</span></div>
              <h2 className="sec-h"><span className="sec-h-grad">Achievements</span></h2>
              <p className="sec-sub">Certifications and recognition along the journey.</p>
            </div>
          </FadeUp>
          <div className="ach-grid">
            {ACHS.map((a,i)=>(
              <FadeUp key={i} delay={0.08*i}>
                <div className="ach-card">
                  <div className="ach-dot" style={{background:a.c,boxShadow:`0 0 10px ${a.c}`}}/>
                  <div>
                    <div className="ach-t">{a.t}</div>
                    <div className="ach-d">{a.d}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.3}>
            <div className="intern-card">
              <div className="intern-top"/>
              <div className="intern-row">
                <div>
                  <div className="intern-title">Full Stack Developer Intern</div>
                  <div className="intern-sub">Real-world industry experience · 5 months</div>
                </div>
                <span className="intern-badge">Jan – May 2025</span>
              </div>
              <p className="intern-desc">
                Developed multiple web applications including E-Commerce, Healthcare Management, and Employee Management systems using <b>Java, React.js, Spring Boot</b>, and MySQL. Built REST APIs with Hibernate and MVC architecture. Also worked on cloud security — Multi-Authority Attribute-Based Keyword Search over Encrypted Cloud Data.
              </p>
            </div>
          </FadeUp>
        </section>

        {/* ── CONTACT ── */}
        <section className="sec" id="Contact">
          <FadeUp>
            <div className="sec-head">
              <div className="sec-tag"><div className="sec-line"/><span className="sec-code">// contact.init()</span></div>
              <h2 className="sec-h"><span className="sec-h-grad">Get In Touch</span></h2>
              <p className="sec-sub">Let's build something great together.</p>
            </div>
          </FadeUp>
          <div className="ct-grid">
            <FadeUp delay={0.1}>
              <div>
                <p className="ct-intro">I'm actively seeking opportunities to kickstart my career in software development. Whether it's a full-time role, internship, or collaboration — I'd love to connect!</p>
                <div className="ct-links">
                  {SOCIALS.map(s=>(
                    <a key={s.label} href={s.href} className="ct-link" onClick={e=>link(e,s.href)}>
                      <div className="ct-link-ico" style={{background:`${s.c}0f`,border:`1px solid ${s.c}22`}}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill={s.c}><path d={s.p}/></svg>
                      </div>
                      <div>
                        <div className="ct-link-lbl">{s.label}</div>
                        <div className="ct-link-sub">{s.sub}</div>
                      </div>
                      <span className="ct-link-arr">→</span>
                    </a>
                  ))}
                </div>
                <div className="loc-block">
                  <span style={{fontSize:20}}>📍</span>
                  <div>
                    <div className="loc-t">Nellore, Andhra Pradesh</div>
                    <div className="loc-s">Open to relocate anywhere in India</div>
                  </div>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="form-card">
                <div className="form-top" style={{background:"var(--g1)"}}/>
                <div className="form-title">Send a Message</div>
                <div className="form-sub">Opens your mail client, pre-filled and ready to send.</div>
                {["name","email","message"].map(f=>(
                  <div className="form-f" key={f}>
                    <label className="form-lbl">{f==="message"?"your_message":f==="email"?"email_address":"your_name"}</label>
                    {f==="message"
                      ? <textarea className="form-in" rows={4} placeholder="Tell me about the opportunity..." style={{resize:"vertical"}} value={form[f]} onChange={e=>setForm({...form,[f]:e.target.value})}/>
                      : <input className="form-in" type={f==="email"?"email":"text"} placeholder={f==="name"?"John Doe":"john@example.com"} value={form[f]} onChange={e=>setForm({...form,[f]:e.target.value})}/>
                    }
                  </div>
                ))}
                <button className="btn-send" onClick={send}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                  Send Message
                </button>
                <p className="form-note">// opens default email client</p>
              </div>
            </FadeUp>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap">
          <div className="foot-socials">
            {SOCIALS.map(s=>(
              <a key={s.label} href={s.href} className="foot-si" title={s.label} onClick={e=>link(e,s.href)}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill={s.c}><path d={s.p}/></svg>
              </a>
            ))}
          </div>
          <p className="foot-credit">Designed & built by <span>Radhika Mokka</span></p>
          <p className="foot-copy">© 2025 · All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

/* ─────── FLOATING PARTICLES CANVAS ─────── */
function FloatingParticles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const COLORS = ["rgba(56,189,248,", "rgba(129,140,248,", "rgba(236,72,153,", "rgba(52,211,153,", "rgba(251,146,60,"];
    const pts = Array.from({length:60},()=>({
      x: Math.random()*W, y: Math.random()*H,
      vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3,
      r: Math.random()*1.8+0.4,
      c: COLORS[Math.floor(Math.random()*COLORS.length)],
      a: Math.random()*0.5+0.15,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = p.c + p.a + ")";
        ctx.fill();
      }
      // Draw subtle connections
      for (let i=0;i<pts.length;i++) {
        for (let j=i+1;j<pts.length;j++) {
          const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y;
          const dist=Math.sqrt(dx*dx+dy*dy);
          if (dist<100) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x,pts[i].y);
            ctx.lineTo(pts[j].x,pts[j].y);
            ctx.strokeStyle=`rgba(129,140,248,${0.06*(1-dist/100)})`;
            ctx.lineWidth=0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize=()=>{ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; };
    window.addEventListener("resize",onResize);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize",onResize); };
  },[]);
  return <canvas ref={canvasRef} className="stars-canvas"/>;
}