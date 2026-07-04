import type { Snippet } from 'svelte';
interface Props {
    date?: Date;
    children?: Snippet;
}
declare const Formatter: import("svelte").Component<Props, {}, "">;
type Formatter = ReturnType<typeof Formatter>;
export default Formatter;
