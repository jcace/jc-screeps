interface CreepMemory {
  type: CreepType;
  task: CreepTask;
  working?: boolean;
  minerSource?: string;
}

interface Memory {
  sources: SourceMemory[];
}

interface SourceMemory {
  id: string;
  num: number;
}

type CreepTask = "upgrade" | "mine" | "build";
type CreepType = "worker" | "scout" | "warrior";
