export class projectDto {
  id: number;
  name: string;
  devUrl: string;
  description?: string;
  created_at?: Date;
  ownerId: number;
  cover?: string;
  uatUrl?: string;
  prodUrl?: string;
}

export class EnvironmentUrlsDTO {
  devUrl?: string;
  uatUrl?: string;
  prodUrl?: string;
}
