'use strict';

module.exports = function(list, from, to) {
  // Вместо полного массива, переданного на вход, возвращаем выборку из него.
  return list.slice(from, to);
};
