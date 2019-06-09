interface CreepMemory {
  role: CreepRole;
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

type CreepRole = "upgrader" | "miner" | "builder";
