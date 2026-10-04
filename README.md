# privacybrew.github.io

Hosts the third-party cookie test used by the Browser Privacy Check at
https://privacybrew.app/check.html. It must stay on a different website than
privacybrew.app (github.io is on the Public Suffix List, so it counts as a
separate site), and must not use a custom domain.

The page stores nothing beyond a 60-second test cookie and sends no data
anywhere; it only reports "cookies allowed / kept separate / blocked" to the
parent page.
