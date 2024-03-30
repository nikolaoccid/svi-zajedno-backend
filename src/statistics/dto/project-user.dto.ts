export class ProjectUserStatisticsResponse {
  totalUsers: number;
  maleUsers: number;
  femaleUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  pendingUsers: number;
  ageGroups: AgeGroups;
  sourceSystems: SourceSystems;
  protectionTypes: ProtectionTypes;
  activeActivities: number;
  inactiveActivities: number;
  pendingActivities: number;
  totalActivities: number;
  totalProjectValue: number;
  associatesTotalActivities: number;
  associatesActiveActivities: number;
  associatesInactiveActivities: number;
}

export class AgeGroups {
  under6: number;
  age7to12: number;
  age13to18: number;
  age19to24: number;
}

export class SourceSystems {
  czss: number;
  obiteljskicentar: number;
}

export class ProtectionTypes {
  zmn: number;
  preporuka: number;
  udomiteljstvo: number;
}
