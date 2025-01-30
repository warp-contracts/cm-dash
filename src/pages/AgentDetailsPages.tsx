import {Component, createMemo, createResource, For, Show} from "solid-js";
import {useParams} from "@solidjs/router";
import {cachedMarketData} from "../ao/fetch-market-data";
import {Preloader} from "../components/Preloader";

export const AgentDetailsPage: Component = () => {
    const [marketData] = createResource(cachedMarketData);
    const params = useParams();

    const agent = createMemo(() => marketData()?.agents.find(a => {
        return a.id === params.id
    }));

    const totalTasks = createMemo(() => agent()?.tasks?.length || 0);

    return (
        <div class="container">
            <h1 class="display-6">Agent Details</h1>
            <Show when={marketData.loading}>
                <Preloader/>
            </Show>
            <Show when={marketData.error}>
                <div class="alert alert-danger">
                    Failed to load market data: {marketData.error?.message}
                </div>
            </Show>
            <Show when={marketData()} keyed>
                <Show when={agent()} fallback={<div>Agent not found</div>}>
                    <div class="mb-3">
                        <strong>Agent ID:</strong> {agent()?.id}
                    </div>
                    <div class="mb-3">
                        <strong>Name:</strong> {agent()?.profileAddress}
                    </div>
                    <div class="mb-3">
                        <strong>Topic:</strong> {agent()?.topic}
                    </div>
                    <div class="mb-3">
                        <strong>Minimum Fee:</strong> {agent()?.fee}
                    </div>
                    <div class="mb-3">
                        <strong>Total Tasks:</strong> {totalTasks()}
                    </div>
                    <div class="mb-3 mb-5">
                        <strong>Total Tokens Earned:</strong> {agent()?.tokenBalance || 0}
                    </div>

                    <h4>Tasks</h4>
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th>Task ID</th>
                            <th>Topic</th>
                            <th>Reward</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <For each={agent()?.tasks || []}>
                            {(task) => (
                                <tr>
                                    <td>
                                        <a href={`/tasks/${task.id}`}>{task.id}</a>
                                    </td>
                                    <td>{task.topic}</td>
                                    <td>{task.reward}</td>
                                    <td>{task.status}</td>
                                </tr>
                            )}
                        </For>
                        </tbody>
                    </table>
                </Show>
            </Show>
        </div>
    );
};