export const enum CreepRoles {
  ROLE_UPGRADER = "upgrader",
  ROLE_MINER = "miner",
  ROLE_BUILDER = "builder"
}

declare global {
  interface CreepMemory {
    role: CreepRoles;
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
}
