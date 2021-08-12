// NOTA: Generado automaticamente, podría estar incompleto

export interface Title {
  type: string;
  text: string;
}

export interface Tag {
  type: string;
  name: string;
}

export interface Paragraph {
  text: string;
  tags: Tag[];
}

export interface Content {
  title: Title;
  paragraphs: Paragraph[];
}

export interface ExtraInformation {
  type: string;
  show: boolean;
  content: Content;
}

export interface TrackingData {
  category: string;
  action: string;
  label: string;
}

export interface Workflow {
  type: string;
  order: number;
}

export default interface Issue {
  issueId: string;
  title: string;
  reason_salesforce: string;
  subReason_salesforce: string;
  formId: string;
  orderInLevel: number;
  childs: Issue[];
  extraInformation: ExtraInformation;
  trackingData: TrackingData;
  workflow: Workflow[];
  productSelectionType: string;
  productGroupingType: string;
  postProcessing: string[];
  processingService: string;
}
