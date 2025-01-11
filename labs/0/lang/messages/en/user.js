export const invalidInputs = {
  outOfRangeMessage: "Number of buttons should be between 3 and 7.",
};

export const winScenario = {
  winMessage: "Excellent memory!",
};

export function getGameOverMessage(order) {
  return `Wrong order! The correct order is: ${order}`
}