module.exports = app => {
  const Schema = app.mongoose.Schema;
  const conn = app.mongooseDB.get('monitor');

  const PerfDbsSchema = new Schema({
    downloadTime: String
  })

  return conn.model('PerfDbs', PerfDbsSchema)
}