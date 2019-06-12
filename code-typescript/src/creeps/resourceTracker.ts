export function findBestResourceId(creep: Creep): string {
  if (!Memory.sources || Object.keys(Memory.sources).length === 0) {
    const sources = creep.room.find(FIND_SOURCES);
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

  return leastBusySource;
}

function purgeDeadMiners(totalMiners) {
  // TODO: decrementResource so that #miners matches creeps with memory minerSource === this source.
}

export function incrementResource(thisSource: string) {
  Memory.sources.forEach(src => {
    if (src.id === thisSource) {
      src.num++;
    }
  });
}

export function decrementResource(thisSource: string) {
  Memory.sources.forEach(src => {
    if (src.id === thisSource) {
      src.num--;
    }
  });
}
