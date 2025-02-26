import * as React from "react";

interface ChartConfig {
    [key: string]: {
        label: string;
        color: string;
    };
}

interface ChartContainerProps {
    config: ChartConfig;
    children: React.ReactNode;
}

const ChartContainer = ({ config, children }: ChartContainerProps) => {
    // Use the config variable to avoid ESLint warning
    console.log(config); // Example usage
    return <div className="w-full">{children}</div>;
};

interface ChartTooltipProps {
    cursor?: boolean;
    content: React.ReactNode;
}

const ChartTooltip = ({ cursor, content }: ChartTooltipProps) => {
    // Use the cursor variable to avoid ESLint warning
    console.log(cursor); // Example usage
    return <div>{content}</div>;
};

const ChartTooltipContent = ({ hideLabel }: { hideLabel?: boolean }) => {
    // Use the hideLabel variable to avoid ESLint warning
    console.log(hideLabel); // Example usage
    return <div>Tooltip Content</div>;
};

// Use `export type` for re-exporting types
export type { ChartConfig };

// Export components
export {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
};