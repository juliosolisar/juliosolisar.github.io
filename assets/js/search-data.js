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
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-research",
          title: "research",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A growing collection of your cool projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "Edit the `_data/repositories.yml` and change the `github_users` and `github_repos` lists to include your own GitHub profile and repositories.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
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
        },{id: "nav-people",
          title: "people",
          description: "members of the lab or group",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "dropdown-bookshelf",
              title: "bookshelf",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/books/";
              },
            },{id: "dropdown-blog",
              title: "blog",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/blog/";
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
          section: "News",},{id: "news-i-m-attending-the-game-theory-political-economy-amp-amp-development-conference-organized-by-université-mohammed-vi-polytechnique-um6p-in-morocco-i-ll-be-presenting-a-poster-on-consensus-in-sub-saharan-africa",
          title: 'I’m attending the Game Theory, Political Economy &amp;amp;amp; Development conference, organized by Université...',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
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
