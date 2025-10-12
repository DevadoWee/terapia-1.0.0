// widgets/load_navbar.js
(function () {
  console.log("[Navbar] Script started"); // ✅ start marker

  const placeholder = document.getElementById('navbar-placeholder');
  if (!placeholder) {
    console.warn("[Navbar] No placeholder found — skipping navbar load.");
    console.log("[Navbar] Script ended (no placeholder)");
    return;
  }

  const depth = window.location.pathname.split('/').length - 2;
  const pathPrefix = depth > 0 ? '../'.repeat(depth) : '';
  const filePath = `${pathPrefix}widgets/custom_navbar.html`;

  console.log("[Navbar] Fetching:", filePath);

  fetch(filePath)
    .then(res => {
      if (!res.ok) throw new Error(`[Navbar] Fetch failed with status ${res.status}`);
      return res.text();
    })
    .then(data => {
      console.log("[Navbar] Fetch succeeded, inserting HTML...");
      placeholder.innerHTML = data;
      console.log("✅ Navbar HTML inserted. Current DOM:");
console.log(placeholder.innerHTML);

      // Highlight current page
      const current = window.location.pathname.split('/').pop() || 'index.html';
      document.querySelectorAll('.nav-item.nav-link').forEach(link => {
        if (link.getAttribute('href') && link.getAttribute('href').includes(current)) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      // Highlight dropdown items
      document.querySelectorAll('.dropdown-menu .dropdown-item').forEach(item => {
        if (item.getAttribute('href') && item.getAttribute('href').includes(current)) {
          item.classList.add('active');
          const parent = item.closest('.nav-item.dropdown');
          if (parent) parent.querySelector('.nav-link').classList.add('active');
        }
      });

      console.log("[Navbar] Navbar inserted and highlights applied ✅");
      console.log("[Navbar] Script ended normally ✅");
    })
    .catch(err => {
      console.error("[Navbar] Error:", err);
      console.log("[Navbar] Script ended with errors ❌");
    });
})();
