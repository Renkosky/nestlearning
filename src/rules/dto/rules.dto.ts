export class RuleDto {
  data: {
    projectId: number;
    url: string;
    method?: string;
    name?: string;
    code?: string;
  };
}
