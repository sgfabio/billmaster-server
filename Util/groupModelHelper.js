const populateGroups = (promResponse) => {
  return promResponse.map((e) => {
    return e.populate(['expenses', 'settles']);
  });
};

const populateOneGroup = (promResponse) => {
  return promResponse.populate(['expenses', 'settles']);
};

module.exports = { populateGroups, populateOneGroup };
