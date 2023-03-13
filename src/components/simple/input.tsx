import { HTMLAttributes } from "preact/compat";
import { useCallback, useState } from "preact/hooks";

type UseSimpleInputParams<ValueT = string> = {
    defaultValue?: ValueT;
    updateOnBlur?: boolean;
    fromState?: (x: ValueT | undefined) => string;
    toState?: (x: string) => ValueT;
};

// const [riskRate, setRiskRate, riskInput] = useSimpleInput<number>({
//     fromState: (x) => (x ? `${x} %` : "0 %"),
//     toState: (x) => parseFloat(x),
//     defaultValue: 30,
// });

export function useSimpleInput<ValueT = string>(params?: UseSimpleInputParams<ValueT>, attribs?: HTMLAttributes<HTMLInputElement>) {
    const [value, setValue] = useState<ValueT | undefined>(params?.defaultValue);
    const handleChange = useCallback((evt: any) => {
        const nextValue = params?.toState ? params.toState(evt.target.value) : evt.target.value;
        setValue(nextValue);
    }, []);

    const inputValue: any = params?.fromState ? params.fromState(value) : value;

    const renderedInput = (
        <input
            {...attribs}
            onChange={params?.updateOnBlur ? undefined : handleChange}
            onBlur={params?.updateOnBlur ? handleChange : undefined}
            value={inputValue}
        />
    );
    return [value!, setValue, renderedInput] as const;
}
