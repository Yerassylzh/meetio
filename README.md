# 🌐 **Meetio**

**Meetio is a platform for real-time and fast online meetings**

---

## ✨ **Features**

- 🚀 **Real-time connection** — Instant communication with WebSocket & P2P support
- 💬 **Multi-platform** — Works seamlessly across desktop, tablet, and mobile
- 🎨 **Modern UI** — Clean, intuitive interface built with Next.js

---

## 🛠️ **Tech Stack**

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Socket.io, Peer
- **Database**: LibSQL with Turso
- **Authentication**: JWT tokens & Auth.js (for Github and Google auth)
- **Real-time**: Socket.io & Peer connections

---

## ✅ **Prerequisites**

Ensure you have the following installed before running ChatApp locally:

- **Node.js**
- **npm**
- **Git**

---

## 🚀 **Getting Started**

### 1. **Clone the Repository**

```bash
git clone https://github.com/Yerassylzh/meetio.git
cd meetio
```

---

### 2. **Storage and Environment Setup**

1. Create a [Turso DB](https://turso.tech/) and install the [Turso CLI](https://docs.turso.tech/cli/introduction)
2. Create [Github](https://authjs.dev/getting-started/providers/github) and [Google](https://authjs.dev/getting-started/providers/google) client id and secret keys
3. Run migrations:

```bash
turso db shell < prisma/full_migration.sql
```

4. Create an `.env` file inside of **frontend/** folder:

```env
AUTH_SECRET=any-secret-key

AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret

AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret

NEXT_PUBLIC_SOCKET_SERVER_URL="https://meetio-socket-server.onrender.com"

TURSO_AUTH_TOKEN=your-generated-token
TURSO_DATABASE_URL=your-turso-db-url

```

---

### 3. **Build process**

#### Frontend:

```bash
sh build.sh
```

#### Socket Server:

```bash
cd socket_server
sh build.sh
```

---

### 4. **Run the Application**

#### Start the **Frontend**:

```bash
cd ..
npm run dev
```

> The frontend will run at: `http://localhost:3000`

#### Open a **new terminal** and start the **Socket Server**:

```bash
cd socket_server
npm run start
```

---

## 📅 **Happy Meeting!**
