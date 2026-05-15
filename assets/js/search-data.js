// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-bio",
          title: "bio",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/bio/";
          },
        },{id: "nav-research",
          title: "research",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-i-presented-at-the-thurgau-experimental-economics-meeting-theem-in-kreuzlingen-switzerland-check-the-program-here",
          title: 'I presented at the Thurgau Experimental Economics Meeting (THEEM) in Kreuzlingen, Switzerland 🇨🇭....',
          description: "",
          section: "News",},{id: "news-i-presented-at-the-european-development-in-a-historical-perspective-conference-hosted-by-the-minda-de-gunzburg-center-for-european-studies-at-harvard-university-and-organized-by-the-seminar-on-european-development-in-a-historical-perspective",
          title: 'I presented at the European Development in a Historical Perspective Conference hosted by...',
          description: "",
          section: "News",},{id: "news-i-presented-at-yale-s-identity-amp-amp-conflict-lab-conference-in-delphi-greece-check-the-program-here",
          title: 'I presented at Yale’s Identity &amp;amp;amp; Conflict Lab conference in Delphi, Greece 🇬🇷....',
          description: "",
          section: "News",},{id: "news-from-june-to-july-2025-i-was-a-visiting-fellow-at-the-international-development-and-global-cooperation-and-social-cohesion-units-at-the-kiel-institute-for-the-world-economy-ifw-kiel-in-germany",
          title: 'From June to July 2025, I was a Visiting Fellow at the International...',
          description: "",
          section: "News",},{id: "news-i-ll-be-part-of-the-2025-2026-ronald-coase-fellowship-cohort-at-the-mercatus-center",
          title: 'I’ll be part of the 2025–2026 Ronald Coase Fellowship cohort at the Mercatus...',
          description: "",
          section: "News",},{id: "news-i-attended-the-2025-empirical-implications-of-theoretical-models-eitm-summer-institute-at-the-university-of-michigan",
          title: 'I attended the 2025 Empirical Implications of Theoretical Models (EITM) Summer Institute at...',
          description: "",
          section: "News",},{id: "news-i-attended-the-4th-annual-political-economy-summer-school-organized-by-the-association-for-comparative-economic-studies-aces-in-zanzibar-tanzania",
          title: 'I attended the 4th annual Political Economy Summer School organized by the Association...',
          description: "",
          section: "News",},{id: "news-i-m-a-traveling-scholar-and-a-guest-researcher-at-the-university-of-botswana-for-the-academic-year-2025-6",
          title: 'I’m a Traveling Scholar and a Guest Researcher at the University of Botswana...',
          description: "",
          section: "News",},{id: "news-i-attended-the-game-theory-political-economy-amp-amp-development-conference-hosted-at-université-mohammed-vi-polytechnique-um6p-in-morocco-check-the-program-here",
          title: 'I attended the Game Theory, Political Economy &amp;amp;amp; Development conference, hosted at Université...',
          description: "",
          section: "News",},{id: "news-we-discussed-my-dissertation-project-at-the-boston-area-working-group-in-african-political-economy-check-the-program-here",
          title: 'We discussed my dissertation project at the Boston Area Working Group in African...',
          description: "",
          section: "News",},{id: "news-i-gave-a-talk-at-the-political-studies-department-seminar-at-the-university-of-botswana",
          title: 'I gave a talk at the Political Studies Department Seminar at the University...',
          description: "",
          section: "News",},{id: "news-i-ll-be-sharing-my-work-at-the-association-for-the-study-of-religion-economics-and-culture-asrec-and-institute-for-the-study-of-religion-economics-and-society-ires-annual-graduate-student-workshop-at-chapman-university-in-orange-ca-june-5-6",
          title: 'I’ll be sharing my work at the Association for the Study of Religion,...',
          description: "",
          section: "News",},{id: "news-i-ll-be-presenting-at-the-european-political-science-society-2026-annual-conference-in-belfast-northern-ireland-june-18-20",
          title: 'I’ll be presenting at the European Political Science Society 2026 Annual Conference in...',
          description: "",
          section: "News",},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
