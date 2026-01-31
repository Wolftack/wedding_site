(async function () {
  const navTarget = document.getElementById("site-nav");
  if (navTarget) {
    const res = await fetch("partials/nav.html", { cache: "no-store" });
    navTarget.innerHTML = await res.text();
  }
})();
