import {dryrun} from "@permaweb/aoconnect";
import {Agent, MarketTask, TaskStatus} from "../types/types";

const processId = 'sFuGUEb08JBSWiRmgxiI0cF_ADOR-RS0vz9MqXWHgKg';
let cache: { agents: Agent[], tasks: MarketTask[] } | null = null;

export async function fetchMarketData(...args: any[]) {
    console.log("Cache", args);

    console.log("Fetching Market Data...", cache);
    const [agentsResponse, tasksResponse] =
        await Promise.all([
            dryrun({
                process: processId,
                data: '',
                tags: [{name: 'Action', value: 'List-Agents'}]
            }),
            dryrun({
                process: processId,
                data: '',
                tags: [{name: 'Action', value: 'Tasks-Queue'}]
            })
        ]);

    const rawAgents = JSON.parse(agentsResponse.Messages[0].Data);
    const rawTasks = JSON.parse(tasksResponse.Messages[0].Data);
    const tasks = [...flattenTasks(rawAgents), ...rawTasks.map((task: MarketTask) => ({
        ...task,
        status: "queued"
    }))];
    cache = {
        agents: rawAgents,
        tasks
    }

    return cache;
}

function flattenTasks(agents: any[]) {
    const result: MarketTask[] = [];
    for (const agent of agents) {
        const assigned = Object.values<MarketTask>(agent.tasks.inbox)
            .map((task) => ({
                ...task,
                status: "assigned" as TaskStatus,
            }));
        const done = Object.values<MarketTask>(agent.tasks.results)
            .map((task) => ({
                ...task,
                status: 'done' as TaskStatus,
            }));

        const agentsTasks = [...assigned, ...done];
        result.push(...agentsTasks);
        agent.tasks = agentsTasks;
    }

    return result;
}

export async function cachedMarketData() {
    if (cache) {
        return cache;
    } else {
        return fetchMarketData(true);
    }
}