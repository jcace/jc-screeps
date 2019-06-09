import { decrementResource, findBestResourceId, incrementResource } from "./resourceTracker";

export function run(creep: Creep) {
  if (creep.carry.energy === 0 && !creep.memory.working) {
    creep.memory.working = true;
    creep.memory.minerSource = findBestResourceId(creep);
    incrementResource(creep.memory.minerSource);
  }
  if (creep.carry.energy === creep.carryCapacity && creep.memory.working) {
    creep.memory.working = false;
    decrementResource(creep.memory.minerSource);
  }

  if (creep.memory.working) {
    const target: Source = Game.getObjectById(creep.memory.minerSource);
    if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target, { visualizePathStyle: { stroke: "#ffaa00" } });
    }
  } else {
    var targets = creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return (
          (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
          structure.energy < structure.energyCapacity
        );
      }
    });
    if (targets.length > 0) {
      if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
      }
    }
  }
}
