const mongoose = require('mongoose');

const connect = () => {
    main()
    .then(()=>console.log("mongoDB is connected!"))
    .catch(err => console.log(err));
}


async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

module.exports = connect