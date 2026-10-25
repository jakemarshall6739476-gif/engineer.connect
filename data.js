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
    }
  };
})();
