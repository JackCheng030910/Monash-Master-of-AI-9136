(function () {
  const search = document.querySelector("#questionSearch");
  const progressBar = document.querySelector("#progressBar");
  const prevBtn = document.querySelector("#prevQuestionBtn");
  const nextBtn = document.querySelector("#nextQuestionBtn");
  const position = document.querySelector("#questionPosition");
  const lineCount = document.querySelector("#lineCount");
  const terminal = document.querySelector("#result");
  const runBtn = document.querySelector("#runBtn");
  const executeBtn = document.querySelector("#executeBtn");

  function updateProgress() {
    const total = questions.length || 1;
    progressBar.style.width = `${Math.round((passed.size / total) * 100)}%`;
  }

  function updateQuestionMeta() {
    position.textContent = `${current + 1} / ${questions.length}`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === questions.length - 1;
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

  function refreshEnhancements() {
    updateProgress();
    updateQuestionMeta();
    updateLineCount();
    filterQuestions();
  }

  const originalRenderList = window.renderList;
  window.renderList = function enhancedRenderList() {
    originalRenderList();
    refreshEnhancements();
  };

  const originalSelectQuestion = window.selectQuestion;
  window.selectQuestion = function enhancedSelectQuestion(index) {
    originalSelectQuestion(index);
    refreshEnhancements();
  };

  prevBtn.addEventListener("click", () => {
    if (current > 0) selectQuestion(current - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (current < questions.length - 1) selectQuestion(current + 1);
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
      button.classList.add("is-running");
      button.setAttribute("aria-busy", "true");
      terminal.scrollIntoView({ block: "nearest", behavior: "smooth" });
      window.setTimeout(() => {
        button.classList.remove("is-running");
        button.removeAttribute("aria-busy");
      }, 1200);
    });
  });

  window.setTimeout(refreshEnhancements, 0);
})();
