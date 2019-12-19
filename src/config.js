module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://ultimatetutor@localhost/ultimatetutor',
    JWT_EXPIRY: process.env.JWT_EXPIRY || "3h",
    JWT_SECRET: process.env.JWT_SECRET || 'my-own-special-jwt-secret',
}