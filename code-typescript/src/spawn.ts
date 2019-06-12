function calculateQuotas(): { numUpgraders: number; numBuilders: number; numMiners: number } {
  // const thisRoom = Game.spawns.Spawn1.room; // TODO dynamic
  // const maxMiningUnits = thisRoom.find(FIND_SOURCES).length * 3 + 2; // 3 + 1 miners per resource
  // let numUpgraders = 1; // max 3
  // let numBuilders = 0; // max 3
  // let numMiners = 1;

  // if (thisRoom.controller) {
  //   if (thisRoom.controller.ticksToDowngrade < 5000) {
  //     numUpgraders++;
  //   }
  //   if (thisRoom.controller.level === 1) {
  //     numUpgraders++;
  //   }

  //   if (Object.keys(Game.constructionSites).length === 1) {
  //     numBuilders = 1;
  //   }
  //   if (Object.keys(Game.constructionSites).length > 1) {
  //     numBuilders = 3;
  //   }
  // }

  // if (thisRoom.energyCapacityAvailable - thisRoom.energyAvailable < 50) {
  //   numMiners = _.filter(Game.creeps, (creep: Creep) => creep.memory.role === mem.CreepRoles.ROLE_MINER).length;
  // } else {
  //   numMiners = maxMiningUnits - numUpgraders - numBuilders;
  // }
  // return { numUpgraders, numBuilders, numMiners };
  return { numUpgraders: 0, numBuilders: 0, numMiners: 5 };
}

function calculateWorkerQuota() {
  return 5;
}

export function spawnCreepsToQuota() {
  if (Game.spawns["Spawn1"].spawning) return;
  const workerQuota = calculateWorkerQuota();
  // console.log(JSON.stringify(miningUnitQuotas));

  const numWorkers = _.filter(Game.creeps, (creep: Creep) => creep.memory.type === "worker").length;

  if (numWorkers < workerQuota) {
    let newName = "worker" + Game.time;
    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { type: "worker", task: "mine" } });
  }
}
