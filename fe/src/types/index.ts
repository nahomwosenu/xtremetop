export interface BasicType {
    url: string;
    title: string;
    description: string;
}
export interface ServerType {
    server_ip: string;
    server_port: string;
    title: string;
    description: string;
}
export interface ServerAdvancedType {
    server_ip: string;
    server_port: string;
    server_query_port: string;
    title: string;
    description: string;
}
export interface GameType {
    name: string;
    metaData: BasicType | ServerType | ServerAdvancedType;
}