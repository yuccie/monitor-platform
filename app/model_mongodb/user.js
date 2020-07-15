module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('monitor'); 

  const UserSchema = new Schema({
    userName: { type: String  },
    password: { type: String  },
  });
 
  return conn.model('User', UserSchema);
}