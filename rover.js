function calculateRoverPath(map) {
  fs = require("fs")
  const start = "[0][0]"
  const end = `[${map.length - 1}][${map[0].length - 1}]`
  const costStep = 1
  let curStep = end
  let resultPath = []

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

  let newMap = convertMap(map)

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
      point = findePointLowestCost(costs, processed)
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

  let costs = shortPath(newMap, start)

  function pathRestoration(map, costs, start, end) {
    Object.keys(map).forEach((point) => {
      if (curStep in map[point]) {
        if (costs[curStep] === costs[point] + map[point][curStep]) {
          resultPath.unshift(point)
          curStep = point
          pathRestoration(map, costs, start, end)
        }
      }
    })
    return
  }

  pathRestoration(newMap, costs, start, end)

  function saveRoverPath(path, costs, start, end) {
    path.push(end)
    path.unshift(start)
    const steps = path.length - 1
    const fuel = costs[end]
    let pathStr = path.join("->")

    let res = `${pathStr}
steps: ${steps}
fuel: ${fuel}`

    fs.writeFile("path-plan.txt", res, function (err) {
      if (err) {
        return err
      }
    })
  }

  return saveRoverPath(resultPath, costs, start, end)
}

module.exports = {
  calculateRoverPath,
}
