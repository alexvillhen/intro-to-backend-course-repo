import { postsApi, usersApi } from "./api.js";

const statusEl = document.getElementById("status");
const postsListEl = document.getElementById("posts-list");
const postTemplate = document.getElementById("post-template");
const sessionInfoEl = document.getElementById("session-info");

const USER_KEY = "currentUser";

function showStatus(message, type = "success") {
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;
  statusEl.hidden = false;

  clearTimeout(showStatus.timeout);
  showStatus.timeout = setTimeout(() => {
    statusEl.hidden = true;
  }, 4000);
}

function formData(form) {
  return Object.fromEntries(new FormData(form));
}

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
}

function setStoredUser(user) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
  renderSession();
}

function renderSession() {
  const user = getStoredUser();

  if (!user) {
    sessionInfoEl.innerHTML = '<p class="empty">Not logged in</p>';
    return;
  }

  sessionInfoEl.innerHTML = `
    <p class="user-name">${user.username}</p>
    <p>${user.email}</p>
    <p class="post-meta">ID: ${user.id}</p>
  `;

  const logoutEmail = document.querySelector("#logout-form input[name='email']");
  if (logoutEmail && !logoutEmail.value) {
    logoutEmail.value = user.email;
  }
}

function renderPosts(posts) {
  if (!posts.length) {
    postsListEl.innerHTML = '<p class="empty">No posts yet. Create one above.</p>';
    return;
  }

  postsListEl.innerHTML = "";

  posts.forEach((post) => {
    const node = postTemplate.content.cloneNode(true);
    const item = node.querySelector(".post-item");

    item.dataset.id = post._id;
    item.querySelector(".post-name").textContent = post.name;
    item.querySelector(".post-description").textContent = post.description;
    item.querySelector(".post-meta").textContent = `Age: ${post.age} · ID: ${post._id}`;

    const editForm = item.querySelector(".edit-form");
    editForm.name.value = post.name;
    editForm.description.value = post.description;
    editForm.age.value = post.age;

    item.querySelector(".edit-btn").addEventListener("click", () => {
      item.querySelector(".post-content").hidden = true;
      item.querySelector(".post-actions").hidden = true;
      editForm.hidden = false;
    });

    item.querySelector(".cancel-edit-btn").addEventListener("click", () => {
      editForm.hidden = true;
      item.querySelector(".post-content").hidden = false;
      item.querySelector(".post-actions").hidden = false;
    });

    editForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const updates = {};
      const data = formData(editForm);

      if (data.name !== post.name) updates.name = data.name;
      if (data.description !== post.description) updates.description = data.description;
      if (Number(data.age) !== post.age) updates.age = Number(data.age);

      if (!Object.keys(updates).length) {
        showStatus("No changes to save", "error");
        return;
      }

      try {
        await postsApi.update(post._id, updates);
        showStatus("Post updated");
        loadPosts();
      } catch (error) {
        showStatus(error.message, "error");
      }
    });

    item.querySelector(".delete-btn").addEventListener("click", async () => {
      if (!confirm(`Delete "${post.name}"?`)) return;

      try {
        await postsApi.delete(post._id);
        showStatus("Post deleted");
        loadPosts();
      } catch (error) {
        showStatus(error.message, "error");
      }
    });

    postsListEl.appendChild(node);
  });
}

async function loadPosts() {
  postsListEl.innerHTML = '<p class="empty">Loading posts...</p>';

  try {
    const data = await postsApi.getAll();
    renderPosts(data.posts || []);
  } catch (error) {
    postsListEl.innerHTML = `<p class="empty">${error.message}</p>`;
  }
}

// Tabs
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    document.querySelectorAll(".panel").forEach((panel) => {
      panel.classList.remove("active");
      panel.hidden = true;
    });

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    const panel = document.getElementById(`${tab.dataset.tab}-panel`);
    panel.classList.add("active");
    panel.hidden = false;
  });
});

// Posts
document.getElementById("create-post-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.target;
  const body = formData(form);
  body.age = Number(body.age);

  try {
    await postsApi.create(body);
    showStatus("Post created");
    form.reset();
    loadPosts();
  } catch (error) {
    showStatus(error.message, "error");
  }
});

document.getElementById("refresh-posts").addEventListener("click", loadPosts);

// Auth
document.getElementById("register-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const data = await usersApi.register(formData(event.target));
    showStatus(data.message);
    event.target.reset();
  } catch (error) {
    showStatus(error.message, "error");
  }
});

document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const data = await usersApi.login(formData(event.target));
    setStoredUser(data.user);
    showStatus(data.message);
  } catch (error) {
    showStatus(error.message, "error");
  }
});

document.getElementById("logout-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const data = await usersApi.logout(formData(event.target));
    setStoredUser(null);
    showStatus(data.message);
    event.target.reset();
  } catch (error) {
    showStatus(error.message, "error");
  }
});

renderSession();
loadPosts();
