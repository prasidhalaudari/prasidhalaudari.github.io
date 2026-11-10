// Renders content.js into the page and runs the interactive parts.
(function () {
  const $ = (id) => document.getElementById(id);
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const S = SITE;

  // ---------- Google Analytics 4 ----------
  if (typeof GA_MEASUREMENT_ID === "string" && /^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID)) {
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);
  }
  // Tracks clicks on anything with data-track="event_name" (shows up in GA → Events)
  function track(name, params) {
    if (window.gtag) window.gtag("event", name, params || {});
  }
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-track]");
    if (t) track(t.dataset.track, { link_url: t.href || "", link_text: t.textContent.trim() });
  });

  // ---------- Photo viewer ----------
  const box = $("lightbox");
  const lbImg = $("lb-img");
  const lbErr = $("lb-error");
  const lbCap = $("lb-caption");
  let gallery = [];
  let index = 0;

  function showPhoto(i) {
    index = (i + gallery.length) % gallery.length;
    const item = gallery[index];
    lbErr.hidden = true;
    lbImg.hidden = false;
    lbImg.src = item.src;
    lbImg.alt = item.alt || item.caption || "";
    const count = gallery.length > 1 ? index + 1 + " of " + gallery.length : "";
    lbCap.textContent = [item.caption, count].filter(Boolean).join("  ·  ");
    $("lb-prev").hidden = $("lb-next").hidden = gallery.length < 2;
    if (gallery.length > 1) new Image().src = gallery[(index + 1) % gallery.length].src;
  }
  lbImg.addEventListener("error", () => { lbImg.hidden = true; lbErr.hidden = false; });

  function openViewer(items, i) {
    gallery = items;
    showPhoto(i);
    box.showModal();
    track("photo_open", { photo: items[i].src });
  }
  $("lb-close").addEventListener("click", () => box.close());
  $("lb-prev").addEventListener("click", () => showPhoto(index - 1));
  $("lb-next").addEventListener("click", () => showPhoto(index + 1));
  // Clicking the dark area around the photo closes the viewer.
  box.addEventListener("click", (e) => {
    if (e.target === box || e.target === $("lb-stage")) box.close();
  });
  box.addEventListener("keydown", (e) => {
    if (gallery.length < 2) return;
    if (e.key === "ArrowLeft") showPhoto(index - 1);
    if (e.key === "ArrowRight") showPhoto(index + 1);
  });
  // Swipe left/right on phones.
  let touchX = null;
  box.addEventListener("touchstart", (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", (e) => {
    if (touchX === null || gallery.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showPhoto(index + (dx < 0 ? 1 : -1));
    touchX = null;
  });
  box.addEventListener("close", () => { lbImg.removeAttribute("src"); });

  // A photo that opens the viewer when clicked. Calls onFail if the file is missing.
  function photoButton(cls, items, i, eager, onFail) {
    const item = items[i];
    const btn = el("button", cls);
    btn.type = "button";
    btn.setAttribute("aria-label", "View larger photo: " + (item.alt || item.caption || "photo"));
    const img = el("img");
    img.src = item.src;
    img.alt = item.alt || item.caption || "";
    if (item.width) { img.width = item.width; img.height = item.height; }
    img.decoding = "async";
    img.loading = eager ? "eager" : "lazy";
    img.addEventListener("error", () => onFail(btn));
    btn.appendChild(img);
    btn.addEventListener("click", () => openViewer(items, i));
    return btn;
  }

  // ---------- Header / hero ----------
  document.title = S.name + " — Portfolio";
  $("brand").textContent = S.initials;
  $("hero-status").textContent = S.availability;
  $("hero-eyebrow").textContent = S.role;
  $("hero-name").textContent = S.name;
  $("hero-tagline").textContent = S.tagline;
  $("footer-name").textContent = S.name;
  $("year").textContent = new Date().getFullYear();
  const resume = $("hero-resume");
  if (S.resumeUrl) resume.href = S.resumeUrl; else resume.remove();

  const photos = (S.photos || []).filter((p) => p && p.src);
  const initialsAvatar = () => {
    const d = el("div", "hero-photo avatar", S.initials);
    d.setAttribute("aria-hidden", "true");
    return d;
  };
  if (photos[0]) {
    $("hero-photo-wrap").appendChild(
      photoButton("hero-photo", photos, 0, true, (b) => b.replaceWith(initialsAvatar()))
    );
  } else {
    $("hero-photo-wrap").appendChild(initialsAvatar());
  }

  // Numbers strip
  const courseCount = (S.coursework || []).reduce((n, y) => n + y.courses.length, 0);
  const langs = (S.skills || []).find((g) => g.group === "Languages");
  [
    [S.projects.length, "Projects"],
    [courseCount, "Courses studied"],
    [langs ? langs.items.length : 0, "Programming languages"],
    [S.graduates, "Graduating"],
  ].forEach(([value, label]) => {
    if (!value) return;
    const d = el("div", "stat");
    d.appendChild(el("dd", null, String(value)));
    d.appendChild(el("dt", null, label));
    $("stats").appendChild(d);
  });

  // ---------- About ----------
  S.about.forEach((p) => $("about-text").appendChild(el("p", null, p)));
  (S.facts || []).forEach(([k, v]) => {
    const row = el("div");
    row.appendChild(el("dt", null, k));
    row.appendChild(el("dd", null, v));
    $("facts").appendChild(row);
  });
  const aboutBox = $("about-photo");
  const aboutIdx = photos[1] ? 1 : photos[0] ? 0 : -1;
  const dropAboutPhoto = () => {
    aboutBox.remove();
    document.querySelector(".about-grid").classList.add("no-photo");
  };
  if (aboutIdx >= 0) aboutBox.appendChild(photoButton("portrait", photos, aboutIdx, false, dropAboutPhoto));
  else dropAboutPhoto();

  // ---------- Project covers (shown until real screenshots are added) ----------
  const CAL = '<rect x="140" y="45" width="120" height="115" rx="12"/><path d="M140 78h120M170 35v20M230 35v20"/>';
  const COVERS = {
    hospital: CAL + '<path stroke-width="6" d="M200 98v42M179 119h42"/>',
    gym: CAL + '<path stroke-width="5" d="M178 119h44M178 103v32M222 103v32M167 110v18M233 110v18"/>',
    devices:
      '<rect x="85" y="35" width="195" height="130" rx="10"/><path d="M85 64h195"/><circle cx="102" cy="50" r="3"/><circle cx="116" cy="50" r="3"/>' +
      '<path d="M108 88h70M108 106h110M108 124h50"/>' +
      '<rect x="250" y="72" width="72" height="112" rx="12" fill="var(--cover-bg)"/><path d="M276 170h20"/>',
    island:
      '<circle cx="292" cy="60" r="24"/><path d="M125 130q55-38 110 0"/>' +
      '<path d="M178 114q4-36 16-58M194 56q-24-9-42 7M194 56q22-13 42 4M194 56q-9 18-26 27M194 56q13 12 20 31"/>' +
      '<path d="M40 142q20-15 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0"/><path d="M70 166q20-15 40 0t40 0 40 0 40 0 40 0 40 0 40 0"/>',
  };
  function coverArt(kind) {
    const d = el("div", "media cover");
    d.setAttribute("aria-hidden", "true");
    d.innerHTML =
      '<svg viewBox="0 0 400 200" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
      (COVERS[kind] || COVERS.devices) + "</svg>";
    return d;
  }

  // ---------- Projects ----------
  const plist = $("project-list");
  S.projects.forEach((p) => {
    const card = el("article", "card" + (p.featured ? " featured" : ""));
    const shots = (p.images || []).filter((i) => i && i.src).map((i) => ({
      src: i.src,
      caption: i.caption || p.title,
      alt: i.alt || i.caption || "Screenshot of " + p.title,
    }));
    if (shots.length) {
      const btn = photoButton("media has-photo", shots, 0, false, (b) => b.replaceWith(coverArt(p.cover)));
      if (shots.length > 1) btn.appendChild(el("span", "photo-count", shots.length + " photos"));
      card.appendChild(btn);
    } else {
      card.appendChild(coverArt(p.cover));
    }

    const body = el("div", "card-body");
    if (p.status) body.appendChild(el("span", "badge", p.status));
    body.appendChild(el("h3", null, p.title));
    body.appendChild(el("p", null, p.description));
    const tags = el("div", "tags");
    (p.tags || []).forEach((t) => tags.appendChild(el("span", "tag", t)));
    body.appendChild(tags);
    const links = el("div", "card-links");
    [["Live ↗", p.link, "project_demo"], ["Code ↗", p.code, "project_code"]].forEach(([label, url, ev]) => {
      if (!url) return;
      const a = el("a", null, label);
      a.href = url; a.target = "_blank"; a.rel = "noopener";
      a.dataset.track = ev;
      links.appendChild(a);
    });
    if (links.children.length) body.appendChild(links);
    card.appendChild(body);
    plist.appendChild(card);
  });

  // ---------- Skills ----------
  const slist = $("skill-list");
  (S.skills || []).forEach((g) => {
    const group = el("div", "skill-group");
    group.appendChild(el("h3", null, g.group));
    const tags = el("div", "tags");
    g.items.forEach((t) => tags.appendChild(el("span", "tag", t)));
    group.appendChild(tags);
    slist.appendChild(group);
  });
  if (!slist.children.length) $("skills").remove();

  // ---------- Coursework (one tab per year, newest open first) ----------
  const years = S.coursework || [];
  const tabs = [];
  const panels = [];
  function selectYear(i, focus) {
    tabs.forEach((t, n) => {
      t.setAttribute("aria-selected", String(n === i));
      t.tabIndex = n === i ? 0 : -1;
      panels[n].hidden = n !== i;
    });
    if (focus) tabs[i].focus();
  }
  years.forEach((y, i) => {
    const tab = el("button", "tab", y.year);
    tab.type = "button";
    tab.id = "tab-" + y.year;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", "panel-" + y.year);
    tab.addEventListener("click", () => selectYear(i));
    tab.addEventListener("keydown", (e) => {
      const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (step) { e.preventDefault(); selectYear((i + step + years.length) % years.length, true); }
    });
    tabs.push(tab);
    $("course-tabs").appendChild(tab);

    const panel = el("div", "course-year");
    panel.id = "panel-" + y.year;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tab.id);
    const ul = el("ul", "courses");
    y.courses.forEach(([code, title, level]) => {
      const li = el("li");
      li.appendChild(el("span", "code", code));
      li.appendChild(el("span", "course-title", title));
      if (level) li.appendChild(el("span", "course-meta", "Level " + level));
      ul.appendChild(li);
    });
    panel.appendChild(ul);
    panels.push(panel);
    $("course-panels").appendChild(panel);
  });
  if (years.length) selectYear(years.length - 1);
  else $("coursework").remove();

  // ---------- Learning ----------
  const llist = $("learning-list");
  S.learning.forEach((l) => {
    const row = el("div", "learn");
    const head = el("div", "learn-head");
    const hasBar = typeof l.progress === "number";
    head.appendChild(el("strong", null, l.topic));
    if (hasBar) head.appendChild(el("span", "pct", l.progress + "%"));
    row.appendChild(head);
    if (l.note) row.appendChild(el("p", null, l.note));
    if (hasBar) {
      const bar = el("div", "bar");
      const fill = el("div", "fill");
      fill.style.width = Math.max(0, Math.min(100, l.progress)) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
    }
    llist.appendChild(row);
  });

  // ---------- Journey ----------
  const tl = $("timeline");
  S.journey.forEach((j) => {
    const li = el("li");
    li.appendChild(el("span", "when", j.when));
    li.appendChild(el("strong", null, j.what));
    if (j.where) li.appendChild(el("span", "where", j.where));
    tl.appendChild(li);
  });

  // ---------- Contact ----------
  $("contact-blurb").textContent = S.contactBlurb;
  const cl = $("contact-links");
  S.contact.forEach((c) => {
    const isMail = c.url.startsWith("mailto:");
    const a = el("a", "btn" + (isMail ? " primary" : ""), c.label);
    a.href = c.url;
    if (!isMail) { a.target = "_blank"; a.rel = "noopener"; }
    a.dataset.track = "contact_" + c.label.toLowerCase();
    cl.appendChild(a);
    if (isMail) {
      const address = c.url.replace("mailto:", "");
      const copy = el("button", "btn", "Copy email");
      copy.type = "button";
      copy.dataset.track = "contact_copy_email";
      copy.addEventListener("click", async () => {
        let ok = false;
        try {
          await navigator.clipboard.writeText(address);
          ok = true;
        } catch (_) {
          const t = el("textarea");
          t.value = address;
          t.style.position = "fixed";
          t.style.opacity = "0";
          document.body.appendChild(t);
          t.select();
          try { ok = document.execCommand("copy"); } catch (__) {}
          t.remove();
        }
        copy.textContent = ok ? "Copied!" : address;
        if (ok) setTimeout(() => { copy.textContent = "Copy email"; }, 2000);
      });
      cl.appendChild(copy);
    }
  });

  // ---------- Light / dark theme ----------
  const root = document.documentElement;
  const toggle = $("theme-toggle");
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  function syncTheme() {
    const light = root.dataset.theme === "light";
    toggle.setAttribute("aria-label", "Switch to " + (light ? "dark" : "light") + " theme");
    metaTheme.content = light ? "#fafaf9" : "#0f0f12";
  }
  toggle.addEventListener("click", () => {
    const light = root.dataset.theme !== "light";
    if (light) root.dataset.theme = "light"; else delete root.dataset.theme;
    try { localStorage.setItem("theme", light ? "light" : "dark"); } catch (_) {}
    syncTheme();
    track("theme_toggle", { theme: light ? "light" : "dark" });
  });
  syncTheme();

  // ---------- Phone menu ----------
  const menuBtn = $("menu-toggle");
  const nav = $("site-nav");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); menuBtn.focus(); }
  });
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("open") && !e.target.closest(".nav")) setMenu(false);
  });

  // ---------- Scroll progress ----------
  const bar = $("progress");
  let ticking = false;
  function paintProgress() {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, scrollY / max) : 0) + ")";
    ticking = false;
  }
  addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(paintProgress); }
  }, { passive: true });
  addEventListener("resize", paintProgress);
  paintProgress();

  // ---------- Highlight the current section in the menu ----------
  const links = [...nav.querySelectorAll("a")];
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => {
          if (a.getAttribute("href") === "#" + en.target.id) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((a) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) spy.observe(target);
    });
  }

  // ---------- Fade sections in as they scroll into view ----------
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!calm && "IntersectionObserver" in window) {
    root.classList.add("animate");
    const seen = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); seen.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach((n) => seen.observe(n));
  }
})();
