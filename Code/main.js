var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
const constants = require("constants");

module.exports.loop = function() {
  var harvesters = _.filter(
    Game.creeps,
    creep => creep.memory.role == "harvester"
  );
  var upgrader = _.filter(
    Game.creeps,
    creep => creep.memory.role == "upgrader"
  );

  if (
    harvesters.length < constants.NUM_HARVESTERS &&
    !Game.spawns["Spawn1"].spawning
  ) {
    var newName = "Harvester" + Game.time;
    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, {
      memory: { role: "harvester" }
    });
  }
  if (
    upgrader.length < constants.NUM_UPGRADERS &&
    !Game.spawns["Spawn1"].spawning
  ) {
    var newName = "Upgrader" + Game.time;
    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, {
      memory: { role: "upgrader" }
    });
  }

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == "harvester") {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == "upgrader") {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == "builder") {
      roleBuilder.run(creep);
    }
  }
};
