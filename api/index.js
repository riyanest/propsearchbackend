import app from '../index';
app.listen(process.env.PORT, () => {
    if (result.error) {
      throw result.error;
    }
    console.log(result.parsed);
    console.log(`server is running on port ${process.env.PORT}`);
  });
module.exports=app