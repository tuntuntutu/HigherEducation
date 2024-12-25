export default defineAppConfig({
  lazyCodeLoading: 'requiredComponents',
  pages: [
    'pages/index/index',
  ],
  "subpackages": [
    {
      "root": "sessionA",
      "pages": [
        "pages/index/index"
      ],
      "independent": true
    }, {
      "root": "sessionB",
      "pages": [
        "pages/index/index"
      ],
      "independent": true
    }, {
      "root": "sessionC",
      "pages": [
        "pages/index/index"
      ],
      "independent": true
    }, {
      "root": "sessionD",
      "pages": [
        "pages/index/index"
      ],
      "independent": true
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
