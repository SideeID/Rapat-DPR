const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  // Fungsi untuk mengirim permintaan HTTP dengan menyertakan token otentikasi
  async function fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        // eslint-disable-next-line no-use-before-define
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  // Fungsi untuk menyimpan token akses ke localStorage
  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  // Fungsi untuk mendapatkan token akses dari localStorage
  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  // Registrasi pengguna baru
  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }

  // Login pengguna
  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { token },
    } = responseJson;

    // Simpan token akses ke localStorage
    putAccessToken(token);

    return token;
  }

  // Dapatkan profil pengguna sendiri
  async function getOwnProfile() {
    const response = await fetchWithAuth(`${BASE_URL}/users/me`);

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }

  // Dapatkan semua pengguna
  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { users },
    } = responseJson;

    return users;
  }

  // Buat thread baru
  async function createThread({ title, body, category }) {
    const response = await fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { thread },
    } = responseJson;

    return thread;
  }

  // Dapatkan semua thread
  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { threads },
    } = responseJson;

    return threads;
  }

  // Dapatkan detail thread berdasarkan ID
  async function getThreadDetail(id) {
    const response = await fetch(`${BASE_URL}/threads/${id}`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { detailThread },
    } = responseJson;

    return detailThread;
  }

  // Buat komentar baru
  async function createComment(threadId, content) {
    const response = await fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
        }),
      },
    );

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { comment },
    } = responseJson;

    return comment;
  }

  // thread (up-vote)
  async function upVoteThread(threadId) {
    const response = await fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/up-vote`,
      {
        method: 'POST',
      },
    );

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.vote;
  }

  // thread (down-vote)
  async function downVoteThread(threadId) {
    const response = await fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/down-vote`,
      {
        method: 'POST',
      },
    );

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.vote;
  }

  // komentar (up-vote)
  async function upVoteComment(threadId, commentId) {
    const response = await fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      {
        method: 'POST',
      },
    );

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.vote;
  }

  // komentar (down-vote)
  async function downVoteComment(threadId, commentId) {
    const response = await fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      {
        method: 'POST',
      },
    );

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.vote;
  }

  // leaderboard
  async function getLeaderboard() {
    try {
      const response = await fetch(`${BASE_URL}/leaderboards`);
      const responseData = await response.json();

      if (response.ok) {
        return responseData.data.leaderboards;
      // eslint-disable-next-line no-else-return
      } else {
        throw new Error(responseData.message || 'Failed to fetch leaderboard');
      }
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch leaderboard');
    }
  }

  // Neutralize Thread vote
  async function neutralizeThreadVote(threadId) {
    const response = await fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/neutral-vote`,
      {
        method: 'POST',
      },
    );

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.vote;
  }

  // Neutralize Comment vote
  async function neutralizeCommentVote(threadId, commentId) {
    const response = await fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {
        method: 'POST',
      },
    );

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.vote;
  }

  return {
    register,
    login,
    getOwnProfile,
    getAllUsers,
    createThread,
    getAllThreads,
    getThreadDetail,
    createComment,
    upVoteThread,
    downVoteThread,
    upVoteComment,
    downVoteComment,
    getLeaderboard,
    putAccessToken,
    neutralizeThreadVote,
    neutralizeCommentVote,
  };
})();

export default api;
