export class reportDto {
  data: {
    errorId: number;
    name: string;
    createdAt:number;
    resloved:boolean;
    level: string;
    message?: string;
    stack?: any[];
    type?: string;
    url?: string;
    time: number
  };
  breadcrumb:any[]
}
