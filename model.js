// Simple KNN classifier in JavaScript
function euclideanDistance(p1, p2) {
  return Math.sqrt(
    p1.reduce((sum, val, i) => sum + Math.pow(val - p2[i], 2), 0)
  );
}

function knn(trainData, trainLabels, testPoint, k = 3) {
  const distances = trainData.map((point, i) => ({
    label: trainLabels[i],
    distance: euclideanDistance(point, testPoint),
  }));

  const nearest = distances.sort((a, b) => a.distance - b.distance).slice(0, k);

  const votes = {};
  nearest.forEach((n) => {
    votes[n.label] = (votes[n.label] || 0) + 1;
  });

  return Object.keys(votes).reduce((a, b) => (votes[a] > votes[b] ? a : b));
}

const trainData = [
  [1, 2], [2, 3], [3, 1], // Class A
  [6, 5], [7, 7], [8, 6]  // Class B
];
const trainLabels = ['A', 'A', 'A', 'B', 'B', 'B'];

const testPoint = [5, 4];
const k = 1;

const predicted = knn(trainData, trainLabels, testPoint, k);
console.log(`Predicted class for [${testPoint}]:`, predicted);
