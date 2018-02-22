module.exports = {  
    arrayToStringWithCommas: (array, and) => {
      if(!array || !Array.isArray(array) || array.length < 1) return '';
      if(array.length < 2) return array[0];
      let lastIndex = array.length - 1;
      let firstPart = array.slice(0, lastIndex).join(', ');
      return firstPart + and + array[lastIndex];
    }
}