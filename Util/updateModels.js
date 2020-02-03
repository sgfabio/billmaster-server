module.exports = {
  findOneAndRemove(array, id) {
    for (let i = 0; i < array.length; i += 1) {
      if (String(array[i]) === String(id)) {
        array.splice(i, 1);
        break;
      }
    }
    return array;
  },
};
