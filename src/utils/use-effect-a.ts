import { useEffect } from "preact/hooks";
import { noop } from "./noop";

export function useEffectA(effect: () => any, deps?: any[]) {
    useEffect(() => {
        const r = effect();
        let disposer = noop;

        if (r instanceof Promise) {
            r.then((d) => (disposer = d));
        }
        return () => disposer();
    }, deps);
}
