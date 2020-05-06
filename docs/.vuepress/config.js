module.exports = {
    title: "Destroyer2",
    description: "A node real-time multiplayer battleship game",
    base: process.env.NODE_ENV === "development" ? "" : "/destroyer2/",
    evergreen: false,
    plugins: ["@vuepress/active-header-links", "@vuepress/back-to-top"],
    themeConfig: {
        repo: "umcconnell/destroyer2",
        docsDir: "docs",

        nav: [{ text: "Guide", link: "/guide/" }],
        smoothScroll: true,

        sidebar: {
            "/guide/": [
                {
                    title: "Guide",
                    collapsable: false,
                    children: [
                        "",
                        "architecture",
                        "field-representation",
                        "api",
                        "game-events"
                    ]
                }
            ]
        },

        editLinks: true,
        editLinkText: "Help us improve this page!",
        lastUpdated: true
    }
};
