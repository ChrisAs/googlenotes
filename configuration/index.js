module.exports = {
  jwtSecret: "fiverrsecret",
  // db: 'mongodb://localhost:27017/test',
  db:
    "mongodb+srv://dbAdmin:redapple@cluster0.ilkzw.mongodb.net/<dbname>?retryWrites=true&w=majority",
  web: {
    client_id:
      "174305250349-8mttdogu80ov35jt5k6u9tmg2f93i1o0.apps.googleusercontent.com",
    project_id: "third-arcadia-259917",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: "hlCFQiP2eCwoc3n5LC-wM7on",
    redirect_uris: "https://googlenotesapp.herokuapp.com/api/google/callback",
    javascript_origins: ["https://googlenotesapp.herokuapp.com"],
  },
};
