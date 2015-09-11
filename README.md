# A Star Search
[![Build Status](https://magnum.travis-ci.com/lhunker/ai_astar.svg?token=qwSLr6vz4Z85Dh9xqDjB&branch=master)](https://magnum.travis-ci.com/lhunker/ai_astar)

An implementation of A star search for an AI class

Written using Node.js v0.12
Node.js can be downloaded from https://nodejs.org/en/ or through your package manager.

##To Install Dependencies
`npm install`
We use a csv library, a priority queue library, and the file system library

##To run
`node index.js <boardfile> <hueristic number>`
(Note on some operating systems node is in the nodejs package due to a naming conflict)

Note that our nodes expanded may be differant from other groups because we applied an optimization.
Our program groups similar moves into one node, for example it will group a bash and the subsequent
forward into one node.

##Authors
Lukas Hunker, Dan Murray, Brett Ammeson
