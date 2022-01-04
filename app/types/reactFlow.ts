export interface NodeDropdownInstance {
    id: number,
    label: string,
    description: string,
    style: any, // TODO: fix later
    attributes: any, // TODO: fix later
}

export enum ContextTypes {
    Node = 'node',
    Pane = 'pane',
    Edge = 'edge',
    Selection = 'selection'
}
