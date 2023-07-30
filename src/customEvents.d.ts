interface WindowEventMap {
    allowInput: CustomEvent<{ allow: boolean }>;
    virtualKeyBoard: CustomEvent<{ key: string }>;
}
