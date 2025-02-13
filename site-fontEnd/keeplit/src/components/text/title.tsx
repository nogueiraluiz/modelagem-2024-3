interface titleProps {
    title: string;
}

export default function Title({ title }: titleProps) {
    return (
        <h1 className="text-5xl">{title}</h1>
    )
}