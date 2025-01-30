export interface Agent {
    id: string;
    profileAddress: string;
    metadata: Record<string, unknown>;
    fee: number;
    tokenBalance: number;
    topic: string;
    tasks: MarketTask[]
}

export type TaskStatus = 'queued' | 'assigned' | 'done';

export interface MarketTask {
    status: TaskStatus;
    id: string;
    requesterId: string;   // which agent requested it
    matchingStrategy: string;   // which agent requested it
    block: number;
    agentId: string;
    topic: string;
    payload: any;
    timestamp: number;
    reward: string;
    result?: string;
}