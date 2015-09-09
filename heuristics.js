// Heuristic 1, Lukas already wrote it by writing the A* framework

// Heuristic 2, Dan

// Heuristic 3, Brett
/**
 * Heuristic 3 returns the maximum of the horizontal and vertical distance
 * @param square Object containing coordinates of current square
 * @param goal Object with goal coordinates
 * @returns Maximum of vertical/horizontal distance to goal
 */
function maxDistance(square, goal) {
    horizDiff = Math.abs(goal.x - square.x);
    vertDiff = Math.abs(goal.y - square.y);
    return Math.max(horizDiff, vertDiff);
}

// Heuristic 4, Lukas

// Heuristic 5, Dan

// Heuristic 6, Brett
