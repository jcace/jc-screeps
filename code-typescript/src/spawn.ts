import * as config from "./config";
import * as mem from "./creeps/mem";

export function spawnCreepsToQuota() {
  if (Game.spawns["Spawn1"].spawning) return;
  const numMiners = _.filter(Game.creeps, (creep: Creep) => creep.memory.role === mem.CreepRoles.ROLE_MINER).length;

  if (numMiners < config.NUM_HARVESTERS) {
    let newName = "miner" + Game.time;
    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: mem.CreepRoles.ROLE_MINER } });
  }
}
