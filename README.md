# Daily Work Report Desk

A lightweight, mobile-friendly page for turning rough daily notes into a clear work report. Open the site, enter what was assigned and what you actually completed, then create, copy, or save the report.

## Use the report page

1. Open [Daily Work Report Desk](https://dhananjay-cad.github.io/Daily_Work_Documentation/).
2. Edit the date and task name if needed.
3. Add the assigned task, the work you completed, and any next steps.
4. Choose **Create report**, review the result, then copy or save it.

Reports and saved history stay in this browser. They are not synced to GitHub or another device.

## How report creation works

GitHub Pages is a static website and does not provide Claude access. **Create report** therefore formats your notes directly in the browser, without an AI service or network request. It corrects spacing and sentence capitalization while keeping your wording and facts. It does not invent missing details or provide a full AI rewrite.

For an AI rewrite, choose **Copy as prompt** and paste the prompt into your preferred AI chat. The app only sends notes to an AI service when an AI connection is configured or provided by the current viewer.

### Optional private AI connection

The repository includes `worker.js` for an optional Cloudflare Worker connection. Deploy the Worker, add the provider API key as a Cloudflare secret, set the access code and allowed GitHub Pages origin, then put the Worker URL in `config.js`. Never put an AI provider API key in `config.js` or any file served by GitHub Pages. After changing `config.js`, commit and push it to publish the connection.

## Saved reports and privacy

Saved reports use this browser's local storage. Clearing site data or switching browsers/devices removes access to that browser's saved copies, so use **Copy report** when you need an external backup. Do not enter confidential information unless you are comfortable storing it in this browser or sending it to the AI service you choose.

## Project files

- `index.html` contains the report desk and its browser-based formatting flow.
- `gf.js` renders the interactive saved-reports folder.
- `config.js` holds the optional public Worker URL.
- `worker.js` is the optional server-side AI proxy. Provider credentials belong in Cloudflare secrets, never in the website files.

