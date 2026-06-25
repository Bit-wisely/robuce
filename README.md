# 🤖 Robotics Club UCE // Autonomous Innovation

Welcome to the official repository of the **Robotics Club, UCE (University College of Engineering)**! This is a modern, high-performance, and futuristic multi-page website showcasing the projects, team, events, and certificates of the UCE Robotics Club.

The website features an immersive design with a 3D parallax layout, custom particle engines (flying birds and autumn leaves), glassmorphic panels, and neumorphic interactive components.

---

## 🌐 Live Pages Included
The website has been refactored from a single-page layout into a modular, clean multi-page structure:
* **[Home / Index](index.html)** - Overview of the club, core objectives, and membership registration.
* **[About Us](about.html)** - Detailed mission statement, history, and structural vision.
* **[Our Team](team.html)** - Profiles of core organizers, leads, and members powering the club.
* **[Events](events.html)** - Timeline of workshops, competitions, exhibitions, and hackathons.
* **[Certificates](certificates.html)** - Interactive credential verification and showcase zone.

---

## 🎨 Design System & Aesthetics
* **Theme**: Cyber-neon / Futuristic (sleek dark mode)
* **Colors**: 
  - 🌸 **Brand Pink**: `#ff4b8b` (accent & hover highlights)
  - 🍊 **Brand Orange**: `#ff6b35` (secondary accents & notifications)
  - 💠 **Brand Cyan**: `#00f5ff` (cybernetic glows)
  - 🌌 **Dark Background**: `#09090b`
* **Features**:
  - **Dynamic Background Parallax**: Mouse tracking offsets the futuristic Japanese robot backdrop.
  - **3D Particle System**: Interactive 3D birds flying across the viewport and leaves drifting dynamically.
  - **Glassmorphism (Glass-UI)**: Ultra-sleek translucent cards with frosted borders and backdrop blur.
  - **Neumorphism**: High-contrast, interactive neumorphic action buttons.

---

## 📁 File Structure
```files
Robuce/
├── index.html           # Home / Overview Page
├── about.html           # About Us Page
├── team.html            # Club Organizers & Leads Page
├── events.html          # Workshops, Hackathons & Timelines
├── certificates.html    # Certificate Verification Page
├── css/
│   └── style.css        # Global CSS stylesheet & layout utilities
├── js/
│   └── main.js          # Particle emitter engines, mobile drawer toggle, parallax tracker
└── assets/
    └── images/
        └── japanese_robot_bg.png # Futuristic background image asset
```

---

## 🛠️ Setup & Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bitwisely/Robuce.git
   cd Robuce
   ```

2. **Open index.html**:
   Since the project is built using pure semantic HTML, Tailwind CSS, Vanilla CSS, and Modern JavaScript, you do not need to install any compilers or npm dependencies! Just open `index.html` in any browser or launch it using:
   - VS Code "Live Server" extension
   - `python -m http.server`
   - Or simply double-clicking `index.html`.

---

## 🚀 Future Roadmap
- [ ] Connect certificates verify lookup input to a backend database API.
- [ ] Dynamic event registration portals.
- [ ] Portfolio gallery for club member projects.

---

*Made with ❤️ by the **Robotics Club UCE** team.*
