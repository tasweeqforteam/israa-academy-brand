// Israa brand guideline site: content tables + sequenced motion (GSAP ScrollTrigger)
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const lum = (hex) => { const c = hex.match(/\w\w/g).map((h) => { let v = parseInt(h, 16) / 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

// ---- colour
const C = [
  ["الليلي", "#1B2257", "الحبر: النص والعناوين والأزرار على الفاتح، وأرضية الحملات الليلية.", "#FBF6EC"],
  ["الورقي", "#FBF6EC", "المساحة: 60% من كل تصميم.", "#1B2257"],
  ["الذهبي", "#E6A63C", "إشارة صغيرة على الداكن فقط: نجمة، زر، رقم.", "#1B2257"],
  ["أزرق الشعار", "#2B3A9E", "التمهيد (eyebrow) على الورقي، وجناح الكتاب.", "#FBF6EC"],
  ["ليلكي", "#CDBFF5", "حقل باستيل.", "#1B2257"], ["نعناعي", "#A8DDC5", "حقل باستيل (لا يجاور السماوي).", "#1B2257"],
  ["سماوي", "#A8D8EE", "حقل باستيل.", "#1B2257"], ["خوخي", "#FCE6DB", "حقل باستيل فاتح جدًا.", "#1B2257"],
  ["مرجاني", "#F2A28A", "للأقواس والشرائح فقط.", "#1B2257"], ["أزرق ملكي", "#3A4BC4", "حقل داكن: نص ورقي، والذهبي مسموح.", "#FBF6EC"],
];
$("#swatches").innerHTML = C.map(([n, h, use, ink]) => `<div class="sw" data-r><div class="chip" style="background:${h};color:${ink}">أ</div>
  <div class="meta"><b>${n}</b><span class="num">${h}</span> · تباين النص <span class="num">${ratio(h, ink).toFixed(1)}:1</span><br>${use}</div></div>`).join("");
const P = [["#CDBFF5", "#FBF6EC", "ليلكي / ورقي"], ["#1B2257", "#CDBFF5", "ليلي / ليلكي"], ["#A8D8EE", "#F2A28A", "سماوي / مرجاني"], ["#3A4BC4", "#A8DDC5", "ملكي / نعناعي"], ["#A8DDC5", "#3A4BC4", "نعناعي / ملكي"]];
$("#pairs").innerHTML = P.map(([f, a, n]) => `<div class="pair" data-r style="background:${f}"><span style="color:${lum(f) > 0.3 ? "#1B2257" : "#FBF6EC"}">${n} · <span class="num">${ratio(f, a).toFixed(2)}</span></span><i style="background:${a}"></i></div>`).join("");

// ---- element families
const F = [
  ["نافذة القبّة", "من قبّة الشعار", "قوس رأسه مدبّب كالقبّة، تقف فيه الشخصية وتكسر حدّه. قوس واحد لكل تصميم، يبدأ من أسفل الكادر.", ["عرض القوس 420–440px على بوست 1080.", "لونه يتباين مع الحقل (1.3 على الأقل) ومع ملابس الشخصية.", "نجمة الرأس ليلية على الفاتح وذهبية على الداكن."], "fam-1"],
  ["درب الآيات", "الرحلة خطوةً خطوة", "مسار منقّط بمحطات مرقّمة ينتهي بنجمة ثمانية. للخطوات وطريقة التسجيل وكل ما له ترتيب.", ["3 إلى 5 محطات، قطر 72–84px.", "النقاط بلون الحبر على الفاتح، وبالذهبي على الداكن.", "التسمية بجانب المحطة، سطر أو سطرين."], "fam-2"],
  ["سماء الإسراء", "من الهلال والنجمة", "نجوم ثمانية تكبر من الصغيرة إلى الكبيرة وتتصل بخطوط رفيعة. للتقدّم والإنجاز والبدايات الصغيرة.", ["على الحقول الداكنة فقط.", "النجوم ذهبية، والخطوط #5A64AE بسماكة 2–3px.", "5 نجوم على الأكثر في الكوكبة."], "fam-3"],
  ["جناحا المصحف", "من الكتاب المفتوح", "جناحا الكتاب في الشعار شريط يحمل الشخصية أو يحتضن العنوان.", ["أزرق الشعار فوق، والليلي تحت.", "يلتقيان في المنتصف دائمًا.", "لا يُستخدم مع القوس في نفس التصميم."], "fam-4"],
  ["أختام الرحلة", "للعروض والمعلومات السريعة", "أختام ونجمة «مجانًا» ودائرة «من عمر 4» وملصقات المدة ونوع الحلقة.", ["3 أختام على الأكثر في التصميم.", "دوران ثابت بين ±8°.", "النجمة الذهبية على الداكن فقط."], "fam-5"],
  ["بطاقة المحراب", "لمن يعلّم ولمن يتعلّم", "بطاقات رأسها قبّة للمحفّظين والأرقام والمقارنات.", ["2 أو 3 بطاقات في الصف بنفس الارتفاع.", "التسمية داخل البطاقة أسفل الشخصية.", "بطاقة ليلية واحدة على الأكثر للرقم المهم."], "fam-6"],
];
$("#fams").innerHTML = F.map(([n, src, d, rules, img], i) => `<div class="fam"><div class="demo" data-r><img src="assets/fam/${img}.jpg" alt="${n}" loading="lazy"></div>
  <div data-r><div class="eyebrow" style="margin-bottom:6px"><b>${i + 1}</b>${src}</div><h3 style="font-size:clamp(28px,3.4vw,42px)">${n}</h3><p style="margin-bottom:16px">${d}</p>${rules.map((r) => `<div class="rule"><i></i><span>${r}</span></div>`).join("")}</div></div>`).join("");

// ---- characters (field chosen so clothes always separate from it)
const CH = [["ch01_boy_quran", "#A8D8EE", "طفل بالمصحف"], ["ch02_little_boy_quran", "#FCE6DB", "طفل صغير"], ["ch03_boy_laptop", "#A8DDC5", "طفل أمام اللابتوب"], ["ch04_girl_quran_wave", "#A8DDC5", "طفلة تلوّح"], ["ch05_girl_laptop", "#A8D8EE", "طفلة بالسماعات"],
  ["ch06_siblings_rehal", "#CDBFF5", "أخوان مع الحامل"], ["ch07_father_tablet", "#3A4BC4", "أب بالتابلت"], ["ch08_mother_quran", "#FCE6DB", "أم بالمصحف"], ["ch09_teacher_male", "#A8DDC5", "محفّظ"], ["ch10_teacher_female", "#CDBFF5", "محفّظة"]];
$("#chars").innerHTML = CH.map(([f, bg, n]) => `<figure data-r><div class="ch" style="background:${bg}"><img src="assets/char/${f}.webp" alt="${n}" loading="lazy"></div><figcaption style="font-size:14px;margin-top:8px">${n}</figcaption></figure>`).join("");
$("#photos").innerHTML = ["ph01_child_hands_mushaf", "ph02_man_tablet_rehal", "ph03_mother_daughter_back", "ph04_teen_headphones"].map((f) => `<img data-r src="assets/photo/${f}.jpg" alt="" loading="lazy">`).join("");
$("#posts").innerHTML = ["01", "02", "03", "04", "05", "06", "07", "09", "10", "11", "12", "08-1"].map((n) => `<img data-r src="assets/post/post-${n}.jpg" alt="بوست ${n}" loading="lazy">`).join("");

// ---- motion
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
$$("[data-split]").forEach((el) => { el.innerHTML = el.textContent.trim().split("|").map((l) => l.trim().split(" ").map((w) => `<span class="m"><span class="w">${w}</span></span>`).join(" ")).join("<br>"); });
if (reduce || !window.gsap) { $$("[data-r]").forEach((e) => (e.style.opacity = 1)); }
else {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create("ui", "M0,0 C0.40,0.32 0.48,0.92 1,1");   // measured on the UI reference
  CustomEase.create("pan", "M0,0 C0.56,0 0.56,1 1,1");
  // hero: the window draws from its crown, fills with light, the mark rises, the promise is said word by word
  const h = gsap.timeline({ delay: 0.3 });
  gsap.set("#hero .logo", { clipPath: "inset(0 0 100% 0)" }); gsap.set("#hero .tagline .w", { yPercent: 120, opacity: 0 }); gsap.set("#hfin", { scale: 0, transformOrigin: "50% 50%" });
  h.to(".harc", { attr: { "stroke-dashoffset": 0 }, duration: 1.1, ease: "pan" })
   .to("#hfin", { scale: 1, duration: 0.6, ease: "back.out(2)" }, 0.8)
   .to("#hcR", { attr: { y: -10 }, duration: 1.1, ease: "ui" }, 1.0)
   .to(".harc", { opacity: 0, duration: 0.4 }, 1.6)
   .to("#hero .logo", { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "ui" }, 1.7)
   .to("#hero .tagline .w", { yPercent: 0, opacity: 1, duration: 0.6, ease: "ui", stagger: 0.12 }, 2.3);
  // headings: word by word, as they enter
  $$("section [data-split]").forEach((el) => gsap.fromTo($$(".w", el), { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.65, ease: "ui", stagger: 0.09, scrollTrigger: { trigger: el, start: "top 85%" } }));
  // blocks: one after another, never all at once
  // IntersectionObserver, not precomputed positions: lazy images and fonts change the layout after load
  let q = 0; const io = new IntersectionObserver((es) => { es.filter((e) => e.isIntersecting).forEach((e) => { io.unobserve(e.target);
    gsap.fromTo(e.target, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.72, ease: "ui", delay: (q++ % 6) * 0.12 }); }); setTimeout(() => (q = 0), 50); }, { rootMargin: "0px 0px -8% 0px" });
  $$("[data-r]").forEach((e) => io.observe(e));
  addEventListener("load", () => ScrollTrigger.refresh()); document.fonts.ready.then(() => ScrollTrigger.refresh());
}

// ---- the spine «درب الآيات»: stations along the path, fill follows the scroll
const rail = $("#rail"), path = $("#railFill"), secs = $$("[data-station]");
if (rail && getComputedStyle(rail).display !== "none") {
  const L = path.getTotalLength();
  secs.forEach((s, i) => { const f = (i + 0.5) / secs.length, pt = path.getPointAtLength(f * L);
    const a = document.createElement("a"); a.className = "st"; a.href = "#" + s.id; a.textContent = i + 1; a.style.top = (pt.y / 10) + "%"; a.style.right = `calc(${96 - pt.x}px - 18px)`; rail.appendChild(a); });
  const st = $$("#rail .st");
  path.style.strokeDasharray = `0 12`;
  const upd = () => { const p = scrollY / (document.documentElement.scrollHeight - innerHeight || 1);
    path.style.clipPath = `inset(0 0 ${100 - p * 100}% 0)`;
    const mid = scrollY + innerHeight / 2; let cur = -1; secs.forEach((s, i) => { if (s.offsetTop <= mid) cur = i; });
    st.forEach((a, i) => a.classList.toggle("on", i <= cur));
    const dark = $$("[data-dark]").some((d) => { const r = d.getBoundingClientRect(); return r.top < innerHeight / 2 && r.bottom > innerHeight / 2; });
    document.body.classList.toggle("dark-rail", dark); };
  addEventListener("scroll", upd, { passive: true }); upd();
}
