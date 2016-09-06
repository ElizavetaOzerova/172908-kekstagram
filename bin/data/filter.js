'use strict';

module.exports = function(list, filterID) {
  // В зависимости от выбранного фильтра изменяем список изображений.
  var madeThreeDayAgo = function(obj) {
    var countDays = ((Date.now() - obj.created) / 24 / 60 / 60 / 1000) + 1;
    if (countDays <= 3) {
      return true;
    }

    return false;
  };

  switch(filterID) {
    case 'filter-popular':
      return list.sort(function(a, b) {
        return b.likes - a.likes;
      });

    case 'filter-new':
      return list.filter(madeThreeDayAgo).sort(function(a, b) {
        return new Date(a.created).getTime() - new Date(b.created).getTime();
      });


    case 'filter-discussed':
      return list.sort(function(a, b) {
        return b.comments - a.comments;
      });
  }

  return list;
};
