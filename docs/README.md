---
home: true
heroImage: logo.svg
heroText:
tagline: A real-time multiplayer battleship game
actionText: Get Started →
actionLink: /guide/
features:
    - title: Fast
      details: Enjoy great performance with Node.js™, Redis™ and WebSockets.
    - title: Simple
      details: Simple server setup and deployment. Check the guide for simple deployment instructions, including for Docker™!
    - title: Powerful
      details: Automatic room cleanup, network loss resilience, and more!
---

### Quick start

```bash
# Clone
git clone https://github.com/umcconnell/destroyer2.git
cd destroyer2

# Setup
# Make sure you have docker and docker-compose installed!
./docker/deploy.sh simple

# Done!
# Visit http://localhost:8080 to get started
```

<footer class="footer">
<a
  href="https://github.com/umcconnell/destroyer2/blob/main/LICENSE.md"
  target="_blank"
  rel="noopener noreferrer"
>
  MIT License
</a>
| Copyright © 2020 Ulysse McConnell and contributors
<p>
  Powered by
  <a
    href="https://vuepress.vuejs.org/"
    target="_blank"
    rel="noopener noreferrer"
  >
    VuePress
  </a>
</p>
<p>
<a :href="$withBase('/legal/privacy')">Privacy Policy</a> |
<a :href="$withBase('/legal/trademark-disclaimer')">Trademark Disclaimer</a>
</p>
</footer>
