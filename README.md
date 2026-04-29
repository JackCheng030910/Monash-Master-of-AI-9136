# FIT9136 In-class Test 2 Practice App

A local web-based Python coding practice tool for FIT9136 In-class Test 2 topics:

- Mutability and transforming sequences
- File IO
- Importing modules
- Python modules and libraries
- OOP Part 1: classes and instances

## How to Run

### Option A: Use Online with GitHub Pages

This app can run as a static website because it uses Pyodide to execute Python inside the browser.

Current repository:

```text
https://github.com/JackCheng030910/Monash-Master-of-AI-9136
```

Expected GitHub Pages link after Pages is enabled:

```text
https://jackcheng030910.github.io/Monash-Master-of-AI-9136/
```

To enable GitHub Pages:

1. Open the repository on GitHub.
2. Click **Settings** in the top repository navigation bar.
3. In the left sidebar, click **Pages** under **Code and automation**.
   - Do not use **Branches**. Branch protection is a different settings page.
4. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/root**
5. Click **Save**.
6. Wait 1-3 minutes. GitHub should show **Your site is live at ...**.
7. Share the generated Pages URL with classmates.

The first time someone clicks `Run Code` or `Run Tests`, the browser downloads Pyodide. This may take a short moment, especially for the Pandas question.

### Option B: Run Locally with Python

1. Clone or download this repository.
2. Open a terminal in the project folder.
3. Install the optional dependency used by the Pandas practice question:

```bash
python3 -m pip install -r requirements.txt
```

4. Start the local server:

```bash
python3 server.py
```

5. Open the app in a browser:

```text
http://127.0.0.1:8000
```

## Notes

- `Run Code` executes the code currently typed in the editor and shows print output or tracebacks in the terminal panel.
- `Run Tests` runs hidden tests for the selected practice task.
- On GitHub Pages, Python runs in each user's browser through Pyodide.
- Do not deploy `server.py` publicly unless you add proper sandboxing, authentication, and resource limits.

