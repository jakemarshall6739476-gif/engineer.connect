// Engineer Connect: talking to the online database (Supabase).
// Pages use window.EC instead of calling Supabase directly, so this is the one
// place to change if the database ever moves.
(function () {
  var cfg = window.EC_CONFIG || {};
  var sb = window.supabase && cfg.SUPABASE_URL
    ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_KEY)
    : null;

  var currentUser = null;
  var currentProfile = null;
  var listeners = [];

  function notify() { listeners.forEach(function (fn) { fn(currentUser, currentProfile); }); }

  function loadProfile() {
    if (!currentUser) { currentProfile = null; return Promise.resolve(null); }
    return sb.from("profiles").select("*").eq("id", currentUser.id).maybeSingle()
      .then(function (res) { currentProfile = res.data || null; return currentProfile; });
  }

  // Where links in sign-up and password emails should bring people back to.
  // (A ?query, not a #hash: Supabase adds its own sign-in details after the #.)
  function accountPageUrl(query) {
    return new URL("account.html" + (query || ""), location.href).href;
  }

  var ready = Promise.resolve();
  if (sb) {
    ready = sb.auth.getSession().then(function (res) {
      currentUser = res.data.session ? res.data.session.user : null;
      return loadProfile();
    }).then(notify).catch(function () {});

    sb.auth.onAuthStateChange(function (event, session) {
      var user = session ? session.user : null;
      var changed = (user && user.id) !== (currentUser && currentUser.id);
      currentUser = user;
      if (event === "PASSWORD_RECOVERY") {
        listeners.forEach(function (fn) { if (fn.onRecovery) fn.onRecovery(); });
      }
      if (changed) loadProfile().then(notify);
    });
  }

  window.EC = {
    available: !!sb,
    client: sb,
    ready: ready,
    user: function () { return currentUser; },
    profile: function () { return currentProfile; },
    // Call fn(user, profile) now and whenever someone signs in or out
    onChange: function (fn) { listeners.push(fn); ready.then(function () { fn(currentUser, currentProfile); }); },

    signUp: function (email, password, name) {
      return sb.auth.signUp({
        email: email, password: password,
        options: { data: { name: name }, emailRedirectTo: accountPageUrl("?welcome=1") }
      });
    },
    signIn: function (email, password) { return sb.auth.signInWithPassword({ email: email, password: password }); },
    signOut: function () { return sb.auth.signOut(); },
    sendPasswordReset: function (email) {
      return sb.auth.resetPasswordForEmail(email, { redirectTo: accountPageUrl("?reset=1") });
    },
    setNewPassword: function (password) { return sb.auth.updateUser({ password: password }); },

    saveProfile: function (fields) {
      return sb.from("profiles").update(fields).eq("id", currentUser.id).select().single()
        .then(function (res) {
          if (!res.error) { currentProfile = res.data; notify(); }
          return res;
        });
    },
    deleteAccount: function () {
      return sb.rpc("delete_my_account").then(function (res) {
        if (res.error) return res;
        return sb.auth.signOut().then(function () { return res; });
      });
    },

    // ----- Ideas -----
    // Each call returns a promise of { data, error }, like Supabase itself.
    listIdeas: function () {
      return sb.from("idea_list").select("*").eq("hidden", false).order("created_at", { ascending: false }).limit(500);
    },
    myBackedIdeaIds: function () {
      if (!currentUser) return Promise.resolve({ data: [] });
      return sb.from("idea_backers").select("idea_id").eq("user_id", currentUser.id).then(function (res) {
        return { data: (res.data || []).map(function (r) { return r.idea_id; }), error: res.error };
      });
    },
    postIdea: function (idea) { return sb.from("ideas").insert(idea).select().single(); },
    deleteIdea: function (id) { return sb.from("ideas").delete().eq("id", id); },
    backIdea: function (id) { return sb.from("idea_backers").insert({ idea_id: id }); },
    unbackIdea: function (id) { return sb.from("idea_backers").delete().eq("idea_id", id).eq("user_id", currentUser.id); },

    // ----- People and connections -----
    listProfiles: function () {
      return sb.from("profiles").select("id, name, role, discipline, location, skills, looking, created_at")
        .eq("visible", true).neq("name", "").order("created_at", { ascending: false }).limit(500);
    },
    myConnections: function () {
      if (!currentUser) return Promise.resolve({ data: [] });
      return sb.from("connection_requests").select("*");
    },
    sendConnection: function (toUser) { return sb.from("connection_requests").insert({ to_user: toUser }).select().single(); },
    answerConnection: function (id, status) { return sb.from("connection_requests").update({ status: status }).eq("id", id); },
    removeConnection: function (id) { return sb.from("connection_requests").delete().eq("id", id); },

    // ----- Jobs and job templates -----
    listJobs: function () { return sb.from("jobs").select("*").eq("hidden", false).order("created_at", { ascending: false }).limit(500); },
    postJob: function (row) { return sb.from("jobs").insert(row).select().single(); },
    deleteJob: function (id) { return sb.from("jobs").delete().eq("id", id); },
    listTemplates: function () {
      if (!currentUser) return Promise.resolve({ data: [] });
      return sb.from("job_templates").select("*").order("name");
    },
    saveTemplate: function (name, data) {
      return sb.from("job_templates").upsert({ owner: currentUser.id, name: name, data: data }, { onConflict: "owner,name" }).select().single();
    },
    deleteTemplate: function (id) { return sb.from("job_templates").delete().eq("id", id); }
  };

  // Shared helper: a sign-in prompt to show when a signed-out visitor tries to post
  window.EC.signInPrompt = function (what) {
    return 'Please <a href="account.html">sign in or create a free account</a> to ' + what + ".";
  };
})();
