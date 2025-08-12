// Chatbot & mood/journal dummy data
const chatWindow = document.getElementById("chatWindow");
const moodList = document.getElementById("moodList");
const journalList = document.getElementById("journalList");
let moodHistory = [];
let journalEntries = [];

// Send message
if (document.getElementById("sendBtn")) {
  document.getElementById("sendBtn").addEventListener("click", () => {
    const input = document.getElementById("userInput");
    if (!input.value.trim()) return;
    appendMessage(input.value, "user");
    setTimeout(() => appendMessage("I'm here for you. Tell me more.", "bot"), 500);
    input.value = "";
  });
}

// Append chat message
function appendMessage(text, who) {
  const div = document.createElement("div");
  div.className = "msg " + who;
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Log mood
if (document.getElementById("logMood")) {
  document.getElementById("logMood").addEventListener("click", () => {
    const mood = document.getElementById("moodSelect").value;
    const entry = { date: new Date().toLocaleString(), mood };
    moodHistory.push(entry);
    renderMoodList();
  });
}

function renderMoodList() {
  if (!moodList) return;
  moodList.innerHTML = "";
  moodHistory.slice(-3).reverse().forEach(m => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${m.date} — ${m.mood}`;
    moodList.appendChild(li);
  });
  if (document.getElementById("fullMoodList")) {
    document.getElementById("fullMoodList").innerHTML = "";
    moodHistory.reverse().forEach(m => {
      document.getElementById("fullMoodList").innerHTML += `<tr><td>${m.date}</td><td>${m.mood}</td></tr>`;
    });
  }
}

// Save journal
if (document.getElementById("saveJournal")) {
  document.getElementById("saveJournal").addEventListener("click", () => {
    const text = document.getElementById("journalEntry").value.trim();
    if (!text) return;
    const entry = { date: new Date().toLocaleString(), text };
    journalEntries.push(entry);
    document.getElementById("journalEntry").value = "";
    renderJournalList();
  });
}

function renderJournalList() {
  if (!journalList) return;
  journalList.innerHTML = "";
  journalEntries.slice(-3).reverse().forEach(j => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${j.date} — ${j.text}`;
    journalList.appendChild(li);
  });
  if (document.getElementById("fullJournalList")) {
    document.getElementById("fullJournalList").innerHTML = "";
    journalEntries.reverse().forEach(j => {
      document.getElementById("fullJournalList").innerHTML += `<li class="list-group-item"><strong>${j.date}</strong><br>${j.text}</li>`;
    });
  }
}
