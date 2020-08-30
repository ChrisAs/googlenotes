module.exports = {
  jwtSecret: "pinecone",

  db:
    "mongodb+srv://dbAdmin:redapple@cluster0.ilkzw.mongodb.net/<dbname>?retryWrites=true&w=majority",
  web: {
    client_id:
      "1056768521548-tth9bs23ejflj8cg3hsocqmjklhkf1b4.apps.googleusercontent.com",
    project_id: "covid-19-map-280117",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: "4MoLBBsDubdaGcqXOPqnSyf-",
    redirect_uris: "https://googlenotesapp.herokuapp.com/api/google/callback",
    javascript_origins: ["https://googlenotesapp.herokuapp.com"],
  },
};
