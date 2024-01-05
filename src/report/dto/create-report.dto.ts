export class reportDto {
  data: {
    id: number;
    name: string;
    level: string;
    message?: string;
    stack?: string;
    type?: string;
    uatUrl?: string;
    url?: string;
  };
}
