export default function svgSpriteLoader () {
  const files = require.context('../assets/icons/', true, /\.svg$/)
  files.keys().forEach(files)
}
  