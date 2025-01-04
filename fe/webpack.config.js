import dotenv from 'dotenv-webpack'

module.exports = {
    plugins: [
        new dotenv({
            path: '.env',
            systemvars: true
        })
    ]
}