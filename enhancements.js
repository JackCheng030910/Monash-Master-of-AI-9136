(function () {
  const search = document.querySelector("#questionSearch");
  const progressBar = document.querySelector("#progressBar");
  const progressText = document.querySelector("#progressText");
  const nextUnsolvedBtn = document.querySelector("#nextUnsolvedBtn");
  const focusToggleBtn = document.querySelector("#focusToggleBtn");
  const prevBtn = document.querySelector("#prevQuestionBtn");
  const nextBtn = document.querySelector("#nextQuestionBtn");
  const position = document.querySelector("#questionPosition");
  const lineCount = document.querySelector("#lineCount");
  const terminal = document.querySelector("#result");
  const runBtn = document.querySelector("#runBtn");
  const executeBtn = document.querySelector("#executeBtn");
  const runtimeBadge = document.querySelector("#runtimeBadge");
  const clearTerminalBtn = document.querySelector("#clearTerminalBtn");
  const toast = document.querySelector("#toast");

  function updateProgress() {
    const total = questions.length || 1;
    const complete = passed.size;
    progressBar.style.width = `${Math.round((complete / total) * 100)}%`;
    progressText.textContent = `${complete} of ${total} completed`;
  }

  function updateQuestionMeta() {
    position.textContent = `${current + 1} / ${questions.length}`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === questions.length - 1;
    document.body.classList.toggle("question-passed", passed.has(questions[current].id));
  }

  function updateLineCount() {
    const lines = codeEditor.value.split("\n").length;
    const chars = codeEditor.value.length;
    lineCount.textContent = `${lines} line${lines === 1 ? "" : "s"} · ${chars} chars`;
  }

  function filterQuestions() {
    const query = search.value.trim().toLowerCase();
    document.querySelectorAll(".question-item").forEach((item, index) => {
      const q = questions[index];
      const haystack = `${q.section} ${q.title} ${q.part} ${q.topic}`.toLowerCase();
      item.hidden = query && !haystack.includes(query);
    });
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function refreshEnhancements() {
    updateProgress();
    updateQuestionMeta();
    updateLineCount();
    filterQuestions();
  }

  function goNextUnsolved() {
    const nextIndex = questions.findIndex((q, index) => index > current && !passed.has(q.id));
    if (nextIndex !== -1) {
      selectQuestion(nextIndex);
      return;
    }
    const firstIndex = questions.findIndex((q) => !passed.has(q.id));
    if (firstIndex !== -1) {
      selectQuestion(firstIndex);
      return;
    }
    showToast("All questions are completed. Nice work.");
  }

  const originalRenderList = window.renderList;
  window.renderList = function enhancedRenderList() {
    originalRenderList();
    refreshEnhancements();
  };

  const originalSelectQuestion = window.selectQuestion;
  window.selectQuestion = function enhancedSelectQuestion(index) {
    originalSelectQuestion(index);
    runtimeBadge.textContent = passed.has(questions[index].id) ? "Passed" : "Ready";
    refreshEnhancements();
  };

  prevBtn.addEventListener("click", () => {
    if (current > 0) selectQuestion(current - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (current < questions.length - 1) selectQuestion(current + 1);
  });

  nextUnsolvedBtn.addEventListener("click", goNextUnsolved);

  focusToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("focus-mode");
    focusToggleBtn.textContent = document.body.classList.contains("focus-mode") ? "Exit focus" : "Focus";
  });

  clearTerminalBtn.addEventListener("click", () => {
    terminal.className = "result idle";
    terminal.textContent = `$ python3 ${questions[current].file}\nTerminal cleared. Run your code when ready.`;
  });

  search.addEventListener("input", filterQuestions);
  codeEditor.addEventListener("input", updateLineCount);

  document.addEventListener("keydown", (event) => {
    if (document.activeElement !== codeEditor) return;
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      executeBtn.click();
    }
    if (event.shiftKey && event.key === "Enter") {
      event.preventDefault();
      runBtn.click();
    }
  });

  [runBtn, executeBtn].forEach((button) => {
    button.addEventListener("click", () => {
      runtimeBadge.textContent = button === runBtn ? "Checking" : "Running";
      button.classList.add("is-running");
      button.setAttribute("aria-busy", "true");
      terminal.scrollIntoView({ block: "nearest", behavior: "smooth" });
      window.setTimeout(() => {
        button.classList.remove("is-running");
        button.removeAttribute("aria-busy");
      }, 1400);
    });
  });

  const observer = new MutationObserver(() => {
    const text = terminal.textContent;
    if (text.includes("PASS:")) {
      runtimeBadge.textContent = "Passed";
      refreshEnhancements();
      showToast("Passed. Move to the next question when ready.");
    } else if (text.includes("FAIL:") || text.includes("Traceback")) {
      runtimeBadge.textContent = "Needs fix";
    } else if (text.includes("Program finished") || text.includes("Expected Output") || text.trim()) {
      if (!text.includes("Running") && !text.includes("Loading")) {
        runtimeBadge.textContent = passed.has(questions[current].id) ? "Passed" : "Ready";
      }
    }
  });
  observer.observe(terminal, { childList: true, characterData: true, subtree: true });

  window.setTimeout(refreshEnhancements, 0);
})();

(function () {
  const view = document.querySelector("#practiceView");
  const handle = document.querySelector("#splitHandle");
  if (!view || !handle) return;

  function setSplit(clientX) {
    const rect = view.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    const left = Math.min(58, Math.max(28, raw));
    view.style.setProperty("--left-pane", `${left}%`);
    localStorage.setItem("paneSplit", String(left));
  }

  const saved = Number(localStorage.getItem("paneSplit"));
  if (saved) {
    view.style.setProperty("--left-pane", `${saved}%`);
  }

  handle.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    handle.setPointerCapture(event.pointerId);
    document.body.classList.add("is-resizing");
  });

  handle.addEventListener("pointermove", (event) => {
    if (document.body.classList.contains("is-resizing")) {
      setSplit(event.clientX);
    }
  });

  handle.addEventListener("pointerup", (event) => {
    handle.releasePointerCapture(event.pointerId);
    document.body.classList.remove("is-resizing");
  });

  handle.addEventListener("keydown", (event) => {
    const current = Number.parseFloat(getComputedStyle(view).getPropertyValue("--left-pane")) || 38;
    if (event.key === "ArrowLeft") {
      view.style.setProperty("--left-pane", `${Math.max(28, current - 2)}%`);
    }
    if (event.key === "ArrowRight") {
      view.style.setProperty("--left-pane", `${Math.min(58, current + 2)}%`);
    }
  });
})();
