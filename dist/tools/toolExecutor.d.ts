interface ExecuteToolInput {
    name: string;
    args: Record<string, unknown>;
    ownerId: string;
}
export declare function executeTool({ name, args, ownerId }: ExecuteToolInput): Promise<string>;
export {};
//# sourceMappingURL=toolExecutor.d.ts.map