const map = [
  [1, 5, 2],
  [2, 5, 7],
  [2, 3, 2],
]
const costStep = 1
const start = "[0][0]"
const end = `[${map.length - 1}][${map[0].length - 1}]`

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

  function shortPath(map, start) {
    const costs = {}
    const processed = []
    let neighbors = {}

    Object.keys(map).forEach((point) => {
      if (point !== start) {
        let value = map[start][point]
        costs[point] = value || Infinity
      }
    })

    let point = findePointLowestCost(costs, processed)
    while (point) {
      const cost = costs[point]
      neighbors = map[point]
      Object.keys(neighbors).forEach((neighbor) => {
        let newCost = cost + neighbors[neighbor]
        if (newCost < costs[neighbor]) {
          costs[neighbor] = newCost
        }
      })
      processed.push(point)
      point = findePointLowestCost(costs, processed, end)
    }

    return costs
  }

  function findePointLowestCost(costs, processed) {
    let lowestCost = Infinity
    let lowestPoint

    Object.keys(costs).forEach((point) => {
      let cost = costs[point]

      if (cost < lowestCost && !processed.includes(point)) {
        lowestCost = cost
        lowestPoint = point
      }
    })

    return lowestPoint
  }
  console.log(shortPath(convertMap(map), start))
}

calculateRoverPath(map)
module.exports = {
  calculateRoverPath,
}
