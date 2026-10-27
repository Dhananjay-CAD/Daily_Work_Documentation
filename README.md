# Daily Work Report Desk

A lightweight, mobile-friendly page for turning your rough notes about completed work into an editable daily report. Enter the work once, then create, copy, or save the report.

## Use the report page

1. Open [Daily Work Report Desk](https://dhananjay-cad.github.io/Daily_Work_Documentation/).
2. Edit the date and task name if needed.
3. Enter your completed work once in **What work did you do?** Include part names, CAD software, dimensions, tolerances, clearances, fit checks, test results, and issues when available. You can write rough notes or put separate actions on separate lines.
4. Choose **Create report**. The page derives Task Details as bullet points and writes Work Progress as a separate explanation. Review and edit the report, then copy or save it.

Reports and saved history stay in this browser. They are not synced to GitHub or another device.

## How report creation works

GitHub Pages is a static website and does not provide Claude access. **Create report** therefore formats your notes directly in the browser, without an AI service or network request. It derives Task Details as a point-by-point list from the work notes and formats Work Progress as a separate narrative. It corrects spacing and capitalization while keeping your wording and facts. For CAD assembly notes, it can describe modelled parts, assembly interfaces, and recorded interference findings. Include the dimensions, tolerances, and fit requirements for a more complete technical report. The local mode will not invent missing values or steps.

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

