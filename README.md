# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/d8f488ff-459a-4d7a-9a23-99faa5a32253

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d8f488ff-459a-4d7a-9a23-99faa5a32253) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d8f488ff-459a-4d7a-9a23-99faa5a32253) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Environment Variables

This project uses Vite, so only variables prefixed with `VITE_` are exposed to the client at build time.

1. Copy `.env.example` to `.env`:
	```sh
	cp .env.example .env
	```
2. Fill in real values (never commit secrets you do not want public).
3. Restart the dev server after adding or changing `.env` values.

### Variables in use

| Name | Purpose |
|------|---------|
| `VITE_API_URL` | Fallback/local API base path. |
| `VITE_SECRET_KEY` | Secret key passed with each submission. |
| `VITE_Q_AGT_ID` | Agent ID used in payload. |
| `VITE_INS_CODE` / `VITE_INS_ID` | Insurer identifiers. |
| `VITE_FROM_COUNTRY` / `VITE_TO_COUNTRY` | Travel or coverage origin/destination. |
| `VITE_TA_TYPE` | Travel insurance type flag. |
| `VITE_CALLBACK_BASE` | Base URL for AfterPay / AfterReceivePolicy callbacks. |
| `VITE_CHECKBIA_URL` | External check service URL. |
| `VITE_PRAKUN_URL` | Prakun site base URL. |

### Accessing in code

```ts
const url = import.meta.env.VITE_THIRD_PARTY_SAVE_URL;
```

Avoid using `(import.meta as any)` unless necessary—TypeScript can be taught about these by adding a `env.d.ts` declaration if desired.

### Development Proxy (CORS Bypass)

During development we proxy the path `/third_party_save` to the remote PHP endpoint to avoid CORS issues:

```
client (http://localhost:8080) --> /third_party_save (Vite dev proxy) --> https://ancbroker.synology.me:8122/php/third_party_save.php
```

Configure in `.env` (dev):

```
VITE_THIRD_PARTY_SAVE_URL=/third_party_save
```

The proxy is defined in `vite.config.ts` under `server.proxy`. In production you must enable proper CORS headers on the real server (or deploy a backend proxy under the same origin). The front-end alone cannot override missing `Access-Control-Allow-Origin` on the remote server.

