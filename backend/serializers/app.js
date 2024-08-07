const { format } = require("date-fns");

const serializeApp = (app) => {
  const createdDate = new Date(app.createdDate);
  return {
    id: app._id,
    parameterKey: app.parameterKey,
    value: app.value,
    description: app.description,
    createdDate: format(createdDate, "MM/dd/yyyy HH:mm"),
  };
};

module.exports = { serializeApp };
