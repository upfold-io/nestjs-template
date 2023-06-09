export class ApiError {
  type: string;
  code: number;
  message: string;
  params?: any[];

  constructor(type: string, code: number, message: string, params: any[] = []) {
    this.type = type;
    this.code = code;
    this.message = message;
    this.params = params;
  }
}
