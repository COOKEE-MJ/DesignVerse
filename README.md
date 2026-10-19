# DesignVerse — Student Design & Innovation Fest

A responsive, editorial frontend landing page for a premier student festival celebrating design, creativity, experimentation, and emerging technology.

🌐 **Live Website**: [https://cookee-mj.github.io/DesignVerse/](https://cookee-mj.github.io/DesignVerse/)

---

## 📸 Preview

![DesignVerse Landing Page Preview](assets/preview.png)

---

## Website Architecture & User Flow

```mermaid
flowchart TD
    %% Light Palette Node Styling
    classDef heroNode fill:#EEF2FF,stroke:#4353F5,stroke-width:1.5px,color:#202127;
    classDef showcaseNode fill:#FAF8F2,stroke:#4353F5,stroke-dasharray: 3 3,stroke-width:1.2px,color:#202127;
    classDef sectionNode fill:#FAF8F2,stroke:#202127,stroke-width:1.2px,color:#202127;
    classDef regNode fill:#FFF1F0,stroke:#FF6855,stroke-width:1.5px,color:#202127;
    classDef modalNode fill:#FEF2F2,stroke:#EF4444,stroke-width:1.5px,color:#202127;
    classDef commentNode fill:#F0FDF4,stroke:#16A34A,stroke-width:1.5px,color:#202127;
    classDef mascotNode fill:#F5F3FF,stroke:#7C3AED,stroke-width:1.5px,color:#202127;
    classDef navNode fill:#F8FAFC,stroke:#64748B,stroke-width:1.2px,color:#202127;

    subgraph Navigation["Navigation & Global Controls"]
        NAV1["Site Header & Brand Identity"]:::navNode
        NAV2["Smooth Anchor Menu Links"]:::navNode
        NAV3["Quick 'Register' CTA"]:::regNode
        NAV1 --> NAV2
        NAV1 --> NAV3
    end

    subgraph Hero["Hero Section (First Impression)"]
        H1["Headline: Step into the world of what's next"]:::heroNode
        H2["Event Metadata: 14 Nov 2026 · 10:00 AM – 6:00 PM · New Delhi"]:::heroNode
        H3["Dual CTAs: Register for the Fest / Explore Experiences"]:::heroNode
        
        subgraph Showcase["Ideas Take Shape Stage"]
            S1["01 The Sketchbook (Concept & Rough Sketches)"]:::showcaseNode
            S2["02 The Playground (Typography & Color Experiments)"]:::showcaseNode
            S3["03 The Showcase (Interactive Prototypes)"]:::showcaseNode
        end

        H1 --> H2 --> H3
        H3 -.-> Showcase
    end

    subgraph Exploration["Festival Experience Journey"]
        AB["About Section: Core Principles & Philosophy"]:::sectionNode
        EXP["Curated Experiences (Interaction, Physical Computing, Visual, Bio)"]:::sectionNode
        SCH["Interactive Schedule (Doors Open 10:00 AM to Design Awards)"]:::sectionNode
        FAQ["FAQ Accordion (Collapsible Questions & Answers)"]:::sectionNode

        AB --> EXP --> SCH --> FAQ
    end

    subgraph Registration["Interactive Registration Flow"]
        REG1["Registration Form Card"]:::regNode
        REG2["Pass Selection: Student / Group / Virtual"]:::regNode
        REG3["Client-Side Form Validation"]:::regNode
        MODAL["Digital Pass Preview Modal & Confirmation"]:::modalNode

        REG1 --> REG2 --> REG3 --> MODAL
    end

    subgraph Comments["Comments Section (The Conversation Continues)"]
        COM1["Comment Form: Author Name & Thought Textarea"]:::commentNode
        COM2["Real-time 400-Character Counter & Validation"]:::commentNode
        COM3["LocalStorage Engine (Browser Persistence)"]:::commentNode
        COM4["Live Discussion Feed (Newest First + Initial Avatars)"]:::commentNode

        COM1 --> COM2 --> COM3 --> COM4
    end

    subgraph Mascot["Live Companion Mascot (Nova)"]
        NOV1["Multi-Pose Dynamic States (Standing, Sitting, Cheering, Thinking, Waving)"]:::mascotNode
        NOV2["Collision-Free Screen Docking (Left / Right Placement)"]:::mascotNode
        NOV3["Context-Aware Remarks & Celebrations"]:::mascotNode

        NOV1 --> NOV2 --> NOV3
    end

    subgraph Footer["Site Footer"]
        F1["Event Reminder & Schedule Highlights"]:::navNode
        F2["Community Guidelines & Legal Notice"]:::navNode
        F3["Back to Top Smooth Scroller"]:::navNode
    end

    %% Flow Connections
    NAV3 ==> REG1
    H3 ==> EXP
    H3 ==> REG1
    SCH --> REG1
    FAQ --> COM1
    COM4 --> Footer

    Mascot -.->|Observes & Replaces Dialogue| Hero
    Mascot -.->|Reminds 10:00 AM Door Opening| SCH
    Mascot -.->|Docks Left to Avoid Obscuring Form| Registration
    Mascot -.->|Celebrates User Submissions| Comments
```

---

## Features

- **Editorial Hero & Event Overview**: Clean typographic hierarchy with date/time ribbon (`14 November 2026 · 10:00 AM – 6:00 PM IST`) and dual calls to action.
- **"Ideas Take Shape" Showcase**: 3-panel creative experience card spotlighting The Sketchbook (01), The Playground (02), and The Showcase (03).
- **About & Festival Principles**: Highlights core values—*Think Differently*, *Experiment Fearlessly*, and *Make It Real*.
- **Curated Experiences Grid**: Multidisciplinary tracks covering Interaction Design, Physical Computing, Visual Systems, and Bio-Inspired Media.
- **Interactive Schedule Timeline**: Chronological event milestones detailing doors open (10:00 AM), morning keynotes, lab sprints, exhibition, and evening awards.
- **Front-End Registration UI (Demo)**: Client-side pass selection (Student, Group, Virtual), input validation, and an interactive digital pass preview modal. *(Demonstration only; no server-side backend or database)*.
- **Interactive Comments Section**: Editorial conversation feed located directly below the FAQ. Features real-time validation, dynamic character counter (max 400), initial avatar badges with generative gradients, success notifications, and local browser persistence via `localStorage`.
- **Live Companion Mascot ("Nova")**: An interactive companion with multi-pose state changes (standing, sitting on a holographic ring, cheering, thinking, waving), collision-aware side switching, debounced contextual dialogues per section, and click interactions.

---

## Tech Stack

- **HTML5**: Semantic document structure, accessible ARIA attributes, and SVG illustrations
- **CSS3**: Custom design system, CSS Grid, Flexbox, custom properties, and fluid typography
- **JavaScript (Vanilla ES6+)**: Client-side interactivity, modal controls, comment persistence, and mascot state machine (zero third-party libraries)
- **Google Fonts**: Space Grotesk, Inter, and Caveat

---

## Getting Started

This is a pure frontend project with zero external build tooling or runtime dependencies required.

### 1. Clone or Download the Repository
```bash
git clone https://github.com/COOKEE-MJ/DesignVerse.git
cd DesignVerse
```

### 2. Run the Website Locally
Open `index.html` directly in any web browser, or serve it using a local static HTTP server:

**Using Python:**
```bash
python -m http.server 8085
```
Then open: `http://localhost:8085`

**Using Node.js:**
```bash
npx serve .
```

---

## Author

- **Author**: COOKEE-MJ
- **GitHub**: [https://github.com/COOKEE-MJ](https://github.com/COOKEE-MJ)
