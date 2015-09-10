/**
 * Created by lhunker on 9/7/15.
 * square.js
 * A class to hold the frontier nodes
 */

/**
 * Class to represent a frontier node
 * @param location The coordinate of the node expressed as {x, y}
 * @param cost The cost to get to this square
 * @param path the path taken to get here (as a string)
 * @param direction The direction the agent is facing as a string (N, S, E, W)
 * @param actions the number of actions taken thus far
 * @constructor
 */
function Square(location, cost, path, direction, actions) {
    this.location = location;
    this.cost = cost;
    this.path = path;
    this.direction = direction;
    this.totcost = 0;
    this.actions = actions;
}

/**
 * @param board the board to find neighbors on
 * @param heuristic a function that takes a location, and goal and returns the heuristic cost
 * @returns [square] and array of squares for the expanded nodes
 */
Square.prototype.expand = function (board, heuristic) {
    var _this = this;
    var neighbors = board.getNeighbors(this.location.x, this.location.y, this.path, this.direction);

    //Calculate cost
    neighbors.forEach(function (n) {
        var h = heuristic(n.location, board.getGoal());
        n.cost = n.cost + _this.cost;
        n.totcost = h + n.cost;
        n.actions = n.actions + _this.actions;
    });

    return neighbors;
};

/**
 * Returns the square's location
 * @returns {x, y} the x, y coordinates of the node
 */
Square.prototype.getLocation = function () {
    return this.location;
};

/**
 * Gets the cost of the node
 * @returns The cost of the node as a number
 */
Square.prototype.getCost = function () {
    return this.totcost;
};

/**
 * Returns the actual cost to get to the node (no heuristic)
 * @returns number the cost of reaching the square
 */
Square.prototype.getActualCost = function () {
    return this.cost;
};

/**
 * Returns the number of actions used to get to the move state
 */
Square.prototype.getActions = function () {
    return this.actions;
};

/**
 * Returns the path taken to this node
 * @returns string the path taken to the node
 */
Square.prototype.getPath = function () {
    return this.path;
};

module.exports = Square;
