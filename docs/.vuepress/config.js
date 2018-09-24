module.exports = {
    title: 'Raythunder',
    head: [
        ['script', {
            src: `/dat.gui.min.js`
        }],
        ['script', {
            src: `/rain.js`
        }]
    ],
    themeConfig: {
        nav: [{
                text: 'Home',
                link: '/'
            },
            {
                text: 'Blog',
                link: '/blog/'
            },
            {
                text: 'Github',
                link: 'https://github.com/raythunder'
            }
        ],
        sidebar: 'auto'
    }
}