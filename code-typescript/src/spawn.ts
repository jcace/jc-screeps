import * as config from "./config";
import * as mem from "./creeps/mem";

export function spawnCreepsToQuota() {
  if (Game.spawns["Spawn1"].spawning) return;
  const numMiners = _.filter(Game.creeps, (creep: Creep) => creep.memory.role === mem.CreepRoles.ROLE_MINER).length;
  const numUpgraders = _.filter(Game.creeps, (creep: Creep) => creep.memory.role === mem.CreepRoles.ROLE_UPGRADER)
    .length;
  const numBuilders = _.filter(Game.creeps, (creep: Creep) => creep.memory.role === mem.CreepRoles.ROLE_BUILDER).length;

  if (numMiners < config.NUM_HARVESTERS) {
    let newName = "miner" + Game.time;
    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: mem.CreepRoles.ROLE_MINER } });
  }
  if (numUpgraders < config.NUM_UPGRADERS) {
    let newName = "upgrader" + Game.time;
    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, {
      memory: { role: mem.CreepRoles.ROLE_UPGRADER, working: false }
    });
  }
  if (numBuilders < config.NUM_BUILDERS) {
    let newName = "builder" + Game.time;
    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, {
      memory: { role: mem.CreepRoles.ROLE_BUILDER, working: false }
    });
  }
}
