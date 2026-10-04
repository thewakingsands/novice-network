import pangu from 'pangu'

export function configureSpacing(md) {
  const renderText = md.renderer.rules.text
  md.renderer.rules.text = (tokens, index, options, env, self) => {
    let previous = ''
    for (let i = index - 1; i >= 0; i--) {
      if (tokens[i].type === 'html_inline') break
      if (tokens[i].content) {
        previous = tokens[i].content.slice(-1)
        break
      }
    }

    // Let VitePress escape the spaced text: its tokens preserve HTML entities.
    // Copy the token so repeated rendering and heading extraction stay stable.
    const spacedTokens = tokens.slice()
    spacedTokens[index] = {
      ...tokens[index],
      content: pangu.spacing(previous + tokens[index].content).slice(previous.length)
    }
    return renderText(spacedTokens, index, options, env, self)
  }

  const renderCode = md.renderer.rules.code_inline
  md.renderer.rules.code_inline = (tokens, index, options, env, self) => {
    let html = renderCode(tokens, index, options, env, self)
    if (index > 0 && !/^\s/.test(html)) html = ' ' + html
    if (index < tokens.length - 1 && !/\s$/.test(html)) html += ' '
    return html
  }
}
