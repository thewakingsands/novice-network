module.exports = {
  title: '新大陆见闻录 - 《最终幻想14》萌新指导手册',
  description:
    '「新大陆见闻录」网站为《最终幻想14》国服新手玩家提供超快超全的指导攻略，是 FF14 玩家居家旅行必备攻略。愿水晶给予你指引。',
  dest: 'dist',
  markdown: {
    breaks: true,
    anchor: {
      permalink: false
    },
    extendMarkdown: md => {
      md.renderer.rules.table_open = function() {
        return '<div class="md-table"><table class="ui compact striped unstackable table">'
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
    require('./plugins/sidenav'),
    '@vuepress/last-updated',
    '@vuepress/nprogress',
    [
      'vuepress-plugin-clean-urls',
      {
        normalSuffix: '.htm'
      }
    ]
  ]
}
