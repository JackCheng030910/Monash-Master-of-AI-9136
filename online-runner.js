(function () {
  let pyodideReady = null;

  function needsPandas(code) {
    return /\bimport\s+pandas\b|\bfrom\s+pandas\b|\bpd\./.test(code);
  }

  async function getPyodideRuntime(extraCode) {
    if (!window.loadPyodide) {
      throw new Error("Pyodide is not available. Check your internet connection.");
    }

    if (!pyodideReady) {
      pyodideReady = window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/"
      });
    }

    const pyodide = await pyodideReady;
    if (needsPandas(extraCode || "")) {
      await pyodide.loadPackage("pandas");
    }
    return pyodide;
  }

  async function runCodeInBrowser(code) {
    const pyodide = await getPyodideRuntime(code);
    pyodide.FS.writeFile("main.py", code);
    const runner = `
import contextlib
import io
import traceback

stdout = io.StringIO()
stderr = io.StringIO()
ok = True
with contextlib.redirect_stdout(stdout), contextlib.redirect_stderr(stderr):
    try:
        exec(open("main.py").read(), {"__name__": "__main__"})
    except Exception:
        ok = False
        traceback.print_exc()
output = stdout.getvalue() + stderr.getvalue()
(ok, output if output else "Program finished with no output.")
`;
    const [ok, output] = pyodide.runPython(runner).toJs();
    return { ok, output };
  }

  async function runTestsInBrowser(questionId, code) {
    const testCode = window.CLIENT_TESTS && window.CLIENT_TESTS[questionId];
    if (!testCode) {
      return { ok: false, output: "No browser tests are available for this question." };
    }

    const pyodide = await getPyodideRuntime(`${code}\n${testCode}`);
    pyodide.FS.writeFile("solution.py", code);
    pyodide.FS.writeFile("run_tests.py", testCode);
    const runner = `
import contextlib
import importlib
import io
import sys
import traceback

for name in ["solution", "run_tests"]:
    if name in sys.modules:
        del sys.modules[name]

stdout = io.StringIO()
stderr = io.StringIO()
ok = True
with contextlib.redirect_stdout(stdout), contextlib.redirect_stderr(stderr):
    try:
        importlib.import_module("run_tests")
    except Exception:
        ok = False
        traceback.print_exc()
output = stdout.getvalue() + stderr.getvalue()
(ok, output if output else "All hidden tests passed.")
`;
    const [ok, output] = pyodide.runPython(runner).toJs();
    return { ok, output };
  }

  async function postJson(path, body) {
    const response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error("No local backend");
    }
    return response.json();
  }

  function saveCurrentCode(questionId, code) {
    localStorage.setItem(`code:${questionId}`, code);
  }

  async function handleRunCode(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const q = questions[current];
    saveCurrentCode(q.id, codeEditor.value);
    result.className = "result idle";
    result.textContent = `$ python3 ${q.file}\nRunning code...`;

    try {
      const data = await postJson("/api/execute", { code: codeEditor.value });
      result.className = `result ${data.ok ? "idle" : "fail"}`;
      result.textContent = `$ python3 ${q.file}\n${data.output}`;
    } catch (backendError) {
      result.textContent = `$ python3 ${q.file}\nLoading browser Python...`;
      try {
        const data = await runCodeInBrowser(codeEditor.value);
        result.className = `result ${data.ok ? "idle" : "fail"}`;
        result.textContent = `$ python3 ${q.file}\n${data.output}`;
      } catch (browserError) {
        result.className = "result fail";
        result.textContent = `$ python3 ${q.file}\nBrowser Python failed to start:\n${browserError.message}`;
      }
    }
  }

  async function handleRunTests(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const q = questions[current];
    saveCurrentCode(q.id, codeEditor.value);
    result.className = "result idle";
    result.textContent = `$ python3 ${q.file}\nRunning hidden tests...`;

    try {
      const data = await postJson("/api/run", { questionId: q.id, code: codeEditor.value });
      finishTestRun(q, data);
    } catch (backendError) {
      result.textContent = `$ python3 ${q.file}\nLoading browser Python and running hidden tests...`;
      try {
        const data = await runTestsInBrowser(q.id, codeEditor.value);
        finishTestRun(q, data);
      } catch (browserError) {
        result.className = "result fail";
        result.textContent = `$ python3 ${q.file}\nBrowser Python failed to start:\n${browserError.message}`;
      }
    }
  }

  function finishTestRun(question, data) {
    result.className = `result ${data.ok ? "ok" : "fail"}`;
    result.textContent = data.ok
      ? `$ python3 ${question.file}\nPASS: ${data.output}`
      : `$ python3 ${question.file}\nFAIL:\n${data.output}`;
    if (data.ok) {
      passed.add(question.id);
      localStorage.setItem("passedQuestions", JSON.stringify([...passed]));
      renderList();
    }
  }

  document.querySelector("#executeBtn").addEventListener("click", handleRunCode, true);
  document.querySelector("#runBtn").addEventListener("click", handleRunTests, true);
})();
