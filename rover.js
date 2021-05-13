const map = [
  [1, 5, 2],
  [2, 5, 7],
  [2, 3, 2],
]
const costStep = 1

function calculateRoverPath(map) {
  function calcFuel(current, next) {
    return Math.abs(current - next) + costStep
  }

  function convertMap(map) {
    let newMap = {}
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        let point = {}
        if (i < map.length - 1) {
          point[`[${i + 1}][${j}]`] = calcFuel(map[i][j], map[i + 1][j])
        }
        if (j < map[i].length - 1) {
          point[`[${i}][${j + 1}]`] = calcFuel(map[i][j], map[i][j + 1])
        }

        newMap[`[${i}][${j}]`] = point
      }
    }
    return newMap
  }
  return convertMap(map)
}

console.log(calculateRoverPath(map))
module.exports = {
  calculateRoverPath,
}
