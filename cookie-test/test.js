// Reports to the parent page whether this third-party frame can use cookies.
(async () => {
  "use strict";
  // Only these pages may receive the result.
  const PARENTS = ["https://privacybrew.app", "http://localhost:8765"];
  const attrs = "; Path=/; Max-Age=60; SameSite=None; Secure";

  function canSet(name, extra) {
    document.cookie = `${name}=1${attrs}${extra}`;
    const ok = document.cookie.split("; ").includes(`${name}=1`);
    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=None; Secure${extra}`;
    return ok;
  }

  let cookieSet = false;
  let partitioned = false;
  try {
    cookieSet = canSet("pb3p", "");
    partitioned = canSet("pb3pp", "; Partitioned");
  } catch (e) { /* cookies unavailable */ }

  // Firefox and Brave let third-party frames set cookies but keep them in a
  // separate jar per website, so they can't follow you. Those browsers report
  // no shared ("unpartitioned") access here; Chrome's default reports true.
  let shared = cookieSet;
  if (cookieSet && document.hasStorageAccess) {
    try { shared = await document.hasStorageAccess(); } catch (e) { /* keep default */ }
  }

  const result = { pbCookieTest: true, unpartitioned: shared, partitioned: cookieSet || partitioned };
  PARENTS.forEach((origin) => {
    try { window.parent.postMessage(result, origin); } catch (e) { /* not this parent */ }
  });
})();
