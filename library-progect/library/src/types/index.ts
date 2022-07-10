import session from 'express-session'

declare module 'express-session' {
    interface SessionData {
        returnTo: string
    }
}

declare global {
    namespace Express {
        interface User {
            _id: string
        }
    }
}

export {
    session
}
