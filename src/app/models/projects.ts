export class Project {
   name: string;
   target: string;
   description: string;
   timeLimitMonths: number;
   cost: number;
   approved: boolean;

    constructor(name: string, target: string, description: string, timeLimitMonths: number, cost: number, approved: boolean) {
      this.name = name;
      this.target = this.target;
      this.description = description;
      this.timeLimitMonths = timeLimitMonths;
      this.cost = cost;
      this.approved = approved;
    }
  }
