export interface DatabaseModel {
  connect(): void;
  isConnected(): boolean;
  disconnect(): void;
}