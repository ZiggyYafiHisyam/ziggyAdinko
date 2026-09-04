# Adinko x GhaziSportsHub — Website

Express + MySQL API that also serves a React (Vite) single-page app. One codebase,
three ways to run it:

| Target        | What runs                                              | Frontend served by |
|---------------|-------------------------------------------------------|--------------------|
| `localhost:4000` | `node src/index.js` (one process)                  | Express (`frontend/dist`) |
| Railway       | `node src/index.js` (one process) + Railway MySQL     | Express (`frontend/dist`) |
| Vercel        | `api/index.js` serverless function + external MySQL   | Vercel CDN (`frontend/dist`) |

The browser always calls the API at same-origin **`/api/*`**. Uploaded images are
served at **`/assets/*`**. The built JS/CSS lives under **`/static/*`**.

---

## 1. Project layout

```
src/
  index.js            entry for localhost / Railway (app.listen)
  app.js              the Express app (routes, static, SPA fallback)
  config/
    database.js       mysql2 pool (reads DB_* env vars, optional SSL)
    bootstrap.js      creates all tables + seeds admin & kontak row on startup
  routes/ controller/ models/   one file per resource (auth, home, about,
                                layanan, portofolio, testimoni, kontak)
  middleware/         session (cookie), auth guard, multer upload, request log
api/index.js          entry for Vercel (re-exports src/app)
database.sql          canonical schema (optional — bootstrap.js does the same)
frontend/             React + Vite app (built to frontend/dist)
vercel.json           Vercel build + routing
railway.json          Railway build + start
```

## 2. Environment variables

Copy `.env.example` to `.env` for local dev. On Railway / Vercel set the same keys
in the dashboard (do **not** commit `.env`).

| Var | Required | Notes |
|-----|----------|-------|
| `PORT` | no | defaults to `4000` (Railway sets this automatically) |
| `DB_HOST` | yes | e.g. `localhost`, or the Railway MySQL host |
| `DB_PORT` | yes | `3306` |
| `DB_USER` | yes | `root` locally |
| `DB_PASSWORD` | yes | your MySQL password |
| `DB_NAME` | yes | `express_mysql` |
| `DB_SSL` | no | set `true` for Railway / any hosted MySQL that needs TLS |
| `SESSION_SECRET` | **yes in production** | long random string used to sign the admin login cookie. Without it, admins get logged out between serverless requests on Vercel. Generate: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `GOOGLE_MAPS_API_KEY` | no | only for `GET /api/testimoni/google` |
| `GOOGLE_PLACE_ID` | no | only for `GET /api/testimoni/google` |

## 3. Admin panel

- URL: `/admin/login`
- Default account (seeded on first startup): **`admin` / `admin321`** — change the
  password row in the `users` table after first login.
- Credentials live in the **`users`** table. Sessions are in-memory (a cookie named
  `sid`); restarting the server logs admins out.

CRUD wiring (all admin pages hit `/api/*` which map straight to MySQL tables):

| Admin page | Endpoints | Table |
|------------|-----------|-------|
| Portofolio | `GET/POST /api/portofolio`, `PUT/DELETE /api/portofolio/:id` | `portofolio` |
| Layanan | `GET/POST /api/layanan`, `PUT/DELETE /api/layanan/:id` | `layanan` |
| Testimoni | `GET/POST /api/testimoni`, `PUT/DELETE /api/testimoni/:id` | `testimoni` |
| Pesan | `GET /api/kontak/messages`, `DELETE /api/kontak/messages/:id` | `messages` |
| Pengaturan | `GET/PUT /api/kontak` | `kontak` (single row, id 1, upserted) |

---

## 4. Run on `localhost:4000`

Prereqs: Node 18.18+, a local MySQL (MySQL Workbench is fine).

```bash
# 1. create the database (once)
#    In MySQL Workbench run the whole file database.sql
#    — or from a shell:
mysql -u root -p < database.sql

# 2. configure
cp .env.example .env          # then edit DB_USER / DB_PASSWORD to match your MySQL

# 3. install
npm install
npm install --prefix frontend

# 4. build the frontend + start the server
npm run start:full            # = npm run build && node src/index.js
```

Open http://localhost:4000 (public site) and http://localhost:4000/admin/login.

While iterating on backend code use `npm run dev` (nodemon). Re-run `npm run build`
whenever you change frontend code — there is no separate dev server.

> If you had an older local `express_mysql` from earlier experiments, drop it first
> so the schema is clean: `DROP DATABASE express_mysql;` then re-run `database.sql`.

---

## 5. Deploy to Railway (server + MySQL)

1. **Add a MySQL database** in your Railway project. Open its *Connect* tab and note
   `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE`.
2. **Load the schema**: in MySQL Workbench create a connection using those values and
   run `database.sql` (or just let the app create the tables on first boot —
   `src/config/bootstrap.js` does it automatically).
3. **Add the app service** from your GitHub repo. Railway reads `railway.json`:
   build = `npm run build`, start = `npm start`.
4. **Set service variables**:
   ```
   DB_HOST        = <MYSQLHOST>
   DB_PORT        = <MYSQLPORT>
   DB_USER        = <MYSQLUSER>
   DB_PASSWORD    = <MYSQLPASSWORD>
   DB_NAME        = <MYSQLDATABASE>
   DB_SSL         = true
   SESSION_SECRET = <long random string>
   ```
   (Leave `PORT` unset — Railway injects it.)
5. Deploy. Visit the generated URL; `/admin/login` works with `admin` / `admin321`.

> Uploaded image **files** are stored on the container disk and are lost on redeploy.
> For persistent uploads attach a Railway **Volume** mounted at
> `/app/public/images`, or paste image URLs in the admin form instead of uploading.

---

## 6. Deploy to Vercel (frontend + serverless API)

You still need a MySQL somewhere Vercel can reach — the simplest is to point Vercel
at the **same Railway MySQL** from section 5.

1. Import the repo in Vercel. It reads `vercel.json`:
   - build: `npm --prefix frontend run build` → output `frontend/dist`
   - `/api/*` and `/assets/*` → the `api/index.js` function
   - everything else → `index.html` (SPA)
2. **Environment Variables** (Project → Settings → Environment Variables):
   ```
   DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME   = your Railway MySQL values
   DB_SSL         = true
   SESSION_SECRET = a long random string (REQUIRED — without it admins get
                    logged out between requests because Vercel runs many instances)
   GOOGLE_MAPS_API_KEY, GOOGLE_PLACE_ID              = optional
   ```
   Generate the secret with:
   `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`
3. Deploy. Open the URL, then `/admin/login`.

Notes for Vercel:
- Sessions are in-memory, so each serverless cold start logs admins out. Fine for
  light admin use; for heavy use move sessions to the DB later.
- File uploads write to a read-only FS on Vercel — use image **URLs** in the admin
  form there. Committed sample images under `public/` are bundled via
  `functions.includeFiles` and served at `/assets/*`.

---

## 7. Quick smoke test (any target)

```bash
BASE=http://localhost:4000      # or your Railway / Vercel URL

curl $BASE/api/home                       # 200 JSON
curl $BASE/api/portofolio                 # 200 JSON { data: [...] }
curl -c cj.txt -X POST $BASE/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"admin321"}'   # 200 + sets sid cookie
curl -b cj.txt $BASE/api/auth/me                     # authenticated: true
curl -b cj.txt -X POST $BASE/api/portofolio \
  -H 'Content-Type: application/json' \
  -d '{"title":"Test","category":"Taman"}'           # 201 created
```

Then check the browser: `/` renders the site, `/admin` (after login) lists real
rows, and creating/editing/deleting in each admin page persists to MySQL.
