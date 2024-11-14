

export default function TitleDashboardContent({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="sm:text-xl text-base font-semibold mb-3 sm:mb-6 mx-2 sm:mx-6">
            {children}
        </h1>
    )
}