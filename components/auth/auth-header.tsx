interface AuthHeaderProps {
    title: string
    subtitle: string
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
    return (
        <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
        </div>
    )
}