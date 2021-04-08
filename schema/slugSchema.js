const yup = require('yup');

const slugSchema = yup.object().shape({
  slug: yup.string().matches(/[0-9a-z-_]/).trim(),
  url: yup.string().url().required()
});
module.exports = slugSchema;