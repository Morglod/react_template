import { useCallback, useEffect, useState } from "preact/hooks";

export function useStatePropsDirect<T, ChangeT = T>(
    defaultValue_: T,
    value_?: T,
    onChange_?: (x: ChangeT) => void,
): [value: T, setValue: (x: ChangeT) => void] {
    const [innerValue, innerSetValue] = useState<T>(defaultValue_);
    const value = value_ !== undefined ? value_ : innerValue;
    const setValue = useCallback(
        (x: ChangeT) => {
            onChange_?.(x);
            innerSetValue(x as any as T);
        },
        [onChange_],
    );

    return [value, setValue];
}

type UpdaterFn<T, PrevT> = (prevValue: PrevT | T) => T;

export function useStatePropsIndirect<T, ChangeT = T>(
    defaultValue_: T,
    value_?: ChangeT,
    onChange_?: (x: ChangeT) => void,
): [value: ChangeT, setValue: (x: ChangeT | UpdaterFn<ChangeT, T>) => void] {
    const [innerValue, innerSetValue] = useState<ChangeT>(value_ !== undefined ? value_ : (defaultValue_ as any));

    useEffect(() => {
        if (value_ !== undefined) innerSetValue(value_!);
    }, [value_]);

    useEffect(() => {
        if (value_ !== innerValue) {
            onChange_?.(innerValue as any as ChangeT);
        }
    }, [innerValue]);

    return [innerValue, innerSetValue];
}
