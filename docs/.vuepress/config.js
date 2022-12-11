module.exports = {
  title: '新大陆见闻录 - 最终幻想14新手入坑指南手册',
  description: '「新大陆见闻录」网站为最终幻想14超实用萌新手册入坑指南，为FF14中文玩家提供涵盖广泛全面、清晰易懂的新人入坑攻略指引。推荐玩法大全，练级指南，从入门到精通。',
  head: [
    ['meta', { name: 'keywords', content: '最终幻想14,FF14,FFXIV,新人指南,豆芽站,萌新手册,入门攻略,新手教程,职业选择,攻略,副本,任务,练级,装备,PVP,生产,采集,钓鱼,海钓,优雷卡,ULK,博兹雅,BZY,古武,魂武,优武,义武'}]
  ],
  dest: 'dist',
  shouldPrefetch: () => false,
  markdown: {
    breaks: true,
    anchor: {
      permalink: false
    },
    extendMarkdown: md => {
      const defaultRender = md.renderer.rules.image
      md.renderer.rules.image = function(tokens, idx, options, env, self) {
        tokens[idx].attrPush(['loading', 'lazy'])

        return defaultRender(tokens, idx, options, env, self)
      }
      md.renderer.rules.table_open = function() {
        return '<div class="md-table"><table class="ui compact grey striped unstackable table">'
      }
      md.renderer.rules.table_close = function() {
        return '</table></div>'
      }
      md.use(require('markdown-it-container'), 'collapse', {
        validate: function(params) {
          return params.trim().match(/^collapse\s+(.*)$/)
        },

        render: function(tokens, idx) {
          var m = tokens[idx].info.trim().match(/^collapse\s+(.*)$/)

          if (tokens[idx].nesting === 1) {
            // opening tag
            return '<CollapseText summary="' + md.utils.escapeHtml(m[1]) + '">'
          } else {
            // closing tag
            return '</CollapseText>\n'
          }
        }
      })
      md.use(require('markdown-it-container'), 'segment', {
        validate: function(params) {
          return params.trim().match(/^segment\s+(.*)$/)
        },

        render: function(tokens, idx) {
          var m = tokens[idx].info.trim().match(/^segment\s+(.*)$/)

          if (tokens[idx].nesting === 1) {
            // opening tag
            return '<SegmentText className="' + md.utils.escapeHtml(m[1]) + '">'
          } else {
            // closing tag
            return '</SegmentText>\n'
          }
        }
      })
      md.use(require('markdown-it-container'), 'job', {
        validate: function(params) {
          return params.trim().match(/^job\s+(.*)$/)
        },

        render: function(tokens, idx) {
          var m = tokens[idx].info.trim().match(/^job\s+(.*)$/)

          if (tokens[idx].nesting === 1) {
            // opening tag
            var c = m[1].split(' ')
            return (
              '<JobCard name="' +
              md.utils.escapeHtml(c[0]) +
              '" className="' +
              c[1] +
              '">'
            )
          } else {
            // closing tag
            return '</JobCard>\n'
          }
        }
      })
      md.use(require('markdown-it-ins'))
      md.use(require('markdown-it-mark'))
      md.use(require('markdown-it-footnote'))
      md.use(require('markdown-it-imsize'))
      md.use(require('markdown-it-cjk-breaks'))

      md.use(require('markdown-it-div'), {
        marker: ';'
      })
      md.use(require('markdown-it-attrs'))

      md.use(require('markdown-it-pangu'))
    }
  },
  plugins: [
    require('./plugins/my-sw'),
    require('./plugins/global-scripts'),
    '@vuepress/last-updated',
    '@vuepress/nprogress',
    [
      'vuepress-plugin-clean-urls',
      {
        normalSuffix: '.htm'
      }
    ],
    require('./plugins/page-timer'),
    [
      'minimal-analytics',
      {
        ga: 'UA-140050718-1'
      }
    ],
    [
      require('./plugins/baidu-tongji'),
      {
        id: '215a46d31e2c4aaa8e1cdd94fcfe8aa4'
      }
    ],
    [
      'vuepress-plugin-dehydrate',
      {
        // disable SSR
        noSSR: '404.html'
      }
    ]
  ]
}
