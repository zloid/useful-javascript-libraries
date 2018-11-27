const dayjs = require('dayjs')
const { match, anyTrue, remove } = require('rambdax')
const { readFileSync, writeFileSync } = require('fs')

const today = dayjs().format('MM_DD_YY')
const FILE = `./bookmarks_${ today }.html`
const GITHUB_MARKER = 'https://github.com/'
const NPM_MARKER = 'http://npmjs.com/package/'

function bookmarksToLinks(output){
  const content = readFileSync(FILE).toString()
  const matched = match(
    /href=".+" ICON/gmi,
    content
  )

  const filtered = matched.filter(x => anyTrue(
    x.includes(GITHUB_MARKER),
    x.includes(NPM_MARKER),
  ))

  const newLinks = filtered.map(
    remove([ 'HREF="', /".+/g ])
  ).join('\n')

  writeFileSync(output, newLinks)
}

exports.bookmarksToLinks = bookmarksToLinks
