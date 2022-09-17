db.createUser(
  {
    user: "scheduler",
    pwd: "Passworde3611b4a4a174505a8e516453b679a05",
    roles: [
      {
        role: "readWrite",
        db: "schedule"
      }
    ]
  }
);
