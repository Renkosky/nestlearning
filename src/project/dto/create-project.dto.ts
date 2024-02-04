export class projectDto {
  id: number;
  name: string;
  devUrl: string;
  description?: string;
  created_at?: Date;
  cover?: string;
  uatUrl?: string;
  prodUrl?: string;
}

export class EnvironmentUrlsDTO {
  devUrl?: string;
  uatUrl?: string;
  prodUrl?: string;
}
