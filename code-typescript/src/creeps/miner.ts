function findBestResourceId(creep: Creep): string {
  const sources = creep.room.find(FIND_SOURCES);

  if (!Memory.sources || Object.keys(Memory.sources).length === 0) {
    const sourceMem: SourceMemory[] = [];
    sources.forEach(src => {
      sourceMem.push({ id: src.id, num: 0 });
    });

    Memory.sources = sourceMem;
  }

  const memoryRead: SourceMemory[] = Memory.sources;
  let leastBusySource: string;
  let min = 999;
  memoryRead.forEach(src => {
    if (src.num <= min) {
      leastBusySource = src.id;
      min = src.num;
    }
  });

  console.log(`Least Busy: ${leastBusySource}`);

  return leastBusySource;
}

function incrementResource(thisSource: string) {
  Memory.sources.forEach(src => {
    if (src.id === thisSource) {
      src.num++;
    }
  });
}

function decrementResource(thisSource: string) {
  Memory.sources.forEach(src => {
    if (src.id === thisSource) {
      src.num--;
    }
  });
}

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
