'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.buildGraph = undefined;

var _extends =
    Object.assign ||
    function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }; /**
 * @module Graph/renderer
 * @description
 * Offers a series of methods that isolate render logic for Graph component.
 */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _const = require('./const');

var _const2 = _interopRequireDefault(_const);

var _link = require('../link/');

var _link2 = _interopRequireDefault(_link);

var _node = require('../node/');

var _node2 = _interopRequireDefault(_node);

var _graph = require('./graph.helper');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Build Link components for a given node.
 * @param  {string} nodeId - the id of the node to whom Link components will be generated.
 * @param  {Object.<string, Object>} nodes - same as {@link #buildGraph|nodes in buildGraph}.
 * @param  {Object.<string, Object>} links - same as {@link #buildGraph|links in buildGraph}.
 * @param  {Object} config - same as {@link #buildGraph|config in buildGraph}.
 * @param  {Function[]} linkCallbacks - same as {@link #buildGraph|linkCallbacks in buildGraph}.
 * @param  {string} highlightedNode - same as {@link #buildGraph|highlightedNode in buildGraph}.
 * @param  {Object} highlightedLink - same as {@link #buildGraph|highlightedLink in buildGraph}.
 * @param  {number} transform - value that indicates the amount of zoom transformation.
 * @returns {Object[]} returns the generated array of Link components.
 * @memberof Graph/helper
 */
function _buildNodeLinks(nodeId, nodes, links, config, linkCallbacks, highlightedNode, highlightedLink, transform) {
    var linksComponents = [];

    if (links[nodeId]) {
        var adjacents = Object.keys(links[nodeId]);
        console.log('========= BOOGA BOOGA ==========');
        console.log(adjacents);
        var n = adjacents.length;

        for (var j = 0; j < n; j++) {
            var source = nodeId;
            var target = adjacents[j];

            if (nodes[target]) {
                var key = '' + nodeId + _const2.default.COORDS_SEPARATOR + target;
                var props = (0, _graph.buildLinkProps)(
                    source,
                    target,
                    nodes,
                    links,
                    config,
                    linkCallbacks,
                    highlightedNode,
                    highlightedLink,
                    transform
                );

                linksComponents.push(_react2.default.createElement(_link2.default, _extends({ key: key }, props)));
            }
        }
    }

    return linksComponents;
}

/**
 * Method that actually is exported an consumed by Graph component in order to build all Nodes and Link
 * components.
 * @param  {Object.<string, Object>} nodes - an object containing all nodes mapped by their id.
 * @param  {Function[]} nodeCallbacks - array of callbacks for used defined event handler for node interactions.
 * @param  {Object.<string, Object>} links - an object containing a matrix of connections of the graph, for each nodeId,
 * there is an Object that maps adjacent nodes ids (string) and their values (number).
 * ```javascript
 *  // links example
 *  {
 *     "Androsynth": {
 *         "Chenjesu": 1,
 *         "Ilwrath": 1,
 *         "Mycon": 1,
 *         "Spathi": 1,
 *         "Umgah": 1,
 *         "VUX": 1,
 *         "Guardian": 1
 *     },
 *     "Chenjesu": {
 *         "Androsynth": 1,
 *         "Mycon": 1,
 *         "Spathi": 1,
 *         "Umgah": 1,
 *         "VUX": 1,
 *         "Broodhmome": 1
 *     },
 *     ...
 *  }
 * ```
 * @param  {Function[]} linkCallbacks - array of callbacks for used defined event handler for link interactions.
 * @param  {Object} config - an object containing rd3g consumer defined configurations {@link #config config} for the graph.
 * @param  {string} highlightedNode - this value contains a string that represents the some currently highlighted node.
 * @param  {Object} highlightedLink - this object contains a source and target property for a link that is highlighted at some point in time.
 * @param  {string} highlightedLink.source - id of source node for highlighted link.
 * @param  {string} highlightedLink.target - id of target node for highlighted link.
 * @param  {number} transform - value that indicates the amount of zoom transformation.
 * @returns {Object} returns an object containing the generated nodes and links that form the graph. The result is
 * returned in a way that can be consumed by es6 **destructuring assignment**.
 * @memberof Graph/helper
 */
function buildGraph(nodes, nodeCallbacks, links, linkCallbacks, config, highlightedNode, highlightedLink, transform) {
    var linksComponents = [];
    var nodesComponents = [];

    for (var i = 0, keys = Object.keys(nodes), n = keys.length; i < n; i++) {
        var nodeId = keys[i];

        var props = (0, _graph.buildNodeProps)(
            nodes[nodeId],
            config,
            nodeCallbacks,
            highlightedNode,
            highlightedLink,
            transform
        );

        nodesComponents.push(_react2.default.createElement(_node2.default, _extends({ key: nodeId }, props)));

        linksComponents = linksComponents.concat(
            _buildNodeLinks(nodeId, nodes, links, config, linkCallbacks, highlightedNode, highlightedLink, transform)
        );
    }

    return {
        nodes: nodesComponents,
        links: linksComponents
    };
}

exports.buildGraph = buildGraph;
