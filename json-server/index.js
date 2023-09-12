const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

const PORT = process.env.PORT || 8000;

server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800);
    });
    next();
});

server.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
        );
        const { users = [] } = db;

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        );

        if (userFromBd) {
            return res.json(userFromBd);
        }

        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

server.post('/register', (req, res) => {
    try {
        const { username, firstname, lastname, password } = req.body;
        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
        );
        const { users = [] } = db;

        // const existingUser = users.find((user) => user.username === username);
        //
        // if (existingUser) {
        //     return res.status(409).json({
        //         message: 'User with the same username already exists',
        //     });
        // }

        const id = String(Date.now());

        const newUser = {
            id,
            username,
            password,
            features: {
                isAppRedesigned: true,
            },
        };

        const newProfile = {
            id,
            username,
            firstname,
            lastname,
        };

        db.users.push(newUser);
        db.profile.push(newProfile);

        fs.writeFileSync(
            path.resolve(__dirname, 'db.json'),
            JSON.stringify(db, null, 2),
        );

        return res.status(201).json(newUser);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERROR' });
    }

    next();
});

server.use(router);

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

