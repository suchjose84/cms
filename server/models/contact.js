// module.exports = (mongoose) => {
//     const contactSchema = mongoose.Schema({
//       id: {
//         type: String
//       },
//       name: {
//         type: String
//       },
//       email: {
//         type: String
//       },
//       phone: {
//         type: String
//       },
//       imageUrl: {
//         type: String
//       },
//       group: {
//         type: String
//       }
//     }, {
//       versionKey: false,
//       collection: 'contacts' // Specify the custom collection name here
//     }
//     );
//     return mongoose.model('contact', contactSchema);
//   };
const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    id: {
      type: String
    },
    name: {
      type: String
    },
    email: {
      type: String
    },
    phone: {
      type: String
    },
    imageUrl: {
      type: String
    },
    group: {
      type: []
    }
  }, 
    {
      versionKey: false,
      collection: 'contacts' // Specify the custom collection name here
    }
);

module.exports = mongoose.model('Contact', contactSchema);