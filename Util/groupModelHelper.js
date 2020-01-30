const populateGroup = (promResponse) => {
  return promResponse.map((e) => {
    return e.populate(['expenses', 'settles']);
  });
};

module.exports = populateGroup;