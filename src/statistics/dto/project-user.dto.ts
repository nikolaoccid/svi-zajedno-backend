export class ProjectUserStatistics {
  totalUsers: number;
  maleUsers: number;
  femaleUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  pendingUsers: number;
  ageGroups: {
    under6: number;
    age7to12: number;
    age13to18: number;
    age19to24: number;
  };
  sourceSystems: { [key: string]: number };
  protectionTypes: { [key: string]: number };
  activeActivities: number;
  inactiveActivities: number;
  pendingActivities: number;
  totalActivities: number;
}
