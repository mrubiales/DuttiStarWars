export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public age: number;
  public email: string;

  constructor(data: any) {
    this.id = data.id || 0;
    this.firstName = data.first_name || "Roy";
    this.lastName = data.last_name || "Batty";
    this.age = data.age || undefined;
    this.email = data.email || "";
  }
}
