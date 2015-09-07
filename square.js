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
 * @constructor
 */
function Square(location, cost, path, direction) {
    this.location = location;
    this.cost = cost;
    this.path = path;
    this.direction = direction;

}

Square.prototype.expand = function () {


};

module.exports = Square;