class GreensClient {
  constructor() {
    this.baseUrl = '/api/v0'; // Same scheme, host, and port.
    this.token = null;
    this.playerId = null;
    this.errorCount = 0;
    this.arena = '';
    this.arenaId = 99;
  }

  /* Make a JSON API call to the server.
   * Then strip off the defensive prefix from the response. */
  async doFetch(resource, httpMethod, body) {
    const url = this.baseUrl + resource;
    const headers = {
      'accept': 'application/json',
      'content-type': 'application/json',
    };
    const options = {
      method: httpMethod,
      credentials: 'same-origin',
      headers: headers,
    };
    if (body !== null) {
      options['body'] = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (response.status !== 200) {
      this.errorCount++;
      throw new Error(
          `Got error response from server ${resource}: ${response.status}`);
    }
    const rawResponseText = await response.text();
    const XSSIPrefix = ')]}\'\n';
    if (!rawResponseText.startsWith(XSSIPrefix)) {
      console.log(rawResponseText);
      throw new Error(
          `Response does not start with XSSI prefix: ${XSSIPrefix}`);
    }
    return JSON.parse(rawResponseText.substr(XSSIPrefix.length));
  }

  doGet(resource, body) {
    return this.doFetch(resource, 'GET', body);
  }

  doPost(resource, body) {
    return this.doFetch(resource, 'POST', body);
  }
  
  // //////////////////////////////////////////////////////////////
  // Specific API calls

  useArena(arena) {
    this.arena = arena;
    return this.doPost('/arenas', {arena})
      .then((res) => {
	this.arenaId = res.arena_id;
	return res;
      });
    // TODO: catch((error) => { display message }
  }

  addPlayer(nick) {
    return this.doPost(`/players/${this.arenaId}`, {nick})
      .then((res) => {
	this.token = res.token;
	this.playerId = res.player_id;
	return res;
      });
    // TODO: catch((error) => { display message }
  }

  getPlayers() {
    return this.doGet(`/players/${this.arenaId}`)
      .then((res) => res);
    // TODO: catch((error) => { display message }
  }

  getStory() {
    return this.doGet(`/story`).then((res) => res);
    // TODO: catch((error) => { display message }
  }

  getArena() {
    const url = `/arenas/${this.arenaId}/${this.playerId}`;
    return this.doGet(url).then((res) => res);
    // TODO: catch((error) => { display message }
  }

  postCmd(cmd) {
    const url = `/cmds/${this.arenaId}/${this.playerId}`;
    const body = {
      token: this.token,
      cmd,
    };
    return this.doPost(url, body)
      .then((res) => res);
    // TODO: catch((error) => { display message }
  }

};

// export
const gioClient = new GreensClient();
