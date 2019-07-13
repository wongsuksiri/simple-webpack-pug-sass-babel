module.exports = {
    minimize: true,
    plugins: [
        require('autoprefixer'),
        require('cssnano')({ preset: 'default' })
    ]
}