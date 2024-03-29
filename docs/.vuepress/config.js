module.exports = {
    title: "Destroyer2",
    port: 8000,
    description: "A node real-time multiplayer battleship game",
    base: process.env.NODE_ENV === "development" ? "" : "/destroyer2/",
    evergreen: false,
    plugins: {
        "@vuepress/active-header-links": true,
        "@vuepress/back-to-top": true,
        "@vuepress/medium-zoom": {
            options: {
                margin: 16
            }
        }
    },
    themeConfig: {
        repo: "umcconnell/destroyer2",
        docsDir: "docs",

        nav: [
            { text: "Guide", link: "/guide/" },
            { text: "Docs", link: "/docs/" },
            { text: "Screenshots", link: "/screenshots/" }
        ],
        smoothScroll: true,

        sidebar: {
            "/docs/": [
                {
                    title: "Docs",
                    collapsable: false,
                    children: [
                        "",
                        "architecture",
                        "field-representation",
                        "api",
                        "auth",
                        "cleanup",
                        "game-events"
                    ]
                }
            ],
            "/guide/": [
                {
                    title: "Guide",
                    collapsable: false,
                    children: [
                        "",
                        "installation",
                        "customizing",
                        "docker",
                        "logging"
                    ]
                }
            ],
            "/legal/": [
                {
                    title: "Legal",
                    collapsable: false,
                    children: ["privacy", "trademark-disclaimer"]
                }
            ]
        },

        editLinks: true,
        editLinkText: "Help us improve this page!",
        lastUpdated: true
    }
};
