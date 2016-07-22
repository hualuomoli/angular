angular.module 'demo.dashboard.v1'
.controller 'demoDashboardV1Ctrl', ['$scope', ($scope)->

  $scope.d = [ [1,6.5],[2,6.5],[3,7],[4,8],[5,7.5],[6,7],[7,6.8],[8,7],[9,7.2],[10,7],[11,6.8],[12,7] ]

  $scope.d0_1 = [ [0,7],[1,6.5],[2,12.5],[3,7],[4,9],[5,6],[6,11],[7,6.5],[8,8],[9,7] ]

  $scope.d0_2 = [ [0,4],[1,4.5],[2,7],[3,4.5],[4,3],[5,3.5],[6,6],[7,3],[8,4],[9,3] ]

  $scope.d1_1 = [ [10, 120], [20, 70], [30, 70], [40, 60] ]

  $scope.d1_2 = [ [10, 50],  [20, 60], [30, 90],  [40, 35] ]

  $scope.d1_3 = [ [10, 80],  [20, 40], [30, 30],  [40, 20] ]

  $scope.d2 = []

  for i in [1..20]
    $scope.d2.push [i, Math.sin(i)]

  $scope.d3 = [ 
    { label: "iPhone5S", data: 40 }, 
    { label: "iPad Mini", data: 10 },
    { label: "iPad Mini Retina", data: 20 },
    { label: "iPhone4S", data: 12 },
    { label: "iPad Air", data: 18 }
  ]

  $scope.refreshData = ()->
    $scope.d0_1 = $scope.d0_2

  $scope.getRandomData = ()->
    data = []
    totalPoints = 150
    if data.length > 0
      data = data.slice(1)

    while (data.length < totalPoints) 
      prev = if data.length > 0 then data[data.length - 1] else 50
      y = prev + Math.random() * 10 - 5
      if (y < 0) 
        y = 0
      else if (y > 100)
        y = 100

      data.push(y)

    # Zip the generated y values with the x values
    res = []
    for i in [0..data.length]
      res.push([i, data[i]])

    return res

  $scope.d4 = $scope.getRandomData()

]