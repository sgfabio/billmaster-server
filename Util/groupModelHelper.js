exports.populateGroup = (promResponse) => {
  return promResponse.map(e => {
    return e.populate(['members', 'expenses', 'settles'])
  })
}