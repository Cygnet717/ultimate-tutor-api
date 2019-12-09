module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URL || 'postgresql://ultimatetutor@localhost/ultimatetutor',
    JWT_EXPIRY: process.env.JWT_EXPIRY || "8h",
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
}