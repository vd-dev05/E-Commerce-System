import dotenv from 'dotenv-webpack'

module.exports = {
    plugins: [
        new dotenv({
            path: './config/.env',
            systemvars: true
        })
    ]
}