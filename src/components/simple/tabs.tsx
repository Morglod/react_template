import { useStatePropsDirect } from "../../utils/use-state-props";

type SimpleTabsProps<T extends Record<string, any>> = {
    /** key -> label */
    tabs: T;
    defaultValue?: keyof T;
    value?: keyof T;
    onChange?: (value: keyof T) => void;
    views?: {
        [key in keyof T]: any;
    };
};

export function SimpleTabs<T extends Record<string, any>>(props: SimpleTabsProps<T>) {
    const [selected, setSelected] = useStatePropsDirect(props.defaultValue, props.value, props.onChange);
    return (
        <>
            <span>
                {Object.entries(props.tabs).map(([k, label]) => (
                    <span key={k} onClick={() => setSelected(k)}>
                        {selected === k ? <>[{label}]</> : label}
                    </span>
                ))}
            </span>
            {props.views && selected ? props.views[selected] : null}
        </>
    );
}
